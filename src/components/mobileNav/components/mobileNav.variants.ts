import { cva } from "class-variance-authority";

/** Floating bar over whatever is behind it, blurring the sheet and the page
 *  as they pass underneath - the same glass treatment the desktop header
 *  uses. pb-4 is the inset that lifts the card off the screen edge; the
 *  88px total is MOBILE_NAV_HEIGHT, which scroll regions clear. */
export const navRoot =
  "pointer-events-none fixed inset-x-0 bottom-0 z-30 flex h-[88px] items-center px-6 pb-4 backdrop-blur-[20px]";

/** The card itself takes the taps - the bar around it is only a blur layer,
 *  so the page keeps working in the gaps beside it. */
export const navCard =
  "pointer-events-auto flex h-full flex-1 items-center justify-between rounded-3xl border border-solid border-default-300 bg-surface-raised px-6 pb-1 pt-2 shadow-nav backdrop-blur-[10px]";

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
