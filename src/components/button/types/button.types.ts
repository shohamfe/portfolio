import type { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  /** Renders as an <a> when provided, otherwise a <button>. Plain <a> rather
   *  than next/link - this is used for error-recovery CTAs, where a hard
   *  navigation is the safer bet if the client-side router itself is what's
   *  in a broken state. */
  href?: string;
  onClick?: () => void;
  className?: string;
}
