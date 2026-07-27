import { cva } from "class-variance-authority";

/** Every ruler class string lives here so RulerScrollbar stays markup-only.
 *  Sizes and gap come straight from the Figma ruler component (node 55:1433). */

export const rulerRoot = "pointer-events-none flex w-10 flex-col items-end gap-2";

/** Tick width and colour both step down together with distance from the
 *  active index - width shrinks and colour fades from `text-strong` (near
 *  black) at distance 0 down to `default-300` (lightest grey) from distance 3
 *  outward, so the two read as one continuous "bulge" rather than two
 *  independent scales. */
export const rulerTickVariants = cva(
  "h-px transition-[width,background-color] duration-150 ease-out",
  {
    variants: {
      distance: {
        "0": "w-10 bg-text-strong",
        "1": "w-6 bg-default-600",
        "2": "w-4 bg-default-400",
        far: "w-2 bg-default-300",
      },
    },
    defaultVariants: { distance: "far" },
  }
);
