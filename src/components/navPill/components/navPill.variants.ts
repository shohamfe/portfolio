import { cva } from "class-variance-authority";
import { ACCENT_SURFACE, NEUTRAL_SURFACE, PRESSABLE } from "@/lib/variants";

export const navPillVariants = cva(
  `inline-flex items-center rounded-full px-4 py-2 font-ui text-small ${PRESSABLE}`,
  {
    variants: {
      active: {
        true: ACCENT_SURFACE,
        false: NEUTRAL_SURFACE,
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);
