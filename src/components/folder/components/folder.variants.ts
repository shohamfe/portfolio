import { cva } from "class-variance-authority";

/** Every folder class string lives here so the components stay markup-only.
 *  Sizes, radii and offsets come from the Figma folder component. */

/* `group` lets the sheets react to hover anywhere on the folder, not just
 * when the pointer is directly over a 70px sheet. */
export const folderRoot = "group flex h-[196px] w-[175px] flex-col items-center justify-end gap-4";

export const folderStack = "flex h-40 w-full flex-col items-center justify-end";

/** Sheets tuck 64px behind the folder body. */
export const sheetRow = "relative z-0 mb-[-64px] flex items-center justify-center";

/* bg-white/60 is load-bearing, not decorative: backdrop-blur alone has no
 * reliable visible tint of its own, so without a translucent colour under it
 * the card reads as a bare blur patch rather than a frosted card. */
export const folderBody =
  "relative z-10 flex h-[125px] w-full items-center justify-center rounded-[32px] border-2 border-solid border-white bg-white/60 p-1 shadow-folder backdrop-blur-[20px]";

export const logoCard =
  "flex size-[60px] items-center justify-center overflow-clip rounded-2xl bg-white p-2.5 shadow-logo-card";

export const logoImage = "size-10 object-contain";

export const folderLabel = "text-center font-body text-[16px] font-medium text-black";

/** Badge background matches its sheet's own border colour (bg-primary-300 for
 *  the blue sheet, etc.), rather than a flat grey regardless of sheet colour. */
export const sheetIconBadgeVariants = cva("flex items-center justify-center rounded-full p-1", {
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
});

export const sheetIcon = "size-4";

/** 70px note with a colour-matched border and a shadow that lifts upward,
 *  since the sheet reads as sitting behind and above the folder body.
 *
 *  On hover it fans out — rotates further and lifts higher, revealing most of
 *  the note from behind the folder body. Figma's prototype interactions
 *  aren't exposed by any available tool, so these values are a reasonable
 *  guess rather than a pulled spec; revise against the real prototype. */
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
  }
);
