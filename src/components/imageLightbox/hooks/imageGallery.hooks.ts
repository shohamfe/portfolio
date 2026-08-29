"use client";

import { useCallback, useMemo, useState } from "react";
import type { GalleryItem, ImageGallery } from "../types/imageLightbox.types";

/** Owns which image (if any) is open in a shared gallery modal, so a page
 *  with several thumbnails - a hero plus a few evidence shots - can step
 *  between all of them from one open lightbox instead of each thumbnail
 *  running its own. */
export const useImageGallery = (
  items: readonly GalleryItem[],
): ImageGallery => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const open = useCallback((index: number) => setOpenIndex(index), []);
  const close = useCallback(() => setOpenIndex(null), []);

  const next = useCallback(() => {
    setOpenIndex((index) =>
      index === null ? null : (index + 1) % items.length,
    );
  }, [items.length]);

  const previous = useCallback(() => {
    setOpenIndex((index) =>
      index === null ? null : (index - 1 + items.length) % items.length,
    );
  }, [items.length]);

  return useMemo(
    () => ({
      items,
      openIndex,
      isOpen: openIndex !== null,
      open,
      close,
      next,
      previous,
    }),
    [items, openIndex, open, close, next, previous],
  );
};
