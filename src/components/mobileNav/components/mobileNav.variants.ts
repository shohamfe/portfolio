import { cva } from "class-variance-authority";

export const navRoot =
  "pointer-events-none fixed inset-x-0 bottom-0 z-30 flex h-32 items-end px-6 [padding-bottom:calc(env(safe-area-inset-bottom)+16px)]";

export const navCard =
  "pointer-events-auto relative z-10 flex h-[88px] flex-1 items-center justify-between rounded-3xl border border-solid border-default-300 bg-surface-raised px-6 pb-1 pt-2 shadow-nav border-white bg-white/60 backdrop-blur-md";

export const navItem = "flex w-16 flex-col items-center justify-center";

export const navIconWrap = cva(
  "flex size-10 items-center justify-center rounded-xl text-[20px]",
  {
    variants: {
      active: {
        true: "text-accent",
        false: "text-text-strong",
      },
    },
    defaultVariants: { active: false },
  },
);

export const navLabel = cva("text-center font-ui text-tiny", {
  variants: {
    active: {
      true: "text-accent",
      false: "text-text-strong",
    },
  },
  defaultVariants: { active: false },
});

export const connectAnchor = "z-40";

export const connectPanel =
  "flex w-max origin-bottom-right flex-col gap-2 rounded-3xl border border-solid border-default-300 bg-white/90 p-3 shadow-folder backdrop-blur-xl";

export const connectRow =
  "flex items-center gap-3 rounded-2xl px-3 py-2 text-left font-ui text-small text-text-strong active:bg-default-300";

export const connectRowIcon = "text-[18px] text-text-muted";

export const connectRowValue = "flex-1 whitespace-nowrap";

export const connectRowStatus = cva("text-[16px]", {
  variants: {
    copied: {
      true: "text-accent",
      false: "text-default-400",
    },
  },
  defaultVariants: { copied: false },
});

export const connectDivider = "h-px w-full bg-border-subtle";

export const connectSocials = "flex items-center justify-center gap-2 pb-1";
