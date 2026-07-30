import type { TickDistanceBucket } from "../types/rulerScrollbar.types";

export const getTickDistanceBucket = (distance: number): TickDistanceBucket => {
  if (distance >= 3) return "far";

  return String(distance) as TickDistanceBucket;
};

export const getActiveTickIndex = (
  progress: number,
  tickCount: number,
): number => Math.round(Math.min(1, Math.max(0, progress)) * (tickCount - 1));
