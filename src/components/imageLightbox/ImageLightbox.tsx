"use client";

import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { PiX } from "react-icons/pi";
import { cn } from "@/lib/cn";
import {
  lightboxBackdrop,
  lightboxClose,
  lightboxFigure,
  lightboxImage,
  lightboxOverlay,
  lightboxTrigger,
} from "./components/imageLightbox.variants";
import { LIGHTBOX_TRANSITION } from "./constants/imageLightbox.constants";
import type { ImageLightboxProps } from "./types/imageLightbox.types";

/** Wraps a thumbnail so clicking it opens the full image over a blurred,
 *  dimmed backdrop - both fade in together, the image also scaling up from
 *  slightly smaller than its resting size. */
const ImageLightbox: React.FC<ImageLightboxProps> = ({
  src,
  alt,
  children,
  triggerClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    refs: { setReference, setFloating },
    context,
  } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "dialog" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <>
      <button
        ref={setReference}
        type="button"
        aria-label={`View ${alt} full size`}
        className={cn(lightboxTrigger, triggerClassName)}
        {...getReferenceProps()}
      >
        {children}
      </button>

      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <FloatingOverlay lockScroll className={lightboxOverlay}>
              <motion.div
                className={lightboxBackdrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={LIGHTBOX_TRANSITION}
              />

              <FloatingFocusManager context={context}>
                <motion.div
                  ref={setFloating}
                  className={lightboxFigure}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={LIGHTBOX_TRANSITION}
                  {...getFloatingProps()}
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="90vw"
                    className={lightboxImage}
                  />
                </motion.div>
              </FloatingFocusManager>

              <button
                type="button"
                aria-label="Close"
                className={lightboxClose}
                onClick={() => setIsOpen(false)}
              >
                <PiX aria-hidden />
              </button>
            </FloatingOverlay>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
};

export default ImageLightbox;
