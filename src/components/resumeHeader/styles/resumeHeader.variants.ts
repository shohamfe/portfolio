import { cn } from "@/lib/cn";
import { ACCENT_SURFACE, PRESSABLE } from "@/lib/variants";

export const downloadButton = cn(
  "inline-flex items-center gap-2 rounded-full px-4 py-2 font-ui text-small",
  ACCENT_SURFACE,
  PRESSABLE,
);

export const resumeHeaderRoot =
  "pointer-events-none inset-x-0 flex min-h-40 flex-col justify-between gap-4 px-10 pb-8 pt-12";

export const resumeHeaderName =
  "pointer-events-auto w-fit font-display text-h2 font-bold text-text-strong";
