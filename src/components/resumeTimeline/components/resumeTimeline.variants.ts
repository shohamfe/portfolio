export const timelineRoot = "flex flex-col";

/** Gutter + content pair. Each row carries its own vertical padding rather
 *  than a gap between rows, so the content cell's left border lines up
 *  row after row into what reads as one continuous divider. */
export const timelineRow = "flex";

export const timelineGutter = "w-14 shrink-0 py-6 pr-4 text-right font-body text-small text-text-muted";

export const timelineContent = "flex flex-1 flex-col gap-2 border-l border-border-subtle py-6 pl-6";

export const sectionHeading = "font-display text-h2 font-extrabold text-text-strong";

/** Marks the end of a section's block. Same token as homeIntro's divider. */
export const sectionRule = "border-border-subtle";

export const entryTitle = "font-body text-body font-semibold text-text-strong";

export const entryTitleLink = "inline-flex items-center gap-1.5 hover:text-accent";

export const entryLinkIcon = "size-4 text-text-muted";

export const entrySubtitle = "font-body text-small text-text-muted";

export const entryBullets = "list-disc pl-5 font-body text-small text-text-muted marker:text-default-400";
