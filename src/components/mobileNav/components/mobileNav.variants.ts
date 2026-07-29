import { cva } from "class-variance-authority";

/** Structural only now - no blur or mask of its own. Those used to live
 *  here, but a mask-image on a parent fades EVERYTHING painted inside it as
 *  one compositing group, not just its own backdrop-blur: it was fading the
 *  card's own opaque background right along with the decorative blur above
 *  it, letting the page underneath (the sheet's title, the dot pattern)
 *  show straight through the card's icons and labels. The blur/fade now
 *  lives on navFade, sized to end exactly where the card begins, so the two
 *  never overlap and the card stays fully opaque.
 *
 *  h-32, taller than the h-[88px] card it holds: the extra space above is
 *  where navFade sits. items-end docks the card at the bottom of that box.
 *
 *  The bottom inset is env(safe-area-inset-bottom) plus the pb-4 lift, not
 *  pb-4 alone - on a notched iPhone that env() is ~34px, and without it the
 *  card would sit right under the home-indicator's own swipe-up gesture
 *  zone, fighting the OS for that gesture instead of just being covered by
 *  the chrome. NAV_FOOTPRINT (constants/mobile) is this card's own 88px
 *  plus that 16px lift - keep them in sync if either changes. Scroll
 *  regions never need to clear the nav directly, since it sits entirely
 *  inside the sheet's own collapsed peek band, and each page's scroll
 *  region already tracks the sheet's live coverage (see MobileHome). */
export const navRoot =
  "pointer-events-none fixed inset-x-0 bottom-0 z-30 flex h-32 items-end px-6 [padding-bottom:calc(env(safe-area-inset-bottom)+16px)]";

/** The decorative fade above the card. h-6 (24px), not the 40px that
 *  h-32 minus h-[88px] alone suggests: navRoot's own padding-bottom (the
 *  safe-area lift) eats into its flex CONTENT box, not just empty space
 *  below it, so items-end docks the card 24px from navRoot's top, not 40 -
 *  confirmed by measuring the rendered boxes directly, since border-box
 *  sizing makes this easy to get wrong by eye. Sized to that real number so
 *  this ends exactly where the card begins and never paints over it. */
export const navFade =
  "pointer-events-none absolute inset-x-0 top-0 z-0 h-6 backdrop-blur-[20px] [mask-image:linear-gradient(to_top,black,transparent)]";

/** The card itself takes the taps - the bar around it is only a blur layer,
 *  so the page keeps working in the gaps beside it. relative z-10 keeps it
 *  stacked above navFade, though the two do not actually overlap. */
export const navCard =
  "pointer-events-auto relative z-10 flex h-[88px] flex-1 items-center justify-between rounded-3xl border border-solid border-default-300 bg-surface-raised px-6 pb-1 pt-2 shadow-nav backdrop-blur-[10px]";

export const navItem = "flex w-16 flex-col items-center justify-center";

export const navIconWrap = cva("flex size-10 items-center justify-center rounded-xl text-[20px]", {
  variants: {
    active: {
      true: "bg-accent text-accent-foreground",
      false: "text-text-strong",
    },
  },
  defaultVariants: { active: false },
});

export const navLabel = cva("text-center font-ui text-tiny", {
  variants: {
    active: {
      true: "text-accent",
      false: "text-text-strong",
    },
  },
  defaultVariants: { active: false },
});

/** Separates the two route tabs from the two outbound profile links. */
export const navDivider = "h-full w-px bg-border-subtle";
