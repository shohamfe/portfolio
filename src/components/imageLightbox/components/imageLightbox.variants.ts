/** Sits over whatever fill-mode image it wraps, so the click target matches
 *  the thumbnail exactly without touching the parent's own sizing. */
export const lightboxTrigger = "absolute inset-0 block h-full w-full";

export const lightboxOverlay = "fixed inset-0 z-50 grid place-items-center p-6";

export const lightboxBackdrop = "absolute inset-0 bg-black/70 backdrop-blur-md";

export const lightboxFigure = "relative z-10 h-[85vh] w-[90vw] max-w-5xl";

export const lightboxImage = "object-contain";

export const lightboxClose =
  "fixed top-6 right-6 z-20 flex size-11 items-center justify-center rounded-full bg-black/70 text-2xl text-white backdrop-blur-md transition-colors hover:bg-black/85";
