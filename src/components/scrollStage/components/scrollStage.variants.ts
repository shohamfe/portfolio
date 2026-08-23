/** The shell paints no surface of its own; each page supplies one, so a page
 *  can start its surface below a full-bleed hero. */
export const stageRoot =
  "relative z-0 flex min-h-0 flex-1 flex-col overflow-hidden";

export const headerRoot =
  "pointer-events-none inset-x-0 flex min-h-40 flex-col justify-between gap-4 px-10 pt-12 pb-8";

export const headerName =
  "pointer-events-auto w-fit font-display text-h2 font-extrabold text-text-strong";

export const stageBody = "relative flex min-h-0 flex-1 gap-6";

/** Stays above the scroller, which reaches back under it so content can cast
 *  a shadow into the gutter without being clipped. */
export const stageRuler =
  "relative z-10 ml-10 hidden shrink-0 self-stretch pb-8 lg:flex";

export const stageScroller =
  "min-h-0 flex-1 overflow-x-hidden overflow-y-hidden";

/** Pulls a scroller back across the ruler to the stage's own left edge, so
 *  content inside it can paint and cast shadows the whole width instead of
 *  being clipped at the ruler. The offset is the ruler's inset (40px) plus
 *  its width (40px) plus the body gap (24px); pair it with contentInset so
 *  the content still lands where it would have. */
export const scrollerFullBleed = "lg:-ml-26";

export const contentInset = "lg:pl-26";
