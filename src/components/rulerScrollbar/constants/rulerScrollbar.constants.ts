/** Target pixel gap between ticks - tick count is derived from the ruler's
 *  actual rendered height divided by this, instead of a hand-picked count
 *  per caller. */
export const TICK_SPACING_PX = 16;

/** How many ticks out from the centre each bulge's 3-step falloff spans
 *  before flattening to its resting size - defaults for the two bulges the
 *  ruler draws (current scroll position, and the one under the cursor).
 *  Exposed as props so a caller can widen or narrow either one. */
export const DEFAULT_ACTIVE_RADIUS = 3;

export const DEFAULT_HOVER_RADIUS = 3;

/** Fraction of the scrollable range one arrow-key press moves. */
export const KEYBOARD_SEEK_STEP = 0.05;
