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
