import type { RefObject } from "react";
import type { ResumeCard } from "@/content/resume";

export interface StickyCardProps {
  card: ResumeCard;
  /** Degrees. Small resting rotation, e.g. -6 to 6. */
  rotation?: number;
  /** 0 to 1. How strongly this card tilts toward the cursor. Lower = further "back". */
  parallaxDepth?: number;
  /** Drag is clamped to this element's bounds - the card can never be pulled
   *  outside it, not even momentarily during the drag. Omit for unconstrained
   *  dragging. */
  boundaryRef?: RefObject<Element | null>;
  className?: string;
}
