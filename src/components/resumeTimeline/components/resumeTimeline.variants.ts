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

/** Accent-coloured, not just on hover - a link needs to read as a link before
 *  you touch it, not only after.
 *
 *  No underline here: the underline lives on entryTitleLinkText instead, on a
 *  span around just the title. Chrome paints a flex container's own
 *  text-decoration as one continuous line across its whole box, ignoring any
 *  child's text-decoration-line: none - putting the decoration on this
 *  flex container (to cover both the emoji and the title) drew a line under
 *  the emoji no matter what the emoji's own class said. Scoping the
 *  decoration to a non-flex span that only wraps the title sidesteps that
 *  entirely, since the emoji is never a descendant of the underlined box. */
export const entryTitleLink = "group inline-flex items-center gap-1.5 text-accent transition-colors";

/** The underline itself - accent/40 at rest, solidifying to accent on hover
 *  (hover is on the parent link via `group`, not this span, so the whole row
 *  triggers it). See entryTitleLink for why the decoration lives here and not
 *  there. */
export const entryTitleLinkText =
  "underline decoration-accent/40 underline-offset-4 transition-colors group-hover:decoration-accent";

/** Sized for the emoji glyph, not an icon component - size-4 (which the
 *  previous PiLink icon used) is a fixed pixel box meant for an SVG and would
 *  just clip or misalign a character. text-code (24px), noticeably larger
 *  than the 14px it replaced: the emoji is the visual cue that a title is a
 *  link, so it needs to read as one at a glance, not blend in as a small
 *  trailing mark. */
export const entryLinkIcon = "text-code";

export const entrySubtitle = "font-body text-small text-text-muted";

export const entryBullets = "list-disc pl-5 font-body text-small text-text-muted marker:text-default-400";
