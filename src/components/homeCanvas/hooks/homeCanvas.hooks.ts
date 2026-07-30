"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CANVAS_MARGIN,
  COLUMNS,
  COLUMN_STEP,
  DEFAULT_FOLDER_OFFSETS,
  ROW_STEP,
  STORAGE_KEY,
} from "@/constants/canvas";
import type { Offset, OffsetMap } from "../types/homeCanvas.types";

/** setTimeout on animation frames. Pass null to disable. */
export const useAnimationFrameTimeout = (callback: () => void, delayMs: number | null): void => {
  const saved = useRef(callback);
  saved.current = callback;

  useEffect(() => {
    if (delayMs === null) return;

    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      if (now - start >= delayMs) {
        saved.current();
        return;
      }

      frame = requestAnimationFrame(tick);
    });

    return () => cancelAnimationFrame(frame);
  }, [delayMs]);
};

/** Grid slot for a folder before movement, inset by CANVAS_MARGIN. */
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

/** Folder positions persist across reloads and route changes. */
export const usePersistedOffsets = (): {
  offsets: OffsetMap;
  moveBy: (id: string, delta: Offset) => void;
} => {
  const [offsets, setOffsets] = useState<OffsetMap>(DEFAULT_FOLDER_OFFSETS);
  const hydrated = useRef(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (raw) {
      try {
        setOffsets({ ...DEFAULT_FOLDER_OFFSETS, ...parseStored(raw) });
      } catch {
        // Ignore corrupt storage.
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
