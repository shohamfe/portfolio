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

/** setTimeout, but resolved on an animation frame.
 *
 *  A plain setTimeout fires on its own schedule with no relationship to the
 *  browser's paint cycle, so a state change made from one is not guaranteed
 *  to be painted — it can sit applied-but-invisible until some unrelated
 *  input event (a click, a mousemove) forces a repaint. requestAnimationFrame
 *  only runs as part of producing a frame, so anything scheduled from it is
 *  painted by construction.
 *
 *  Pass null to disable. */
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
 *  Starts from DEFAULT_FOLDER_OFFSETS (a hand-arranged layout) rather than an
 *  empty grid, so a first-time visitor sees that arrangement from the very
 *  first paint instead of the neat grid snapping into it after hydration —
 *  the default is a static constant, identical on server and client, so
 *  seeding useState with it directly is hydration-safe. A visitor's own
 *  stored drags are layered on top per folder id, not swapped in wholesale,
 *  so moving one folder doesn't discard the curated position of the rest.
 *
 *  Moves are applied as deltas resolved inside the state updater. Taking an
 *  absolute position from props instead loses every move but the last when
 *  several land in the same tick, which is what holding an arrow key does. */
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
