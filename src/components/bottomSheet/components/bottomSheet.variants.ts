/** Pinned to the bottom of the screen at its full expanded height, then
 *  translated down so only `peekHeight` shows - animating a transform rather
 *  than the height keeps the tray inside from reflowing on every frame of a
 *  drag.
 *
 *  Height comes from an inline style (SHEET_EXPANDED), since the value is
 *  shared with the scroll clearance the pages compute. */
/* Bottom padding clears env(safe-area-inset-bottom) - see mobileNav.variants
 * for why: without it, the tray's own content would render flush against
 * the home-indicator's gesture zone once the sheet is pulled open. */
export const sheetRoot =
  "fixed inset-x-0 bottom-0 z-20 flex flex-col gap-3 overflow-clip rounded-t-3xl border-t border-solid border-default-300 bg-surface-raised pt-3 shadow-nav [padding-bottom:calc(env(safe-area-inset-bottom)+16px)]";

/** Everything above the tray, and the only part that starts a drag - the
 *  canvas below owns its own gestures. touch-none stops the browser claiming
 *  the vertical swipe as a page scroll before Motion sees it. */
export const sheetHeader = "flex shrink-0 touch-none flex-col gap-3 px-4";

export const sheetGrip = "flex w-full flex-col items-center gap-1.5";

export const sheetHandle = "h-1 w-10 rounded-full bg-default-400";

export const sheetHint = "text-center font-ui text-tiny text-default-600";

export const sheetTitleBlock = "flex flex-col items-start gap-1";

export const sheetTitle = "font-display text-h2 font-extrabold text-text-strong";

/** The short accent rule under every mobile section heading. */
export const sectionUnderline = "h-[3px] w-10 rounded-full bg-accent";

/** min-h-0 so the canvas inside can own the leftover height and clip its own
 *  overflow instead of stretching the sheet. */
export const sheetBody = "relative flex min-h-0 flex-1 flex-col";
