export interface GalleryImage {
  src: string;
  alt: string;
}

export interface ImageGallery {
  items: readonly GalleryImage[];
  openIndex: number | null;
  isOpen: boolean;
  open: (index: number) => void;
  close: () => void;
  next: () => void;
  previous: () => void;
}

export interface ImageGalleryModalProps {
  gallery: ImageGallery;
}

export interface GlassTransitionCanvasProps {
  /** The image to show. Changing this from a previous value crossfades to
   *  it with the glass effect instead of cutting directly. */
  src: string;
  alt: string;
  className?: string;
}
