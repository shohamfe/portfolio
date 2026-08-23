import ProjectCard from "@/components/projectCard/ProjectCard";
import {
  CASE_STUDY_INTRO,
  CASE_STUDY_PROJECTS,
  CASE_STUDY_THREADS,
  COMMON_THREAD_INTRO,
} from "@/content/caseStudy";
import CaseStudySectionIntro from "./CaseStudySectionIntro";
import ThreadNote from "./ThreadNote";
import {
  contentRoot,
  introGroupSpaced,
  projectGrid,
  threadRow,
} from "./caseStudyStage.variants";

const CaseStudyContent: React.FC = () => {
  return (
    <div id="case-study-content" className={contentRoot}>
      <CaseStudySectionIntro
        title={CASE_STUDY_INTRO.title}
        lines={CASE_STUDY_INTRO.lines}
      />

      <div className={projectGrid}>
        {CASE_STUDY_PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            priority={index === 0}
          />
        ))}
      </div>

      <CaseStudySectionIntro
        title={COMMON_THREAD_INTRO.title}
        lines={[COMMON_THREAD_INTRO.body]}
        className={introGroupSpaced}
      />

      <div className={threadRow}>
        {CASE_STUDY_THREADS.map((thread) => (
          <ThreadNote key={thread.id} thread={thread} />
        ))}
      </div>
    </div>
  );
};

export default CaseStudyContent;
