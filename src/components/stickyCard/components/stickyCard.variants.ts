import { cva } from "class-variance-authority";

/** Every StickyCard class string lives here so the component stays
 *  markup-only. `relative` is load-bearing, not decorative: z-index is inert
 *  on a static element, and whileDrag raises z-index while dragging.
 *
 *  This is the grip itself - the same element that carries drag AND the
 *  cursor tilt (see useStickyCardTilt) - not a separate inner wrapper. The
 *  tilt has to land on the actual visible box (the one with the border,
 *  background, shadow) or it reads as only the text inside a static card
 *  shifting, rather than the card itself leaning. group + preserve-3d let
 *  the translateZ'd chip/title/body below sit at their own depth on hover
 *  instead of being flattened back onto this element's plane. */
export const stickyCardVariants = cva(
  "group relative flex w-[190px] flex-col gap-2 rounded-2xl border border-solid p-4 shadow-note [transform-style:preserve-3d]",
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
 *  a card leaning in space.
 *
 *  600px, not the 1000px this started at: perspective is the viewer's
 *  distance from the plane, so a larger value flattens the effect. At
 *  1000px against a 190px card, the tilt barely foreshortened at all.
 *  Pulling the viewer closer makes the same rotation actually read as
 *  depth. */
export const stickyCardPerspective = "[perspective:600px]";

/** Shared by every element that pops toward the viewer on hover - only the
 *  translateZ distance differs per item. group-hover (not a JS-driven state)
 *  is enough here since the effect is a static "how far forward" rather than
 *  anything cursor-position-dependent - that part is pure CSS.
 *
 *  Distances are smaller than they look: how far these read as popping
 *  depends on the perspective they sit in, and that tightened from 1000px
 *  to 600px, which magnifies a given translateZ by roughly 1.7x. These were
 *  scaled down to match so the children do not overpower the card's own
 *  tilt - the card is the thing that should read as moving first. */
const popOnHover = "transition-transform duration-200 ease-linear [transform:translateZ(0px)]";

/** The card is a stretch-aligned flex column, so the chip would otherwise be
 *  pulled to the card's full width instead of hugging its own label. */
export const stickyCardChip = `${popOnHover} self-start group-hover:[transform:translateZ(24px)]`;

export const stickyCardTitle = `${popOnHover} font-body text-base font-bold text-text-strong group-hover:[transform:translateZ(30px)]`;

export const stickyCardBody = `${popOnHover} font-ui text-small text-text-muted group-hover:[transform:translateZ(15px)]`;
