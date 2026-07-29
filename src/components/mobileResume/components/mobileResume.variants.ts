export const timelineRoot = "flex flex-col";

/** One entry: the indicator rail, then the content. self-stretch on the rail
 *  is what lets the connecting line fill whatever height the text needs. */
export const timelineItem = "flex w-full items-start gap-4";

export const indicatorColumn = "flex w-10 shrink-0 flex-col items-center gap-1 self-stretch";

/** The pin dot is drawn rather than exported: a ring with a filled centre is
 *  a shape, not a glyph, and CSS renders it crisper at any density than a
 *  bitmap would. */
export const pinDot =
  "flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-solid border-accent";

export const pinDotCore = "size-2 rounded-full bg-accent";

export const pinLine = "w-0.5 min-h-0 flex-1 bg-primary-300";

export const entryContent = "flex min-w-0 flex-1 flex-col gap-1.5 pb-5";

export const entryYear = "font-ui text-tiny text-accent";

export const entryTitle = "font-body text-[20px] font-semibold text-text-strong";

export const entryLink = "text-accent underline decoration-accent/40 underline-offset-4";

export const entrySubtitle = "font-ui text-small text-text-muted";

export const entryBullets = "list-disc pl-5 font-ui text-small text-text-strong marker:text-default-400";

/** Section titles reuse the same heading treatment as the mobile home
 *  sections, sitting in the content column so they line up with the entries
 *  rather than with the rail. */
export const sectionHeader = "flex flex-col items-start gap-1 pb-4 pl-14";

export const sectionHeading = "font-display text-h2 font-extrabold text-black";

/** The note tray: a canvas that pans in both directions, clipped by the
 *  sheet. Matches the home canvas's own viewport/pan-layer split. */
export const trayViewport = "relative min-h-0 flex-1 overflow-hidden";

export const trayPanLayer = "absolute left-0 top-0";

export const trayCard = "absolute";
