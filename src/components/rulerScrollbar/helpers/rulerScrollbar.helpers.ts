import type { TickDistanceBucket } from "../types/rulerScrollbar.types";

/** Maps a tick's distance from a centre index onto the 3-step-plus-far scale
 *  every bulge renders, scaled so the falloff always spans exactly `radius`
 *  ticks - a radius of 6 spreads the same 3 steps twice as wide as a radius
 *  of 3, rather than assuming the step count and the radius are the same
 *  number. */
export const getTickDistanceBucket = (
  distance: number,
  radius: number,
): TickDistanceBucket => {
  if (distance >= radius) return "far";

  const step = Math.min(2, Math.floor((distance / radius) * 3));
  return String(step) as TickDistanceBucket;
};

export const getActiveTickIndex = (
  percent: number,
  tickCount: number,
): number => Math.round(Math.min(1, Math.max(0, percent)) * (tickCount - 1));

/** Where a pointer sits along the ruler, as 0-1 from top to bottom. */
export const getPercentFromPointer = (
  clientY: number,
  bounds: Pick<DOMRect, "top" | "height">,
): number => Math.min(1, Math.max(0, (clientY - bounds.top) / bounds.height));
