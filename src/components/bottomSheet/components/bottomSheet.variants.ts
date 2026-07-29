export const sheetRoot =
  "dot-grid fixed inset-x-0 bottom-0 z-20 flex flex-col overflow-clip rounded-t-3xl border-t border-solid border-default-300 bg-surface-raised shadow-nav [padding-bottom:calc(env(safe-area-inset-bottom))]";

export const sheetGripBar =
  "dot-grid absolute top-0 left-0 z-30 w-full flex shrink-0 touch-none flex-col items-center pointer-events-none gap-1.5 px-4 pt-3 backdrop-blur-md [-webkit-mask-image:linear-gradient(to_bottom,black,black_45%,transparent)] [mask-image:linear-gradient(to_bottom,black,black_45%,transparent)]";

export const sheetGrip =
  "flex w-full flex-col items-center gap-1.5 pointer-events-auto";

export const sheetHandle = "h-1 w-10 rounded-full bg-default-400";

export const sheetHint = "text-center font-ui text-tiny text-default-600";

export const sheetCanvasArea = "relative min-h-0 flex-1";

export const sheetCanvasLayer = "absolute inset-0 z-0 flex flex-col";

export const sheetTitleBlock =
  "flex flex-col w-full items-start gap-1 px-4 pt-3 pb-12 pointer-events-none";

export const sheetTitle =
  "font-display text-[24px] font-extrabold text-text-strong";

export const sectionUnderline = "h-[3px] w-10 rounded-full bg-accent";
