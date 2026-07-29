/** Mobile layout geometry, from the Figma mobile frames (430x932). */

/** The floating nav's own fixed footprint - card height (88px) plus the gap
 *  above it (16px), not counting the safe-area inset below it, which varies
 *  by device and is measured separately wherever it matters. Keep this in
 *  sync with navRoot/navCard's own hardcoded 88/16 in mobileNav.variants. */
export const NAV_FOOTPRINT = 104;

/** How far the sheet's collapsed peek should clear the nav by. */
export const SHEET_PEEK_GAP = 40; // 2.5rem

/** Gap kept above the sheet once fully expanded. */
export const SHEET_TOP_GAP = 16; // 1rem

/** Expanded height: the whole viewport, minus the top notch and
 *  SHEET_TOP_GAP. dvh, not svh - on iOS Safari, svh/vh count the space
 *  behind the browser's own toolbar chrome differently; dvh tracks what is
 *  actually visible right now. */
export const SHEET_EXPANDED = `calc(100dvh - env(safe-area-inset-top) - ${SHEET_TOP_GAP}px)`;

/** How much bottom clearance a scroll region needs so its last line can
 *  clear the sheet's collapsed peek, and the nav sitting on top of it. Built
 *  from the same numbers useSheetDrag uses for the peek itself, so the two
 *  can't drift apart. */
export const SCROLL_BOTTOM_CLEARANCE = `calc(env(safe-area-inset-bottom) + ${
  NAV_FOOTPRINT + SHEET_PEEK_GAP
}px)`;

export const SHEET_HINT = "Swipe up to explore • Drag cards to rearrange";

/** Where the home canvas's pan layer starts inside the tray.
 *
 *  Derived, not guessed: the React folder sits at CANVAS_MARGIN (600) plus
 *  its default offset (364, 338), so pulling the layer back by that much less
 *  a small inset opens the tray on that folder with the rest of the cluster
 *  reachable by panning in any direction. */
export const MOBILE_CANVAS_ORIGIN = { x: -944, y: -918 };

/** Below this width the mobile layouts take over. Matches Tailwind's `lg`,
 *  which is where the desktop layouts already switch on. */
export const MOBILE_QUERY = "(max-width: 1023px)";
