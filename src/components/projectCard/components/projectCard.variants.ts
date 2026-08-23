import { ACCENT_SURFACES } from "@/lib/variants";
import { cva } from "class-variance-authority";

export const projectCardVariants = cva(
  "overflow-hidden rounded-2xl border border-solid shadow-folder",
  {
    variants: { color: ACCENT_SURFACES },
    defaultVariants: { color: "blue" },
  },
);

export const projectCardImageSlot =
  "relative aspect-[923/517] w-full shrink-0 overflow-hidden";

export const projectCardImage = "mask-b-from-70% object-cover";

export const projectCardBody =
  "relative flex w-full flex-col items-start gap-4 px-4 pt-4 pb-4 2xl:px-10 2xl:pt-6 2xl:pb-10";

export const projectCardHeaderGroup = "flex w-full flex-col items-start gap-1";

export const projectCardTitleRow =
  "flex w-full items-start justify-between gap-4";

export const projectCardTitle =
  "min-w-0 font-display text-[18px] leading-none text-text-strong 2xl:text-h5";

export const projectCardMeta =
  "w-full text-small text-text-muted 2xl:text-body";

export const projectCardBlurb =
  "w-full text-small text-text-strong 2xl:text-body";

export const projectCardRoleGroup = "flex w-full flex-col items-start gap-1";

export const projectCardRole =
  "w-full text-small text-text-strong 2xl:text-body";

export const projectCardTech =
  "w-full font-code text-small text-text-muted 2xl:text-[16px]";
