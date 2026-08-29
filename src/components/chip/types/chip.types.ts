import type { ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import type { chipVariants } from "../components/chip.variants";

export interface ChipProps extends VariantProps<typeof chipVariants> {
  children: ReactNode;
  className?: string;
  /** Icon rendered before `children`, e.g. a 20px phosphor/react-icons glyph. */
  startContent?: ReactNode;
}
