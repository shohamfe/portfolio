"use client";

import CaseStudyHeader from "@/components/caseStudyStage/components/CaseStudyHeader";
import { useSmoothScrollProgress } from "@/components/resumeStage/hooks/resumeStage.hooks";
import RulerScrollbar from "@/components/rulerScrollbar/RulerScrollbar";
import { useRef } from "react";
import ProjectContent from "./components/ProjectContent";
import {
  stageBody,
  stageRoot,
  stageRuler,
  stageScroller,
} from "./components/projectStage.variants";
import type { ProjectStageProps } from "./types/projectStage.types";

const ProjectStage: React.FC<ProjectStageProps> = ({
  project,
  detail,
  nextProject,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { progress } = useSmoothScrollProgress(wrapperRef, contentRef, "page");

  return (
    <div id="project-stage" className={stageRoot}>
      <CaseStudyHeader />

      <div id="project-body" className={stageBody}>
        <RulerScrollbar progress={progress} className={stageRuler} />

        <div id="project-scroller" ref={wrapperRef} className={stageScroller}>
          <div ref={contentRef}>
            <ProjectContent
              project={project}
              detail={detail}
              nextProject={nextProject}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStage;
