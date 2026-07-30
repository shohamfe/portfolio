/** The viewport the canvas pans inside. Clips the overflow and carries the
 *  grab cursor, since dragging empty space pans.
 *
 *  Also carries the dot pattern. It lives here rather than on the pan layer
 *  so it stays put as a static backdrop while folders drag across it, and
 *  rather than on `main` so it shares an origin with the intro mask's own
 *  dot layer below (both boxes sit flush at main's top-left at lg, so their
 *  independently-tiled 24px patterns land in phase with each other without
 *  any extra alignment work). */
export const canvasViewport = "dot-grid relative flex-1 overflow-hidden";

/** Same viewport, no dot layer of its own - for the mobile embed, where the
 *  bottom sheet around it already paints the pattern. Stacking both would
 *  not simply double the same pattern: the sheet's dot-grid tiles from its
 *  own top-left, offset from this viewport's by the sheet header's height,
 *  so two independently-phased 24px grids would beat against each other
 *  instead of lining up. */
export const canvasViewportPlain = "relative flex-1 overflow-hidden";

/** The layer that actually moves.
 *
 *  Below lg, 0,0 is correct as-is - the canvas is a normal flex item to the
 *  right of the intro, so no extra inset is needed. At lg, the canvas becomes
 *  a full-bleed layer spanning behind the intro too, so the pan layer needs
 *  its own explicit offset to keep the folders' visual start where it was:
 *  672px/48px (the original offset) minus CANVAS_MARGIN (600px, see
 *  constants/canvas.ts), since the grid itself is now inset by that same
 *  margin on every side to make room to pan. A parent's padding will NOT
 *  substitute for this: an absolutely positioned child's left:0/top:0
 *  resolves against the padding box's own edge (just inside the border), not
 *  against the content edge on the far side of the padding. */
export const canvasPanLayer = "absolute left-0 top-0 lg:left-[72px] lg:top-[-552px]";

/** Same layer, positioned entirely from an inline `panOrigin` instead. The
 *  breakpoint-based offsets above are written for a canvas that spans the
 *  whole page, and a small tray needs to open somewhere else entirely. */
export const canvasPanLayerFree = "absolute";

/** Sits between the canvas (z-0) and the intro text (z-20), matching the
 *  intro's own footprint (592px box) with extra width for the gradient to
 *  fade out into sharp, unblurred canvas. The canvas is full-bleed behind the
 *  intro at the lg breakpoint, so without this the folders panning underneath
 *  would fight with the text for legibility instead of reading as a
 *  deliberate frosted-glass layer. Decorative only - aria-hidden, no pointer
 *  events - and scoped to lg: since mobile stacks intro above the canvas
 *  rather than overlapping it.
 *
 *  Blurring the dots (either via backdrop-filter here or via filter on the
 *  canvas layer itself) turned out not to work at any radius: the dots are
 *  --color-default-300 on --color-default-50, already very low contrast, and
 *  blurring a low-contrast pattern erases it rather than softening it -
 *  which is why dropping 40px to 12px produced no visible difference at all.
 *  This paints its own crisp dot-grid layer instead, immune to that, with
 *  backdrop-blur kept underneath only to calm whatever folder colour happens
 *  to be dragged behind it. Both fade together via the same mask-image. */
export const canvasIntroMask =
  "dot-grid hidden lg:pointer-events-none lg:absolute lg:inset-y-0 lg:left-0 lg:z-10 lg:block lg:w-[720px] lg:bg-surface-page/70 lg:backdrop-blur-md lg:[mask-image:linear-gradient(to_right,black,black_55%,transparent)]";

/** left/top are set inline from the folder's committed position. This is the
 *  outer wrapper only - it owns positioning and the mount drop-in animation,
 *  nothing else. It deliberately carries no drag props and no externally
 *  created motion values: doing both on the same element (as the drag grip
 *  below needs to) turns out to silently stop the mount animation from ever
 *  running, freezing the element at its initial state forever. */
export const canvasFolderSlot = "absolute";

/** The actual drag grip, nested inside canvasFolderSlot. `relative` is
 *  needed for whileDrag's zIndex to have any effect at all - z-index is
 *  inert on a position:static element, and x/y motion values only produce a
 *  transform, not a position. outline-none is deliberate - removing only the
 *  focus-visible classes left the browser's own default focus ring showing
 *  (a heavy black rectangle), since that default isn't tied to the Tailwind
 *  utilities that were removed. */
export const canvasFolderGrip = "relative outline-none";
