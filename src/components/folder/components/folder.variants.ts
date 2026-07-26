import { cva } from "class-variance-authority";

/** Sticky-note sheets that sit behind the folder body. Values taken from the
 *  Figma folder component: 70px square, 8px radius, 8px padding, and a shadow
 *  that lifts upward rather than down. */
export const sheetVariants = cva(
  "flex size-[70px] shrink-0 flex-col items-start rounded-lg border border-solid p-2 drop-shadow-[0px_-10px_7.5px_rgba(0,0,0,0.05)]",
  {
    variants: {
      color: {
        blue: "bg-primary-50 border-primary-300",
        purple: "bg-secondary-50 border-secondary-300",
        pink: "bg-danger-50 border-danger-300",
        yellow: "bg-warning-50 border-warning-300",
        green: "bg-success-50 border-success-300",
        grey: "bg-white border-default-300",
      },
      side: {
        left: "-rotate-5",
        right: "rotate-5",
      },
    },
    defaultVariants: { color: "grey", side: "left" },
  }
);
