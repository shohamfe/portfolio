import { cva } from "class-variance-authority";

/** Every StickyCard class string lives here so the component stays
 *  markup-only. `relative` is load-bearing, not decorative: z-index is inert
 *  on a static element, and whileDrag raises z-index while dragging. */
export const stickyCardVariants = cva(
  "relative flex w-[190px] flex-col gap-2 rounded-2xl border border-solid p-4 shadow-note",
  {
    variants: {
      color: {
        blue: "bg-primary-50 border-primary-300",
        purple: "bg-secondary-50 border-secondary-300",
        pink: "bg-danger-50 border-danger-300",
        yellow: "bg-warning-50 border-warning-300",
        green: "bg-success-50 border-success-300",
      },
    },
    defaultVariants: { color: "blue" },
  }
);

/** The card is a stretch-aligned flex column, so the chip would otherwise be
 *  pulled to the card's full width instead of hugging its own label. */
export const stickyCardChip = "self-start";

export const stickyCardTitle = "font-body text-base font-bold text-text-strong";

export const stickyCardBody = "font-ui text-small text-text-muted";
