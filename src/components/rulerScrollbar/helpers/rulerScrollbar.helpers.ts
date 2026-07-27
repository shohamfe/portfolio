import type { TickDistanceBucket } from "../types/rulerScrollbar.types";

/** Buckets a raw tick distance into the four steps the ruler actually
 *  renders: 0, 1 and 2 each get their own step, everything from 3 outward
 *  flattens to the same faint tick. */
export const getTickDistanceBucket = (distance: number): TickDistanceBucket => {
  if (distance >= 3) return "far";

  return String(distance) as TickDistanceBucket;
};

/** Index of the tick nearest the current scroll progress (0 to 1).
 *
 *  Progress is clamped because smooth-scrolling with rubber-band overscroll
 *  reports values slightly outside 0 to 1 at the ends. Unclamped, those push
 *  the active index past the last tick and the whole ruler flattens to its
 *  faintest state exactly when the user is at the top or bottom. */
export const getActiveTickIndex = (progress: number, tickCount: number): number =>
  Math.round(Math.min(1, Math.max(0, progress)) * (tickCount - 1));
