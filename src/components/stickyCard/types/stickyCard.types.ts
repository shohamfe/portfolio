import type { ResumeCard } from "@/content/resume";

export interface StickyCardProps {
  card: ResumeCard;
  /** Degrees. Small resting rotation, e.g. -6 to 6. */
  rotation?: number;
  /** 0 to 1. How strongly this card drifts with the cursor. Lower = further "back". */
  parallaxDepth?: number;
  className?: string;
}
