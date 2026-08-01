import { cva } from "class-variance-authority";

export const folderRoot =
  "group flex h-[196px] w-[175px] flex-col items-center justify-end gap-4";

export const folderStack = "flex h-40 w-full flex-col items-center justify-end";

export const sheetRow =
  "relative z-0 mb-[-64px] flex items-center justify-center";

export const folderBody =
  "relative z-10 flex h-[125px] w-full items-center justify-center rounded-[32px] border-2 border-solid border-white bg-white/60 p-1 shadow-folder backdrop-blur-md";

export const logoCard =
  "flex size-[60px] items-center justify-center overflow-clip rounded-2xl bg-white p-2.5 shadow-logo-card";

export const logoImage = "size-10 object-contain";

export const folderLabel =
  "text-center font-body text-[16px] font-medium text-black";

// Badge bg matches sheet border color, not flat grey.
export const sheetIconBadgeVariants = cva(
  "flex items-center justify-center rounded-full p-1",
  {
    variants: {
      color: {
        blue: "bg-primary-300",
        purple: "bg-secondary-300",
        pink: "bg-danger-300",
        yellow: "bg-warning-300",
        green: "bg-success-300",
        grey: "bg-default-300",
      },
    },
    defaultVariants: { color: "grey" },
  },
);

export const sheetIconVariants = cva("size-4", {
  variants: {
    color: {
      blue: "border-primary",
      purple: "border-secondary",
      pink: "border-danger",
      yellow: "border-warning",
      green: "border-success",
      grey: "border-default-700",
    },
  },
  defaultVariants: { color: "grey" },
});

/** 70px note with upward shadow. On hover: rotates/lifts to reveal behind folder. */
export const sheetVariants = cva(
  "flex size-[70px] shrink-0 flex-col items-start rounded-lg border border-solid p-2 shadow-note transition-transform duration-300 ease-out",
  {
    variants: {
      color: {
        blue: "bg-primary-50 border-primary-300",
        purple: "bg-secondary-50 border-secondary-300",
        pink: "bg-danger-50 border-danger-300",
        yellow: "bg-warning-50 border-warning-300",
        green: "bg-success-50 border-success-300",
        grey: "bg-white border-default-300",
      },
      side: {
        left: "-rotate-5 group-hover:-translate-y-8 group-hover:-rotate-12",
        right: "rotate-5 group-hover:-translate-y-8 group-hover:rotate-12",
      },
    },
    defaultVariants: { color: "grey", side: "left" },
  },
);
