import { cva } from "class-variance-authority";
import { NEUTRAL_SURFACE, PRESSABLE } from "@/lib/variants";

/** Shares NEUTRAL_SURFACE and PRESSABLE with NavPill so icon buttons read as
 *  the same control family, just round. */
export const iconButtonVariants = cva(
  `inline-flex items-center justify-center rounded-full ${NEUTRAL_SURFACE} ${PRESSABLE}`,
  {
    variants: {
      size: {
        sm: "size-8 text-small",
        md: "size-10 text-body",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);
