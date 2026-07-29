import { cva } from "class-variance-authority";

/** Floating bar over whatever is behind it, blurring the sheet and the page
 *  as they pass underneath - the same glass treatment the desktop header
 *  uses, but faded rather than a hard-edged rectangle: the box is taller
 *  than the card it holds (h-32, not h-[88px]), with a mask-image gradient
 *  thinning the blur out toward the top so it blends into the page instead
 *  of cutting off sharply. items-end docks the card at the bottom of that
 *  taller box, same as stageHeaderBlur being taller than the header content
 *  it sits behind on desktop.
 *
 *  The bottom inset is env(safe-area-inset-bottom) plus the pb-4 lift, not
 *  pb-4 alone - on a notched iPhone that env() is ~34px, and without it the
 *  card would sit right under the home-indicator's own swipe-up gesture
 *  zone, fighting the OS for that gesture instead of just being covered by
 *  the chrome. NAV_FOOTPRINT (constants/mobile) is this card's own 88px
 *  plus that 16px lift - keep them in sync if either changes. Scroll
 *  regions never need to clear the nav directly, since it sits entirely
 *  inside the sheet's own collapsed peek band, which scroll regions already
 *  clear via SCROLL_BOTTOM_CLEARANCE. */
export const navRoot =
  "pointer-events-none fixed inset-x-0 bottom-0 z-30 flex h-32 items-end px-6 backdrop-blur-[20px] [mask-image:linear-gradient(to_top,black,black_45%,transparent)] [padding-bottom:calc(env(safe-area-inset-bottom)+16px)]";

/** The card itself takes the taps - the bar around it is only a blur layer,
 *  so the page keeps working in the gaps beside it. An explicit h-[88px],
 *  not h-full: navRoot is taller than this card now (see above), and h-full
 *  would stretch the card to match instead of keeping its own fixed size. */
export const navCard =
  "pointer-events-auto flex h-[88px] flex-1 items-center justify-between rounded-3xl border border-solid border-default-300 bg-surface-raised px-6 pb-1 pt-2 shadow-nav backdrop-blur-[10px]";

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
