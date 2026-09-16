import type { CaseStudyThread } from "@/content/caseStudy";

export interface ThreadNoteProps {
  thread: CaseStudyThread;
}

export interface CaseStudySectionIntroProps {
  title: string;
  lines: readonly string[];
  className?: string;
}
