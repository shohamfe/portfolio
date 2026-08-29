"use client";

import ImageGalleryModal from "@/components/imageLightbox/ImageGalleryModal";
import { useImageGallery } from "@/components/imageLightbox/hooks/imageGallery.hooks";
import type { GalleryImage } from "@/components/imageLightbox/types/imageLightbox.types";
import { cn } from "@/lib/cn";
import { useMemo } from "react";
import ProjectDecisionCard from "./ProjectDecisionCard";
import ProjectEvidenceCard from "./ProjectEvidenceCard";
import ProjectHero from "./ProjectHero";
import ProjectPager from "./ProjectPager";
import ProjectProse from "./ProjectProse";
import ProjectSection from "./ProjectSection";
import ProjectWindow from "./ProjectWindow";
import {
  bodySurface,
  decisionList,
  evidenceColumn,
  evidenceGrid,
  evidenceIntro,
  sectionBleed,
  sectionInner,
  visualNote,
} from "./projectStage.variants";
import type { ProjectStageProps } from "../types/projectStage.types";

const ProjectContent: React.FC<ProjectStageProps> = ({
  project,
  detail,
  previousProject,
  nextProject,
}) => {
  const heroAlt = `${project.title} interface`;

  const galleryItems = useMemo<GalleryImage[]>(() => {
    const hero = detail.visual.image
      ? [{ src: detail.visual.image, alt: heroAlt }]
      : [];
    const evidence = detail.evidence.items
      .filter((item): item is typeof item & { image: string } => !!item.image)
      .map((item) => ({ src: item.image, alt: item.caption }));

    return [...hero, ...evidence];
  }, [detail, heroAlt]);

  const gallery = useImageGallery(galleryItems);

  const heroGalleryIndex = detail.visual.image
    ? galleryItems.findIndex((item) => item.src === detail.visual.image)
    : undefined;

  return (
    <div id="project-content" className="flex w-full flex-col">
      <ProjectHero
        project={project}
        detail={detail}
        previousProject={previousProject}
        nextProject={nextProject}
      />

      <div id="project-body-surface" className={bodySurface}>
        <div className={cn(sectionBleed, "pt-5")}>
          <div className={sectionInner}>
            <ProjectWindow
              caption={detail.visual.caption}
              badge={detail.visual.badge}
              image={detail.visual.image}
              imageAlt={heroAlt}
              placeholder={detail.visual.placeholder}
              placeholderNote="Same image as the card on Selected Work"
              gallery={gallery}
              galleryIndex={heroGalleryIndex}
            />

            <p className={visualNote}>{detail.visual.note}</p>
          </div>
        </div>

        <ProjectProse index={1} section={detail.stakes} />
        <ProjectProse index={2} section={detail.role} />
        <ProjectProse index={3} section={detail.problem} />

        <ProjectSection index={4} title={detail.decisions.title}>
          <div className={decisionList}>
            {detail.decisions.items.map((decision) => (
              <ProjectDecisionCard key={decision.id} decision={decision} />
            ))}
          </div>
        </ProjectSection>

        <ProjectSection index={5} title={detail.evidence.title}>
          <div className={evidenceColumn}>
            <p className={evidenceIntro}>{detail.evidence.intro}</p>

            <div className={evidenceGrid}>
              {detail.evidence.items.map((item) => (
                <ProjectEvidenceCard
                  key={item.id}
                  item={item}
                  gallery={gallery}
                  galleryIndex={
                    item.image
                      ? galleryItems.findIndex((g) => g.src === item.image)
                      : undefined
                  }
                />
              ))}
            </div>
          </div>
        </ProjectSection>

        <ProjectProse index={6} section={detail.outcome} />
        <ProjectProse index={7} section={detail.whatIdChange} />

        <ProjectPager
          variant="card"
          previousProject={previousProject}
          nextProject={nextProject}
        />
      </div>

      <ImageGalleryModal gallery={gallery} />
    </div>
  );
};

export default ProjectContent;
