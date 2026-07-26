import { cva } from "class-variance-authority";

/** The two coloured sheets that peek out from behind each folder body. */
export const sheetVariants = cva(
  "absolute top-0 flex h-16 w-20 items-start justify-center rounded-xl pt-1.5 shadow-sm",
  {
    variants: {
      color: {
        pink: "bg-danger-50 text-danger",
        green: "bg-success-50 text-success",
        yellow: "bg-warning-50 text-warning",
        grey: "bg-default-50 text-default-600",
        blue: "bg-primary-50 text-primary",
        purple: "bg-secondary-50 text-secondary",
      },
      side: {
        left: "left-0 -rotate-6 origin-bottom-right",
        right: "right-0 rotate-6 origin-bottom-left",
      },
    },
    defaultVariants: { color: "grey", side: "left" },
  }
);
