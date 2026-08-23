import type { CaseStudyProject } from "@/content/caseStudy";
import type {
  ProjectDecision,
  ProjectDetail,
  ProjectEvidenceItem,
  ProjectProseSection,
} from "@/content/projectDetail";

export interface ProjectStageProps {
  project: CaseStudyProject;
  detail: ProjectDetail;
  nextProject?: CaseStudyProject;
}

export interface ProjectHeroProps {
  project: CaseStudyProject;
  detail: ProjectDetail;
}

export interface ProjectSectionProps {
  index: number;
  title: string;
  children: React.ReactNode;
}

export interface ProjectProseProps {
  index: number;
  section: ProjectProseSection;
}

export interface ProjectCalloutProps {
  text: string;
}

export interface ProjectWindowProps {
  caption: string;
  badge: string;
  image?: string;
  imageAlt: string;
  placeholder: string;
  placeholderNote?: string;
}

export interface ProjectDecisionCardProps {
  decision: ProjectDecision;
}

export interface ProjectEvidenceCardProps {
  item: ProjectEvidenceItem;
}

export interface ProjectNextProps {
  project: CaseStudyProject;
}

export interface ProjectPlaceholderProps {
  label: string;
  note?: string;
}
