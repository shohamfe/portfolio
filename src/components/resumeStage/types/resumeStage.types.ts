import type { RefObject } from "react";
import type { ROLE_LABELS } from "@/constants/site";

export interface ResumeStageProps {
  className?: string;
  roleLabel: (typeof ROLE_LABELS)[keyof typeof ROLE_LABELS];
}

export interface ResumeCardFieldProps {
  /** Cards clamp their drag to this element's bounds instead of their own
   *  narrow column, so they can be dragged anywhere across the full content
   *  width - including over the timeline text. */
  boundaryRef: RefObject<HTMLElement | null>;
  className?: string;
}
