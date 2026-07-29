/** Pinned to the bottom of the screen at its full expanded height (see
 *  SHEET_EXPANDED), then translated down so only the collapsed peek shows -
 *  animating a transform rather than the height keeps the tray inside from
 *  reflowing on every frame of a drag.
 *
 *  dot-grid, not the page's plain white - the sheet carries the pattern
 *  instead, per the Figma update. bg-surface-raised is the base colour dots
 *  render against (dot-grid itself only paints the dot layer); it needs to
 *  stay opaque white ON THIS ELEMENT, not just the page behind it, since the
 *  sheet is a solid card that fully covers whatever is under it.
 *
 *  Bottom padding clears env(safe-area-inset-bottom) - see mobileNav.variants
 *  for why: without it, the tray's own content would render flush against
 *  the home-indicator's gesture zone once the sheet is pulled open. */
export const sheetRoot =
  "dot-grid fixed inset-x-0 bottom-0 z-20 flex flex-col overflow-clip rounded-t-3xl border-t border-solid border-default-300 bg-surface-raised shadow-nav [padding-bottom:calc(env(safe-area-inset-bottom)+16px)]";

/** The only part that starts the sheet's own drag now. The canvas below
 *  fills the rest of the sheet, including the area behind the title, so it
 *  can no longer share a header's gesture space the way it used to - only
 *  this thin bar does. touch-none stops the browser claiming the vertical
 *  swipe as a page scroll before Motion sees it. */
export const sheetGripBar =
  "relative z-30 flex shrink-0 touch-none flex-col items-center gap-1.5 px-4 pb-2 pt-3";

export const sheetGrip = "flex w-full flex-col items-center gap-1.5";

export const sheetHandle = "h-1 w-10 rounded-full bg-default-400";

export const sheetHint = "text-center font-ui text-tiny text-default-600";

/** min-h-0 so the canvas can own the leftover height; relative so the mask
 *  and title below can layer on top of it. */
export const sheetCanvasArea = "relative min-h-0 flex-1";

/** The canvas itself (children), filling the entire area below the grip bar
 *  - including behind the title, per the Figma update. flex-col so a
 *  flex-1 viewport class inside (HomeCanvas/MobileNoteCanvas's own) resolves
 *  its height against this box. */
export const sheetCanvasLayer = "absolute inset-0 z-0 flex flex-col";

/** Fades the canvas into a frosted backdrop behind the title, mirroring
 *  canvasIntroMask/stageHeaderBlur on desktop - same reasoning: dot-grid
 *  paints its own crisp dot layer rather than blurring the canvas's dots,
 *  since blurring an already low-contrast pattern erases it instead of
 *  softening it. pointer-events-none so the canvas underneath stays
 *  draggable right up under the faded band. */
export const sheetTitleMask =
  "dot-grid pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-surface-raised/80 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black,black_45%,transparent)]";

/** The title, floating over the canvas rather than pushing it down.
 *  pointer-events-none for the same reason as the mask - dragging works
 *  right up under the text. */
export const sheetTitleBlock =
  "pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-col items-start gap-1 px-4 pt-3";

/** Matches mobileHeading (mobileHome.variants) - kept as a literal here
 *  rather than imported, since bottomSheet has no dependency on mobileHome
 *  otherwise and the two are both leaves off the same shared design
 *  decision, not a hierarchy. */
export const sheetTitle = "font-display text-[24px] font-extrabold text-text-strong";

/** The short accent rule under every mobile section heading. */
export const sectionUnderline = "h-[3px] w-10 rounded-full bg-accent";
