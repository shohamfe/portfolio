/** Mobile layout geometry, from the Figma mobile frames (430x932).
 *
 *  The two sheets rest at different heights by design: Home's tech-stack
 *  folders are taller than Resume's note cards, so each peek is the height
 *  its own tray needs rather than one shared value. */
export const HOME_SHEET_PEEK = 322;
export const RESUME_SHEET_PEEK = 248;

/** How much of the screen the sheet covers once pulled all the way up. svh,
 *  not vh: on iOS Safari vh counts the space behind the browser chrome, so a
 *  vh-sized sheet extends past what is actually visible. */
export const SHEET_EXPANDED = "80svh";

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
