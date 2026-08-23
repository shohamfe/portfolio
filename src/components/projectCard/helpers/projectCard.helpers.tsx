import { CASE_STUDY_ROUTE } from "@/components/projectStage/constants/projectStage.constants";
import { PROJECT_DETAILS } from "@/content/projectDetail";
import { FaFigma, FaGithub } from "react-icons/fa6";
import { PiArchive } from "react-icons/pi";

const PROJECT_LINK_ICONS: Record<string, React.ReactNode> = {
  "Design Files": <FaFigma aria-hidden />,
  "Source Code": <FaGithub aria-hidden />,
  Archive: <PiArchive aria-hidden />,
};

export const getProjectLinkIcon = (label: string): React.ReactNode =>
  PROJECT_LINK_ICONS[label];

/** Only projects with a written case study link anywhere; the rest would 404. */
export const getProjectHref = (projectId: string): string | undefined =>
  projectId in PROJECT_DETAILS ? `${CASE_STUDY_ROUTE}/${projectId}` : undefined;
