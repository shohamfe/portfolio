import { cva } from "class-variance-authority";

/** Every ruler class string lives here so RulerScrollbar stays markup-only.
 *  Sizes and gap come straight from the Figma ruler component (node 55:1433). */

/** h-full + justify-between (not a fixed gap) so the ruler always spans
 *  whatever height its container gives it, spreading tickCount ticks evenly
 *  across that space rather than stacking to a short, fixed total height. */
export const rulerRoot =
  "flex h-full w-10 flex-col items-end justify-between outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent";

/** Tick width and colour both step down together with distance from the
 *  active index - width shrinks and colour fades from `text-strong` (near
 *  black) at distance 0 down to `default-300` (lightest grey) from the
 *  active radius outward, so the two read as one continuous "bulge" rather
 *  than two independent scales. */
export const rulerTickVariants = cva(
  "h-1 rounded-full transition-[width,background-color] duration-150 ease-out",
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
  },
);

/** The bulge under the cursor - same falloff shape as rulerTickVariants, but
 *  every step is smaller and lighter, so hovering never competes with or
 *  outshines the tick that marks where the page actually is. "far" matches
 *  the base tick exactly: outside the hover radius, hovering has no effect. */
export const rulerHoverTickVariants = cva(
  "h-1 rounded-full transition-[width,background-color] duration-150 ease-out",
  {
    variants: {
      distance: {
        "0": "w-7 bg-default-600",
        "1": "w-5 bg-default-400",
        "2": "w-3 bg-default-300",
        far: "w-2 bg-default-300",
      },
    },
    defaultVariants: { distance: "far" },
  },
);
