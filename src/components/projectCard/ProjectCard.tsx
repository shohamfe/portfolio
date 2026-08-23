import Image from "next/image";
import Chip from "@/components/chip/Chip";
import Magnetic from "@/components/magnetic/Magnetic";
import { cn } from "@/lib/cn";
import {
  projectCardBlurb,
  projectCardBody,
  projectCardGradientOverlay,
  projectCardHeaderGroup,
  projectCardImage,
  projectCardImageSlot,
  projectCardMeta,
  projectCardRole,
  projectCardRoleGroup,
  projectCardTech,
  projectCardTitle,
  projectCardTitleRow,
  projectCardVariants,
} from "./components/projectCard.variants";
import { PROJECT_CARD_IMAGE_SIZES } from "./constants/projectCard.constants";
import { getProjectLinkIcon } from "./helpers/projectCard.helpers";
import type { ProjectCardProps } from "./types/projectCard.types";

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  priority = false,
  className,
}) => {
  const { title, meta, blurb, role, tech, image, accent, link } = project;

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
    <div className={cn(projectCardVariants({ color: accent }), className)}>
      <div className={projectCardImageSlot}>
        <Image
          src={image}
          alt={`${title} preview`}
          fill
          sizes={PROJECT_CARD_IMAGE_SIZES}
          priority={priority}
          className={projectCardImage}
        />

        <div className={projectCardGradientOverlay({ color: accent })} />
      </div>

      <div className={projectCardBody}>
        <div className={projectCardHeaderGroup}>
          <div className={projectCardTitleRow}>
            <Magnetic actionArea="global" range={240} intensity={0.25}>
              <p className={projectCardTitle}>{title}</p>
            </Magnetic>

            <Magnetic actionArea="global" range={200} intensity={0.35}>
              {link.href === "#" ? (
                <span aria-label={`${link.label} (coming soon)`}>
                  {linkChip}
                </span>
              ) : (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${link.label} for ${title}`}
                >
                  {linkChip}
                </a>
              )}
            </Magnetic>
          </div>

          <Magnetic actionArea="global" range={200} intensity={0.15}>
            <p className={projectCardMeta}>{meta}</p>
          </Magnetic>
        </div>

        <Magnetic actionArea="global" range={200} intensity={0.2}>
          <p className={projectCardBlurb}>{blurb}</p>
        </Magnetic>

        <div className={projectCardRoleGroup}>
          <Magnetic actionArea="global" range={200} intensity={0.15}>
            <p className={projectCardRole}>{role}</p>
          </Magnetic>

          <Magnetic actionArea="global" range={200} intensity={0.25}>
            <p className={projectCardTech}>
              {tech.map((technology) => `[${technology}]`).join(" ")}
            </p>
          </Magnetic>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
