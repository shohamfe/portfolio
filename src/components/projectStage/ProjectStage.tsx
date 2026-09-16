import ScrollStage from "@/components/scrollStage/ScrollStage";
import ProjectContent from "./components/ProjectContent";
import { stageScrollerOverrides } from "./components/projectStage.variants";
import type { ProjectStageProps } from "./types/projectStage.types";

const ProjectStage: React.FC<ProjectStageProps> = ({
  project,
  detail,
  previousProject,
  nextProject,
}) => {
  return (
    <ScrollStage
      id="project"
      scrollerClassName={stageScrollerOverrides}
      pageHasOwnHeading
    >
      <ProjectContent
        project={project}
        detail={detail}
        previousProject={previousProject}
        nextProject={nextProject}
      />
    </ScrollStage>
  );
};

export default ProjectStage;
