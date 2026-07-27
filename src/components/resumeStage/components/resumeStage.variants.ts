/** relative: the header-blur mask is positioned against this element. */
export const stageRoot = "relative flex min-h-0 flex-1 gap-4 pb-12";

/** self-stretch (not self-center): the ruler should span the full height of
 *  the scroller beside it, not sit centred at its own short natural height.
 *  pl-10 is the page's own left inset, carried here rather than on stageRoot
 *  so the scroller (and the card field inside it) can run edge to edge on
 *  the right, matching the Home canvas's full-bleed treatment. */
export const stageRuler = "hidden shrink-0 self-stretch pl-10 lg:block";

/** The scroll container. Lenis drives this element's scrollTop, so it - not
 *  the page - is what actually scrolls. overflow-x-hidden is a backstop
 *  alongside each card's own dragConstraints: the constraint keeps a card
 *  from ever visually leaving the field, but this is what stops a horizontal
 *  scrollbar from appearing at all if anything ever measures wider than the
 *  viewport regardless. */
export const stageScroller = "min-h-0 flex-1 overflow-x-hidden overflow-y-auto";

/** Positions the absolutely placed card column against the timeline.
 *
 *  pt-[60vh]: the first section starts low in the viewport rather than
 *  flush with the top, so the initial screen reads as an invitation to
 *  scroll rather than content packed against the header. pl-6 keeps the
 *  timeline's own reading margin now that the page-level left inset moved
 *  to the ruler; no right inset, so the card field can run to the true
 *  edge of the screen. */
export const stageContent = "relative flex gap-10 pb-40 pl-6 pt-[60vh]";

export const stageTimeline = "min-w-0 flex-1";

/** Reserves the width the scattered cards occupy. They are absolutely
 *  positioned inside it, so it needs an explicit size to hold the column open.
 *  Dropped below xl, where the timeline needs the full width. */
export const cardFieldRoot = "relative hidden w-[400px] shrink-0 xl:block";

export const cardFieldItem = "absolute";

/** Sits above the scroller, fading its top into blur as content passes
 *  underneath the header - the same treatment Home's canvas uses where it
 *  runs behind the intro. Covers cards and timeline text alike, since both
 *  are just content scrolling under the same header.
 *
 *  12px, not a heavier blur: a stronger radius was tried on Home's dot
 *  pattern first and erased it into a flat wash instead of softening it -
 *  legibility here comes mostly from the translucent tint, not blur strength.
 *  There is no separate painted dot layer the way Home's mask needed one,
 *  because the resume's dot-grid is a single static layer on `main` - nothing
 *  else is drawing a second copy of it that could fall out of phase. */
export const stageHeaderMask =
  "pointer-events-none absolute inset-x-0 top-0 z-10 h-36 bg-surface-page/70 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black,black_45%,transparent)]";
