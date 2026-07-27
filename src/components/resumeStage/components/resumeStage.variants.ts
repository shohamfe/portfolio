export const stageRoot = "flex min-h-0 flex-1 gap-4 px-10 pb-12";

/** The ruler tracks the scroller beside it, so it is centred against the
 *  scrollable area rather than the page. Hidden on small screens, where there
 *  is no room for a decorative gutter. */
export const stageRuler = "hidden shrink-0 self-center lg:block";

/** The scroll container. Lenis drives this element's scrollTop, so it - not
 *  the page - is what actually scrolls. */
export const stageScroller = "min-h-0 flex-1 overflow-y-auto";

/** Positions the absolutely placed card column against the timeline. */
export const stageContent = "relative flex gap-10 pb-40";

export const stageTimeline = "min-w-0 flex-1";

/** Reserves the width the scattered cards occupy. They are absolutely
 *  positioned inside it, so it needs an explicit size to hold the column open.
 *  Dropped below xl, where the timeline needs the full width. */
export const cardFieldRoot = "relative hidden w-[400px] shrink-0 xl:block";

export const cardFieldItem = "absolute";
