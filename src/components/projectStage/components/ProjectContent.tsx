import { cn } from "@/lib/cn";
import ProjectDecisionCard from "./ProjectDecisionCard";
import ProjectEvidenceCard from "./ProjectEvidenceCard";
import ProjectHero from "./ProjectHero";
import ProjectNext from "./ProjectNext";
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
  nextProject,
}) => {
  return (
    <div id="project-content" className="flex w-full flex-col">
      <ProjectHero project={project} detail={detail} />

      <div id="project-body-surface" className={bodySurface}>
        <div className={cn(sectionBleed, "pt-5")}>
          <div className={sectionInner}>
            <ProjectWindow
              caption={detail.visual.caption}
              badge={detail.visual.badge}
              image={detail.visual.image}
              imageAlt={`${project.title} interface`}
              placeholder={detail.visual.placeholder}
              placeholderNote="Same image as the card on Selected Work"
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
                <ProjectEvidenceCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </ProjectSection>

        <ProjectProse index={6} section={detail.outcome} />
        <ProjectProse index={7} section={detail.whatIdChange} />

        {nextProject && <ProjectNext project={nextProject} />}
      </div>
    </div>
  );
};

export default ProjectContent;
