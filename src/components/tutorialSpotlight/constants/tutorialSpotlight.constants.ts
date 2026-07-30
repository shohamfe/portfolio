/** Gap between the target's bottom edge and the label bubble below it. */
export const SPOTLIGHT_LABEL_OFFSET_PX = 16;

/** How much wider than the target's longer side the spotlight circle is. */
export const SPOTLIGHT_HOLE_PADDING_PX = 20;

/** Minimum distance the label keeps from the viewport edges. */
export const SPOTLIGHT_LABEL_EDGE_MARGIN_PX = 16;

/** Rough label height, used to flip it above the target when it would
 *  otherwise render below the viewport (e.g. stage 2's container-sized
 *  target can end past the bottom of the screen). */
export const SPOTLIGHT_LABEL_HEIGHT_ESTIMATE_PX = 40;

/** Fade duration for the backdrop/label entering and leaving. Must match the
 *  "duration-300" Tailwind class used on both. */
export const SPOTLIGHT_FADE_MS = 300;
