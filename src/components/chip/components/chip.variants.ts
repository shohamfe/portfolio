import { cva } from "class-variance-authority";

/** Colour variants map to the primary/secondary/danger/warning/success token
 *  families, named after their visual hue for callers picking a chip colour. */
export const chipVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-tiny font-ui font-medium",
  {
    variants: {
      color: {
        blue: "bg-primary-50 text-primary",
        purple: "bg-secondary-50 text-secondary",
        pink: "bg-danger-50 text-danger",
        yellow: "bg-warning-50 text-warning",
        green: "bg-success-50 text-success",
      },
    },
    defaultVariants: {
      color: "blue",
    },
  }
);
