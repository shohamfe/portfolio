/** Traffic-light dots in the window chrome; grey until the window is
 *  hovered. Hover classes are spelled out rather than built from an accent
 *  name: Tailwind generates classes by scanning source text, so an
 *  interpolated `group-hover:bg-${accent}` produces no CSS at all. */
export const WINDOW_DOTS = [
  { id: "close", hoverClass: "group-hover:bg-danger" },
  { id: "minimise", hoverClass: "group-hover:bg-warning" },
  { id: "zoom", hoverClass: "group-hover:bg-success" },
] as const;

export const WINDOW_IMAGE_SIZES = "(max-width: 1279px) 100vw, 1200px";

export const EVIDENCE_IMAGE_SIZES = "(max-width: 767px) 100vw, 600px";

/** Prefix on copy that still has to come from Shoham. */
export const TODO_TAG = "[TO FILL]";

export const CASE_STUDY_ROUTE = "/case-study";
