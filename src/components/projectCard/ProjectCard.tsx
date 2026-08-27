import Image from "next/image";
import Link from "next/link";
import Chip from "@/components/chip/Chip";
import MagicCard from "@/components/magicCard/MagicCard";
import Magnetic from "@/components/magnetic/Magnetic";
import TechStack from "@/components/techStack/TechStack";
import { cn } from "@/lib/cn";
import {
  projectCardBlurb,
  projectCardBody,
  projectCardHeaderGroup,
  projectCardImage,
  projectCardImageSlot,
  projectCardMeta,
  projectCardRole,
  projectCardRoleGroup,
  projectCardStretchedLink,
  projectCardTech,
  projectCardTitle,
  projectCardTitleRow,
  projectCardVariants,
} from "./components/projectCard.variants";
import {
  PROJECT_CARD_GLOW_COLORS,
  PROJECT_CARD_IMAGE_SIZES,
} from "./constants/projectCard.constants";
import {
  getProjectHref,
  getProjectLinkAriaLabel,
  getProjectLinkIcon,
} from "./helpers/projectCard.helpers";
import type { ProjectCardProps } from "./types/projectCard.types";

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  priority = false,
  className,
}) => {
  const { title, meta, blurb, role, tech, image, accent, link } = project;

  const caseStudyHref = getProjectHref(project.id);

  const linkChip = (
    <Chip
      color={accent}
      variant="bordered"
      startContent={getProjectLinkIcon(link.label)}
    >
      {link.label}
    </Chip>
  );

  return (
    <MagicCard
      glowColor={PROJECT_CARD_GLOW_COLORS[accent]}
      className={cn(projectCardVariants({ color: accent }), className)}
      gradientSize={620}
    >
      <div className={projectCardImageSlot}>
        <Image
          src={image}
          alt={`${title} preview`}
          fill
          sizes={PROJECT_CARD_IMAGE_SIZES}
          priority={priority}
          className={projectCardImage}
        />
      </div>

      <Magnetic actionArea="global" range={240} intensity={0.25}>
        <div className={projectCardBody}>
          <div className={projectCardHeaderGroup}>
            <div className={projectCardTitleRow}>
              <p className={projectCardTitle}>{title}</p>

              {link.href === "#" ? (
                <span aria-label={getProjectLinkAriaLabel(link)}>
                  {linkChip}
                </span>
              ) : (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${link.label} for ${title}`}
                  className="relative z-10"
                >
                  {linkChip}
                </a>
              )}
            </div>

            <p className={projectCardMeta}>{meta}</p>
          </div>

          <p className={projectCardBlurb}>{blurb}</p>

          <div className={projectCardRoleGroup}>
            <p className={projectCardRole}>{role}</p>

            <TechStack tech={tech} className={projectCardTech} />
          </div>
        </div>
      </Magnetic>

      {caseStudyHref && (
        <Link
          href={caseStudyHref}
          aria-label={`${title} case study`}
          className={projectCardStretchedLink}
        />
      )}
    </MagicCard>
  );
};

export default ProjectCard;
