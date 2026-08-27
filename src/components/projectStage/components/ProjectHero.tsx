import Link from "next/link";
import { PiArrowLeft } from "react-icons/pi";
import Chip from "@/components/chip/Chip";
import {
  getProjectLinkAriaLabel,
  getProjectLinkIcon,
} from "@/components/projectCard/helpers/projectCard.helpers";
import TechStack from "@/components/techStack/TechStack";
import { cn } from "@/lib/cn";
import {
  heroBack,
  heroEyebrow,
  heroFactCode,
  heroFactDivider,
  heroFactGroup,
  heroFactLabel,
  heroFactSpacer,
  heroFactValue,
  heroFacts,
  heroHead,
  heroHook,
  heroMeta,
  heroRoot,
  heroTitle,
  sectionBleed,
  sectionInner,
} from "./projectStage.variants";
import { CASE_STUDY_ROUTE } from "../constants/projectStage.constants";
import type { ProjectHeroProps } from "../types/projectStage.types";

const ProjectHero: React.FC<ProjectHeroProps> = ({ project, detail }) => {
  const linkChip = (
    <Chip
      color={project.accent}
      variant="bordered"
      startContent={getProjectLinkIcon(project.link.label)}
    >
      {project.link.label}
    </Chip>
  );

  return (
    <div className={cn(heroRoot, sectionBleed)}>
      <div className={sectionInner}>
        <Link href={CASE_STUDY_ROUTE} className={heroBack}>
          <PiArrowLeft aria-hidden />
          {detail.backLabel}
        </Link>

        <div className={heroHead}>
          <span className={heroEyebrow}>{detail.eyebrow}</span>

          <h1 className={heroTitle}>{project.title}</h1>

          <p className={heroMeta}>{project.meta}</p>

          <p className={heroHook}>{project.blurb}</p>
        </div>

        <div className={heroFacts}>
          <div className={heroFactGroup}>
            <span className={heroFactLabel}>Role</span>
            <span className={heroFactValue}>{project.role}</span>
          </div>

          <div className={heroFactDivider} />

          <div className={heroFactGroup}>
            <span className={heroFactLabel}>Stack</span>
            <TechStack tech={project.tech} className={heroFactCode} />
          </div>

          <div className={heroFactSpacer} />

          {project.link.href === "#" ? (
            <span aria-label={getProjectLinkAriaLabel(project.link)}>
              {linkChip}
            </span>
          ) : (
            <a
              href={project.link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.link.label} for ${project.title}`}
            >
              {linkChip}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectHero;
