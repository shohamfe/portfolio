import { cva } from "class-variance-authority";

export const stickyCardVariants = cva(
  "group relative flex w-[190px] flex-col gap-2 rounded-2xl border border-solid p-4 shadow-note [transform-style:preserve-3d]",
  {
    variants: {
      color: {
        blue: "bg-primary-50 border-primary-300",
        purple: "bg-secondary-50 border-secondary-300",
        pink: "bg-danger-50 border-danger-300",
        yellow: "bg-warning-50 border-warning-300",
        green: "bg-success-50 border-success-300",
      },
    },
    defaultVariants: { color: "blue" },
  },
);

export const stickyCardPerspective = "[perspective:600px]";

const popOnHover =
  "transition-transform duration-200 ease-linear [transform:translateZ(0px)]";

export const stickyCardChip = `${popOnHover} self-start group-hover:[transform:translateZ(24px)]`;

export const stickyCardTitle = `${popOnHover} font-body text-base font-bold text-text-strong group-hover:[transform:translateZ(30px)]`;

export const stickyCardBody = `${popOnHover} font-ui text-small text-text-muted group-hover:[transform:translateZ(15px)]`;
