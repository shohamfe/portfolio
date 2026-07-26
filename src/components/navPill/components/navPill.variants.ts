import { cva } from "class-variance-authority";

export const navPillVariants = cva(
  "inline-flex items-center rounded-full px-4 py-2 text-small font-ui transition-colors",
  {
    variants: {
      active: {
        true: "bg-accent text-accent-foreground",
        false: "bg-default-50 text-text-muted hover:text-text-strong",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);
