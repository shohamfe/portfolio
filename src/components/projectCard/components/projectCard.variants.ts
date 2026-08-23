import { cva } from "class-variance-authority";

export const projectCardVariants = cva(
  "relative overflow-hidden rounded-2xl border border-solid shadow-folder",
  {
    variants: {
      color: {
        blue: "border-primary-300 bg-primary-50",
        purple: "border-secondary-300 bg-secondary-50",
        pink: "border-danger-300 bg-danger-50",
        yellow: "border-warning-300 bg-warning-50",
        green: "border-success-300 bg-success-50",
      },
    },
    defaultVariants: { color: "blue" },
  },
);

export const projectCardGradientOverlay = cva(
  "pointer-events-none absolute inset-0",
  {
    variants: {
      color: {
        blue: "bg-[linear-gradient(to_bottom,transparent_70%,var(--color-primary-50)_100%)]",
        purple:
          "bg-[linear-gradient(to_bottom,transparent_70%,var(--color-secondary-50)_100%)]",
        pink: "bg-[linear-gradient(to_bottom,transparent_70%,var(--color-danger-50)_100%)]",
        yellow:
          "bg-[linear-gradient(to_bottom,transparent_70%,var(--color-warning-50)_100%)]",
        green:
          "bg-[linear-gradient(to_bottom,transparent_70%,var(--color-success-50)_100%)]",
      },
    },
    defaultVariants: { color: "blue" },
  },
);

export const projectCardImageSlot =
  "relative aspect-[923/517] w-full shrink-0 overflow-hidden";

export const projectCardImage = "object-cover";

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
