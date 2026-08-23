import ScrollStage from "@/components/scrollStage/ScrollStage";
import ProjectContent from "./components/ProjectContent";
import type { ProjectStageProps } from "./types/projectStage.types";

const ProjectStage: React.FC<ProjectStageProps> = ({
  project,
  detail,
  nextProject,
}) => {
  return (
    <ScrollStage id="project">
      <ProjectContent
        project={project}
        detail={detail}
        nextProject={nextProject}
      />
    </ScrollStage>
  );
};

export default ProjectStage;
