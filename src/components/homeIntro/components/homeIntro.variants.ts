/* The page's own padding moved here so the canvas can go edge to edge without
 * shifting the intro's visual position - main used to pad both children
 * uniformly, now each side carries its own inset.
 *
 * h-full/min-h-0 are lg-only: only at that breakpoint does the intro sit in a
 * height-locked layout (the page no longer scrolls as a whole), so only there
 * does the column need a bounded height to hand down to its scroll region. */
export const introRoot =
  "flex w-full flex-col px-10 pt-12 lg:h-full lg:min-h-0 lg:max-w-lg lg:shrink-0";

/** Name, tagline and nav - stays put above the scrollable content. */
export const introFixed = "flex shrink-0 flex-col gap-8";

export const introHeader = "flex flex-col gap-3";

export const introName = "font-display text-h1 font-bold text-text-strong";

export const introRole = "font-display text-h5 text-text-strong";

export const introTagline = "font-code text-code text-text-muted";

export const introDivider = "border-border-subtle";

/** Everything below the divider. Only this region scrolls, and only once the
 *  column above has a locked height (lg) to measure "overflow" against. */
export const introScroll = "flex flex-col gap-8 pb-12 pt-8 lg:min-h-0 lg:flex-1 lg:overflow-y-auto";

export const introSection = "flex flex-col gap-2";

export const introSectionWide = "flex flex-col gap-3";

export const introHeading = "font-display text-h2 font-extrabold text-text-strong";

export const introList = "list-disc pl-5 font-body text-body text-text-muted marker:text-default-400";

export const introParagraph = "font-body text-body text-text-muted";
