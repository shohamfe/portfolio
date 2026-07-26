/** The viewport the canvas pans inside. Clips the overflow and carries the
 *  grab cursor, since dragging empty space pans.
 *
 *  pt-12 replaces the vertical inset main used to provide, so folders keep
 *  their original start position even though the viewport itself now runs
 *  edge to edge on the right and bottom — an absolutely positioned child's
 *  top:0/left:0 resolves against the padding box, so this alone is enough to
 *  push the pan layer down without moving the clipping edges. */
export const canvasViewport = "relative flex-1 overflow-hidden pt-12";

/** The layer that actually moves. Sized to the content so motion can derive
 *  drag constraints from the viewport it sits in. */
export const canvasPanLayer = "absolute left-0 top-0";

/** left/top are set inline from the folder's committed position. */
export const canvasFolderSlot = "absolute";
