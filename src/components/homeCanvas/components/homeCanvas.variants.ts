/** The viewport the canvas pans inside. Clips the overflow and carries the
 *  grab cursor, since dragging empty space pans. */
export const canvasViewport = "relative flex-1 overflow-hidden";

/** The layer that actually moves. Sized to the content so motion can derive
 *  drag constraints from the viewport it sits in. */
export const canvasPanLayer = "absolute left-0 top-0";

/** left/top are set inline from the folder's committed position. */
export const canvasFolderSlot =
  "absolute focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";
