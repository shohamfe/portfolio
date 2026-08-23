import { FaFigma, FaGithub } from "react-icons/fa6";
import { PiArchive } from "react-icons/pi";

const PROJECT_LINK_ICONS: Record<string, React.ReactNode> = {
  "Design Files": <FaFigma aria-hidden />,
  "Source Code": <FaGithub aria-hidden />,
  Archive: <PiArchive aria-hidden />,
};

export const getProjectLinkIcon = (label: string): React.ReactNode =>
  PROJECT_LINK_ICONS[label];
