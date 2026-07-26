import type { ReactNode } from "react";

export interface CursorLabelProps {
  /** Text shown inside the pill that trails the cursor. */
  label: ReactNode;
  children: ReactNode;
  className?: string;
}
