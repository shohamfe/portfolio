import type { ResumeEntry } from "@/content/resume";

export interface MobileTimelineEntryProps {
  entry: ResumeEntry;
  /** False on the last entry of a section, where the connecting line would
   *  otherwise run on into empty space. */
  connected: boolean;
}
