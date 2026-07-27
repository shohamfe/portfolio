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

/** The layer that actually moves.
 *
 *  Below lg, 0,0 is correct as-is — the canvas is a normal flex item to the
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

/** Sits between the canvas (z-0) and the intro text (z-20), matching the
 *  intro's own footprint (592px box) with extra width for the gradient to
 *  fade out into sharp, unblurred canvas. The canvas is full-bleed behind the
 *  intro at the lg breakpoint, so without this the folders panning underneath
 *  would fight with the text for legibility instead of reading as a
 *  deliberate frosted-glass layer. Decorative only — aria-hidden, no pointer
 *  events — and scoped to lg: since mobile stacks intro above the canvas
 *  rather than overlapping it.
 *
 *  Blurring the dots (either via backdrop-filter here or via filter on the
 *  canvas layer itself) turned out not to work at any radius: the dots are
 *  --color-default-300 on --color-default-50, already very low contrast, and
 *  blurring a low-contrast pattern erases it rather than softening it —
 *  which is why dropping 40px to 12px produced no visible difference at all.
 *  This paints its own crisp dot-grid layer instead, immune to that, with
 *  backdrop-blur kept underneath only to calm whatever folder colour happens
 *  to be dragged behind it. Both fade together via the same mask-image. */
export const canvasIntroMask =
  "dot-grid hidden lg:pointer-events-none lg:absolute lg:inset-y-0 lg:left-0 lg:z-10 lg:block lg:w-[720px] lg:bg-surface-page/70 lg:backdrop-blur-md lg:[mask-image:linear-gradient(to_right,black,black_55%,transparent)]";

/** left/top are set inline from the folder's committed position.
 *  outline-none is deliberate — removing only the focus-visible classes left
 *  the browser's own default focus ring showing (a heavy black rectangle),
 *  since that default isn't tied to the Tailwind utilities that were removed. */
export const canvasFolderSlot = "absolute outline-none";
