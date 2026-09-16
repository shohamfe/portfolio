"use client";

import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { cn } from "@/lib/cn";
import { AnimatePresence, motion } from "motion/react";
import { PiCaretLeft, PiCaretRight, PiX } from "react-icons/pi";
import GlassTransitionCanvas from "./components/GlassTransitionCanvas";
import {
  lightboxArrow,
  lightboxArrowLeft,
  lightboxArrowRight,
  lightboxBackdrop,
  lightboxClose,
  lightboxFigure,
  lightboxOverlay,
} from "./components/imageLightbox.variants";
import { LIGHTBOX_TRANSITION } from "./constants/imageLightbox.constants";
import type { ImageGalleryModalProps } from "./types/imageLightbox.types";

/** One modal shared by every thumbnail on the page - opened at whichever
 *  index a thumbnail was clicked at, then steppable with prev/next without
 *  closing. Open/close is a plain scale-and-fade over a blurred backdrop;
 *  moving between images crossfades with the glass shader instead. */
const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({ gallery }) => {
  const { items, openIndex, isOpen, close, next, previous } = gallery;

  const {
    refs: { setFloating },
    context,
  } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      if (!open) close();
    },
  });

  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "dialog" });
  const { getFloatingProps } = useInteractions([dismiss, role]);

  const current = openIndex === null ? null : items[openIndex];
  const hasMultiple = items.length > 1;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") previous();
    else if (event.key === "ArrowRight") next();
  };

  return (
    <FloatingPortal>
      <AnimatePresence>
        {isOpen && current && (
          <FloatingOverlay lockScroll className={lightboxOverlay}>
            <motion.div
              className={lightboxBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={LIGHTBOX_TRANSITION}
            />

            {/* Everything a click shouldn't dismiss through - the image and
             *  its controls - shares one floating ref, so useDismiss only
             *  treats the backdrop itself as "outside". Sized and centered
             *  itself (rather than display:contents passing that through to
             *  the grid parent) since Safari has long-standing bugs placing
             *  absolutely positioned descendants of a display:contents box. */}
            <FloatingFocusManager context={context}>
              <div
                ref={setFloating}
                className="absolute inset-0 grid place-items-center"
                onKeyDown={handleKeyDown}
                {...getFloatingProps()}
              >
                <motion.div
                  className={lightboxFigure}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={LIGHTBOX_TRANSITION}
                >
                  {/* The glass shader only composites image textures - a
                   *  video plays natively instead of wiping between frames.
                   *  Sized to its own aspect ratio rather than stretched with
                   *  object-contain: a video element paints its own
                   *  letterboxing opaque black, so leaving the surrounding
                   *  space to this transparent wrapper instead keeps the
                   *  modal's blurred backdrop visible around it. */}
                  {current.type === "video" ? (
                    <div className="flex size-full items-center justify-center">
                      <video
                        key={current.src}
                        src={current.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="max-h-full max-w-full"
                      />
                    </div>
                  ) : (
                    <GlassTransitionCanvas
                      src={current.src}
                      alt={current.alt}
                      className="size-full"
                    />
                  )}
                </motion.div>

                {hasMultiple && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous image"
                      className={cn(lightboxArrow, lightboxArrowLeft)}
                      onClick={previous}
                    >
                      <PiCaretLeft aria-hidden />
                    </button>

                    <button
                      type="button"
                      aria-label="Next image"
                      className={cn(lightboxArrow, lightboxArrowRight)}
                      onClick={next}
                    >
                      <PiCaretRight aria-hidden />
                    </button>
                  </>
                )}

                <button
                  type="button"
                  aria-label="Close"
                  className={lightboxClose}
                  onClick={close}
                >
                  <PiX aria-hidden />
                </button>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </AnimatePresence>
    </FloatingPortal>
  );
};

export default ImageGalleryModal;
