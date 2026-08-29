export interface ImageLightboxProps {
  /** Full-size image shown in the modal - the trigger's own thumbnail can be
   *  a different crop/size. */
  src: string;
  alt: string;
  /** The clickable thumbnail - typically a next/image with `fill`. */
  children: React.ReactNode;
  triggerClassName?: string;
}
