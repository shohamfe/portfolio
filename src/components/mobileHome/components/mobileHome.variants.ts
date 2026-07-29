/** Full-screen column: a scrolling body with the sheet and nav fixed over
 *  it. dot-grid matches the desktop pages' backdrop. */
export const mobileRoot = "dot-grid relative flex min-h-0 flex-1 flex-col overflow-hidden";

/** The only scrolling region. Its bottom padding is set inline from the
 *  sheet's peek height, since the sheet is fixed and would otherwise cover
 *  the end of the copy. */
export const mobileScroll = "flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-5 pt-3";

export const heroRoot = "flex flex-col gap-1";

/* The mobile type scale is its own thing - the desktop h1/h5 tokens (60px
 * and 32px) are far too large for a 430px frame, and adding three tokens
 * used by one screen would bloat the theme for no reuse. */
export const heroName = "font-display text-[28px] font-bold leading-none text-black";

export const heroRole = "font-display text-[16px] leading-none text-text-strong";

export const heroTagline = "font-code text-[13px] text-text-muted";

export const heroDivider = "border-border-subtle";

export const bioSections = "flex flex-col gap-4";

export const bioSection = "flex flex-col gap-2";

export const bioHeader = "flex flex-col items-start gap-1";

export const bioHeading = "font-display text-h2 font-extrabold text-black";

export const bioList = "list-disc pl-5 font-ui text-small text-text-strong marker:text-default-400";

export const bioParagraph = "font-ui text-small text-text-muted";
