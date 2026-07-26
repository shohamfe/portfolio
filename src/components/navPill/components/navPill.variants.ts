import { cva } from "class-variance-authority";

export const navPillVariants = cva(
  "inline-flex items-center rounded-full px-4 py-2 text-small font-ui transition-colors",
  {
    variants: {
      active: {
        true: "bg-accent text-accent-foreground",
        // default-50 was near-white on a near-white page, so inactive pills
        // were effectively invisible.
        false: "bg-default-300 text-default-800 hover:bg-default-400",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);
