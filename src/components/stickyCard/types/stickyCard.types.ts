import type { RefObject } from "react";
import type { ResumeCard } from "@/content/resume";

export interface StickyCardProps {
  card: ResumeCard;
  /** Degrees. Small resting rotation, e.g. -6 to 6. */
  rotation?: number;
  /** 0 to 1. How strongly this card tilts toward the cursor while hovered. Lower = further "back". */
  parallaxDepth?: number;
  /** Drag is clamped to this element's bounds - the card can never be pulled
   *  outside it, not even momentarily during the drag. Omit for unconstrained
   *  dragging. */
  boundaryRef?: RefObject<Element | null>;
  className?: string;
  /** Exposes the draggable card element to a caller - used to point the
   *  resume tutorial spotlight's stage1TargetRef at one specific card. */
  cardRef?: RefObject<HTMLDivElement | null>;
  /** Fired once per drag that actually moves the card (not a stray click) -
   *  used to mark the resume tutorial's stage 1 as complete. */
  onDragCommit?: () => void;
}
