import type { RefObject } from "react";

export interface ResumeStageProps {
  className?: string;
}

export interface ResumeCardFieldProps {
  /** Cards clamp their drag to this element's bounds instead of their own
   *  narrow column, so they can be dragged anywhere across the full content
   *  width - including over the timeline text. */
  boundaryRef: RefObject<HTMLElement | null>;
  className?: string;
}
