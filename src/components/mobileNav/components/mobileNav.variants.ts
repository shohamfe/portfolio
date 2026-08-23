import { cva } from "class-variance-authority";

export const navRoot =
  "pointer-events-none fixed inset-x-0 bottom-0 z-30 flex h-32 items-end px-6 [padding-bottom:calc(env(safe-area-inset-bottom)+16px)]";

const glassSurface =
  "rounded-3xl border border-solid border-white bg-white/60 backdrop-blur-md";

export const navCard = `pointer-events-auto relative z-10 flex h-[88px] flex-1 items-center justify-between px-6 pb-1 pt-2 shadow-nav ${glassSurface}`;

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

export const connectPanel = `flex w-max origin-bottom-right flex-col gap-2 p-3 shadow-folder ${glassSurface}`;

export const connectRow =
  "flex min-h-12 items-center gap-3 rounded-2xl px-3 text-left font-ui text-body text-text-strong active:bg-default-300";

export const connectRowIcon = "text-[22px] text-text-muted";

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

export const connectSocials = "flex items-center justify-center gap-3";
