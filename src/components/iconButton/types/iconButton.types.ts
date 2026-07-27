import type { ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import type { iconButtonVariants } from "../components/iconButton.variants";

export interface IconButtonProps extends VariantProps<typeof iconButtonVariants> {
  icon: ReactNode;
  /** Required - icon-only controls need an accessible name. */
  "aria-label": string;
  /** Renders as an <a> when provided (e.g. GitHub/Figma links), otherwise a <button>. */
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  className?: string;
}
