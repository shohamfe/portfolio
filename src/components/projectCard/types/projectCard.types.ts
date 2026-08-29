import type { CaseStudyProject } from "@/content/caseStudy";

export interface ProjectCardProps {
  project: CaseStudyProject;
  priority?: boolean;
  className?: string;
}
