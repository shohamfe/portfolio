import { cn } from "@/lib/cn";
import { ACCENT_SURFACE, PRESSABLE } from "@/lib/variants";

export const buttonRoot = cn(
  "inline-flex h-12 items-center justify-center rounded-full px-6 font-ui text-[16px] leading-6",
  ACCENT_SURFACE,
  PRESSABLE,
);
