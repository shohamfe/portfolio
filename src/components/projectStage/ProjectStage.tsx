import ScrollStage from "@/components/scrollStage/ScrollStage";
import ProjectContent from "./components/ProjectContent";
import {
  stageRootOverrides,
  stageScrollerOverrides,
} from "./components/projectStage.variants";
import type { ProjectStageProps } from "./types/projectStage.types";

const ProjectStage: React.FC<ProjectStageProps> = ({
  project,
  detail,
  nextProject,
}) => {
  return (
    <ScrollStage
      id="project"
      className={stageRootOverrides}
      scrollerClassName={stageScrollerOverrides}
    >
      <ProjectContent
        project={project}
        detail={detail}
        nextProject={nextProject}
      />
    </ScrollStage>
  );
};

export default ProjectStage;
