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
        true: "bg-accent text-accent-foreground",
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

export const navDivider = "h-full w-px bg-border-subtle";
