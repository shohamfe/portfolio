import type { ImageGallery } from "@/components/imageLightbox/types/imageLightbox.types";
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
  previousProject?: CaseStudyProject;
  nextProject?: CaseStudyProject;
}

export interface ProjectHeroProps {
  project: CaseStudyProject;
  detail: ProjectDetail;
  previousProject?: CaseStudyProject;
  nextProject?: CaseStudyProject;
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
  /** Omitted when `image` is, since there's nothing to open. */
  gallery?: ImageGallery;
  galleryIndex?: number;
}

export interface ProjectDecisionCardProps {
  decision: ProjectDecision;
}

export interface ProjectEvidenceCardProps {
  item: ProjectEvidenceItem;
  gallery?: ImageGallery;
  galleryIndex?: number;
}

export interface ProjectPagerProps {
  previousProject?: CaseStudyProject;
  nextProject?: CaseStudyProject;
  variant: "card" | "bar";
}

export interface ProjectPlaceholderProps {
  label: string;
  note?: string;
}
