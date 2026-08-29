"use client";

import CaseStudySectionIntro from "@/components/caseStudyStage/components/CaseStudySectionIntro";
import ThreadNote from "@/components/caseStudyStage/components/ThreadNote";
import {
  mobileRoot,
  mobileScroll,
} from "@/components/mobileHome/components/mobileHome.variants";
import MobileHero from "@/components/mobileHero/MobileHero";
import MobileNav from "@/components/mobileNav/MobileNav";
import ProjectCard from "@/components/projectCard/ProjectCard";
import { NAV_FOOTPRINT } from "@/constants/mobile";
import {
  CASE_STUDY_INTRO,
  CASE_STUDY_PROJECTS,
  CASE_STUDY_THREADS,
  COMMON_THREAD_INTRO,
} from "@/content/caseStudy";
import {
  projectList,
  sectionList,
  threadList,
} from "./components/mobileCaseStudy.variants";
import type { MobileCaseStudyProps } from "./types/mobileCaseStudy.types";

const MobileCaseStudy: React.FC<MobileCaseStudyProps> = ({ roleLabel }) => {
  return (
    <main id="case-study" className={mobileRoot}>
      <MobileHero roleLabel={roleLabel} />

      <div
        id="mobile-case-study-scroll"
        className={mobileScroll}
        style={{ paddingBottom: NAV_FOOTPRINT }}
      >
        <div id="mobile-case-study-list" className={sectionList}>
          <CaseStudySectionIntro
            title={CASE_STUDY_INTRO.title}
            lines={CASE_STUDY_INTRO.lines}
          />

          <div className={projectList}>
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
          />

          <div className={threadList}>
            {CASE_STUDY_THREADS.map((thread) => (
              <ThreadNote key={thread.id} thread={thread} />
            ))}
          </div>
        </div>
      </div>

      <MobileNav />
    </main>
  );
};

export default MobileCaseStudy;
