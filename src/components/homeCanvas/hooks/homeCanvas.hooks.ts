"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CANVAS_MARGIN, COLUMNS, COLUMN_STEP, ROW_STEP, STORAGE_KEY } from "@/constants/canvas";
import type { Offset, OffsetMap } from "../types/homeCanvas.types";

/** Grid slot for a folder before the user moves it, inset by CANVAS_MARGIN so
 *  the grid sits away from the edges of the (larger) pan layer. */
export const originForIndex = (index: number): Offset => ({
  x: CANVAS_MARGIN + (index % COLUMNS) * COLUMN_STEP,
  y: CANVAS_MARGIN + Math.floor(index / COLUMNS) * ROW_STEP,
});

const isOffset = (value: unknown): value is Offset =>
  typeof value === "object" &&
  value !== null &&
  typeof (value as Offset).x === "number" &&
  typeof (value as Offset).y === "number";

const parseStored = (raw: string): OffsetMap => {
  const parsed: unknown = JSON.parse(raw);

  if (typeof parsed !== "object" || parsed === null) return {};

  return Object.fromEntries(
    Object.entries(parsed as Record<string, unknown>).filter(([, value]) => isOffset(value))
  ) as OffsetMap;
};

/** Folder positions survive reloads and route changes.
 *
 *  Moves are applied as deltas resolved inside the state updater. Taking an
 *  absolute position from props instead loses every move but the last when
 *  several land in the same tick, which is what holding an arrow key does. */
export const usePersistedOffsets = (): {
  offsets: OffsetMap;
  moveBy: (id: string, delta: Offset) => void;
} => {
  const [offsets, setOffsets] = useState<OffsetMap>({});
  const hydrated = useRef(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (raw) {
      try {
        setOffsets(parseStored(raw));
      } catch {
        // Corrupt or hand-edited storage should not break the canvas.
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(offsets));
  }, [offsets]);

  const moveBy = useCallback((id: string, delta: Offset) => {
    setOffsets((previous) => {
      const current = previous[id] ?? { x: 0, y: 0 };

      return { ...previous, [id]: { x: current.x + delta.x, y: current.y + delta.y } };
    });
  }, []);

  return { offsets, moveBy };
};
