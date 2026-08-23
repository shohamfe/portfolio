/** Interaction classes shared by every pressable control, so nav pills and
 *  icon buttons cannot drift apart. Pressed is deliberately distinct from
 *  hover: hover lightens, pressed sinks (inset shadow plus a slight scale). */
export const PRESSABLE =
  "transition-[color,background-color,box-shadow,transform] duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/** Neutral surface used by inactive pills and icon buttons. */
export const NEUTRAL_SURFACE =
  "bg-default-300 text-default-800 hover:bg-default-400 active:bg-default-400 active:shadow-[inset_0_2px_5px_0_rgba(0,0,0,0.22)]";

/** Accent surface used by the active nav pill. */
export const ACCENT_SURFACE =
  "bg-accent text-accent-foreground hover:bg-primary-300 active:bg-primary-300 active:shadow-[inset_0_2px_5px_0_rgba(0,0,0,0.28)]";

/** Tinted card surface per accent, shared by every card-like surface so the
 *  palette lives in one place. Spelled out rather than built from the colour
 *  name: Tailwind generates classes by scanning source text, so an
 *  interpolated `bg-${color}-50` produces no CSS at all. */
export const ACCENT_SURFACES = {
  blue: "bg-primary-50 border-primary-300",
  purple: "bg-secondary-50 border-secondary-300",
  pink: "bg-danger-50 border-danger-300",
  yellow: "bg-warning-50 border-warning-300",
  green: "bg-success-50 border-success-300",
};

/** The page surface every long-form view sits on: solid to the left, fading
 *  out so the dot grid behind it reads through on the right. */
export const PAGE_SURFACE =
  "bg-gradient-to-r from-surface-page from-80% to-transparent xl:from-60%";
