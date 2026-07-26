import { cva } from "class-variance-authority";

export const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full border border-border-subtle bg-surface-raised text-text-strong transition-colors hover:bg-default-50",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-small",
        md: "h-10 w-10 text-body",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);
