import type { ROLE_LABELS } from "@/constants/site";
import type { ResumeEntry } from "@/content/resume";

export interface MobileResumeProps {
  roleLabel: (typeof ROLE_LABELS)[keyof typeof ROLE_LABELS];
}

export interface MobileTimelineEntryProps {
  entry: ResumeEntry;
  /** False on the last entry of a section, where the connecting line would
   *  otherwise run on into empty space. */
  connected: boolean;
}
