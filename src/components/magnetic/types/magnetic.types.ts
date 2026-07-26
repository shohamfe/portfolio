import type { SpringOptions } from "motion/react";

export type MagneticActionArea = "self" | "parent" | "global";

export interface MagneticProps {
  children: React.ReactNode;
  /** How strongly the child is pulled toward the cursor. */
  intensity?: number;
  /** Pixel radius around the element where the pull is active. */
  range?: number;
  /** Whether hover is tracked on the element itself, its parent, or always-on. */
  actionArea?: MagneticActionArea;
  springOptions?: SpringOptions;
}
