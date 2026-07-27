import { cva } from "class-variance-authority";

/** Colour variants map to the primary/secondary/danger/warning/success token
 *  families, named after their visual hue for callers picking a chip colour.
 *
 *  `flat` is a tinted background with matching text. `solid` fills with the
 *  full-strength colour instead, which is what the resume sticky notes need:
 *  their card background is already the -50 tint, so a flat chip would be the
 *  exact same colour as the card it sits on and vanish into it.
 *
 *  The foreground token differs per colour rather than always being white -
 *  warning and success are light enough that they pair with black text. */
export const chipVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 font-ui text-tiny font-medium",
  {
    variants: {
      color: {
        blue: "",
        purple: "",
        pink: "",
        yellow: "",
        green: "",
      },
      variant: {
        flat: "",
        solid: "",
      },
    },
    compoundVariants: [
      { color: "blue", variant: "flat", class: "bg-primary-50 text-primary" },
      { color: "purple", variant: "flat", class: "bg-secondary-50 text-secondary" },
      { color: "pink", variant: "flat", class: "bg-danger-50 text-danger" },
      { color: "yellow", variant: "flat", class: "bg-warning-50 text-warning" },
      { color: "green", variant: "flat", class: "bg-success-50 text-success" },

      { color: "blue", variant: "solid", class: "bg-primary text-primary-foreground" },
      { color: "purple", variant: "solid", class: "bg-secondary text-secondary-foreground" },
      { color: "pink", variant: "solid", class: "bg-danger text-danger-foreground" },
      { color: "yellow", variant: "solid", class: "bg-warning text-warning-foreground" },
      { color: "green", variant: "solid", class: "bg-success text-success-foreground" },
    ],
    defaultVariants: {
      color: "blue",
      variant: "flat",
    },
  }
);
