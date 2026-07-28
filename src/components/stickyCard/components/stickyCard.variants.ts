import { cva } from "class-variance-authority";

/** Every StickyCard class string lives here so the component stays
 *  markup-only. `relative` is load-bearing, not decorative: z-index is inert
 *  on a static element, and whileDrag raises z-index while dragging.
 *
 *  No flex/gap here anymore - the perspective and tilt wrappers sit between
 *  this and its actual content, so the column layout moved to
 *  stickyCardTilt, the element that directly holds the chip/title/body. */
export const stickyCardVariants = cva(
  "relative w-[190px] rounded-2xl border border-solid p-4 shadow-note",
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

/** Establishes the 3D viewing volume the tilted card renders into -
 *  perspective has to live on a parent of the tilted element, not the
 *  tilted element itself, or the rotation reads as a flat skew instead of
 *  a card leaning in space. */
export const stickyCardPerspective = "[perspective:1000px]";

/** The element useCard3DTilt rotates directly via ref, in sync with the
 *  cursor. preserve-3d lets the translateZ'd items below actually sit at
 *  their own depth instead of being flattened back onto this element's
 *  plane; the transition is what smooths the reset back to flat on
 *  mouse-leave (mouse-move updates are immediate, matching the cursor). */
export const stickyCardTilt =
  "group relative flex flex-col gap-2 [transform-style:preserve-3d] transition-transform duration-200 ease-linear";

/** Shared by every element that pops toward the viewer on hover - only the
 *  translateZ distance differs per item. group-hover (not a JS-driven state)
 *  is enough here since the effect is a static "how far forward" rather than
 *  anything cursor-position-dependent - that part is pure CSS. */
const popOnHover = "transition-transform duration-200 ease-linear [transform:translateZ(0px)]";

/** The card is a stretch-aligned flex column, so the chip would otherwise be
 *  pulled to the card's full width instead of hugging its own label. */
export const stickyCardChip = `${popOnHover} self-start group-hover:[transform:translateZ(40px)]`;

export const stickyCardTitle = `${popOnHover} font-body text-base font-bold text-text-strong group-hover:[transform:translateZ(50px)]`;

export const stickyCardBody = `${popOnHover} font-ui text-small text-text-muted group-hover:[transform:translateZ(25px)]`;
