/** relative: positions the ruler and gives the header blur something to
 *  stack against. No bottom padding - the content ends where the last
 *  section does. */
export const stageRoot = "relative flex min-h-0 flex-1 gap-4";

/** lg:flex, NOT lg:block. rulerRoot sets `flex`, but tailwind-merge drops it
 *  in favour of the `hidden` here (both are display utilities, last wins),
 *  so the display that actually applies at lg is whatever this sets. With
 *  `block` the ruler's own flex-col/items-end/justify-between were all inert
 *  and the ticks simply stacked at their natural height, leaving the rest of
 *  the column empty.
 *
 *  ml-10, not pl-10: the ruler is w-10 and Tailwind sets box-sizing to
 *  border-box, so 40px of left padding on a 40px-wide box leaves a zero-width
 *  content area. A margin puts the inset outside the box instead.
 *
 *  self-stretch so it spans the scroller's full height rather than sitting
 *  centred at its own natural height, then pt-56/pb-8 pull the ticks in from
 *  both ends - clear of the header blur at the top (pt-56 is a touch less
 *  than stageHeaderBlur's h-64, by design: the ruler can start slightly
 *  inside the blur's fade-out region, not just below it entirely) and short
 *  of the very last pixel at the bottom, so the last tick does not read as
 *  flush against the scroller's edge.
 *
 *  Padding, not margin. rulerRoot sets h-full, and an explicit height beats
 *  stretch sizing - so a top margin pushed the full-height box down past the
 *  scroller's bottom edge instead of shortening it. Under border-box, padding
 *  shrinks the content area within that same height instead. */
export const stageRuler = "ml-10 pt-56 pb-8 hidden shrink-0 self-stretch lg:flex";

/** The scroll container. Lenis drives this element's scrollTop, so it - not
 *  the page - is what actually scrolls. overflow-x-hidden is a backstop
 *  alongside each card's own dragConstraints: the constraint keeps a card
 *  from ever visually leaving its bounds, but this stops a horizontal
 *  scrollbar appearing at all if anything ever measures wider regardless. */
export const stageScroller = "min-h-0 flex-1 overflow-x-hidden overflow-y-auto";

/** pt-52 clears the header, which overlays this stage as a glass bar rather
 *  than sitting above it in normal flow - without it the first section would
 *  render underneath. It approximates the header's rendered height (~204px)
 *  rather than measuring it, since that height shifts slightly with font
 *  loading and wrapping; the few px of slack are invisible behind the
 *  header's own blur and tint.
 *
 *  pl-6 keeps the timeline's reading margin now that the page-level left
 *  inset moved to the ruler. No right inset, so the card field reaches the
 *  true screen edge. No bottom padding. */
export const stageContent = "relative flex gap-10 pl-6 pt-52";

/** Capped rather than left to fill: on a wide screen flex-1 alone stretched
 *  the measure past comfortable reading length. 3xl keeps the longest bullet
 *  lines near a sane character count while still letting the column shrink
 *  on narrower viewports. */
export const stageTimeline = "min-w-0 max-w-3xl flex-1";

/** Reserves the width the scattered cards rest in. They are absolutely
 *  positioned inside it, so it needs an explicit size to hold the column
 *  open. Dropped below xl, where the timeline needs the full width.
 *
 *  This only anchors where cards start - their drag is bounded to the much
 *  wider resume-content box, so they can be dragged clear across the
 *  timeline text rather than being trapped in this column. */
export const cardFieldRoot = "relative hidden w-[400px] shrink-0 xl:block";

export const cardFieldItem = "absolute";

/** The blur sits behind the header rather than on it, and is taller than it,
 *  so the effect fades out gradually below the header instead of ending on a
 *  hard edge. Masking the header itself would fade its own title and buttons
 *  along with the blur - a mask applies to an element's content, not just its
 *  backdrop.
 *
 *  It paints its own dot-grid rather than relying on the one behind it. The
 *  dots are default-300 on default-50 - low contrast by design - and blurring
 *  a low-contrast pattern erases it into a flat wash rather than softening
 *  it, which is exactly what happened on Home before its mask was given a
 *  crisp layer of its own. Both this and `main` anchor their grid at the same
 *  origin (main's padding box), so the two tile in phase and the pattern
 *  reads as continuous across the boundary.
 *
 *  12px, not a heavier radius, for the same low-contrast reason. Legibility
 *  comes mostly from the translucent tint layered with it.
 *
 *  It spans only the text column, not the full width: the scattered cards to
 *  its right are meant to pass the header cleanly rather than swim through a
 *  blurred band.
 *
 *  That width is derived, not guessed. Everything left of the timeline is
 *  fixed: stageRoot's gap-4 plus stageRuler's ml-10 and w-10 (96px), then
 *  stageContent's pl-6 (24px). The timeline itself is capped at max-w-3xl,
 *  so --container-3xl is literally the same value stageTimeline resolves to -
 *  if that cap changes, this follows it. The trailing 20px is half of
 *  stageContent's gap-10, which lands the fade in the middle of the gutter
 *  between the text and the cards rather than hard against either one.
 *
 *  right-auto is needed because inset-x-0 pins both edges; without releasing
 *  the right one there is nothing for a width to do. Dropped below xl for the
 *  same reason cardFieldRoot is - there is no card column at those widths, so
 *  the text runs full width and the blur should too.
 *
 *  Two masks composited: the vertical one fades the blur out below the
 *  header, the horizontal one softens its right edge so it dissolves into the
 *  gutter instead of stopping on a visible vertical seam. */
export const stageHeaderBlur =
  "dot-grid pointer-events-none absolute inset-x-0 top-0 z-10 h-64 bg-surface-page/70 backdrop-blur-md xl:right-auto xl:w-[calc(120px+var(--container-3xl)+20px)] [mask-image:linear-gradient(to_bottom,black,black_65%,transparent),linear-gradient(to_right,black,black_88%,transparent)] [mask-composite:intersect]";
