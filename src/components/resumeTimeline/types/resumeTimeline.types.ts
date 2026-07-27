import type { ResumeEntry, ResumeSection } from "@/content/resume";

export interface ResumeTimelineProps {
  className?: string;
}

export interface ResumeSectionProps {
  section: ResumeSection;
}

export interface ResumeEntryProps {
  entry: ResumeEntry;
}
