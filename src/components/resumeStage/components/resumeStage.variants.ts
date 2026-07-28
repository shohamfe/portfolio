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
 *  centred at its own natural height. */
export const stageRuler = "ml-10 hidden shrink-0 self-stretch lg:flex";

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

export const stageTimeline = "min-w-0 flex-1";

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
 *  Because it blurs whatever is painted behind it, and the dot-grid lives on
 *  `main` behind this, the dots blur along with any scrolled content - which
 *  is what makes the pattern read as continuing up under the header instead
 *  of being clipped at its edge.
 *
 *  12px, not a heavier radius: a stronger blur was tried against Home's dot
 *  pattern first and erased it into a flat wash rather than softening it.
 *  Legibility comes mostly from the translucent tint layered with it. */
export const stageHeaderBlur =
  "pointer-events-none absolute inset-x-0 top-0 z-10 h-64 bg-surface-page/70 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black,black_65%,transparent)]";
