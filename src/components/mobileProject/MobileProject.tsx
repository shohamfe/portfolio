"use client";

import MobileHero from "@/components/mobileHero/MobileHero";
import MobileNav from "@/components/mobileNav/MobileNav";
import { mobileRoot } from "@/components/mobileHome/components/mobileHome.variants";
import ProjectContent from "@/components/projectStage/components/ProjectContent";
import { NAV_FOOTPRINT } from "@/constants/mobile";
import { projectScroll } from "./components/mobileProject.variants";
import type { MobileProjectProps } from "./types/mobileProject.types";

const MobileProject: React.FC<MobileProjectProps> = ({
  roleLabel,
  project,
  detail,
  previousProject,
  nextProject,
}) => {
  return (
    <main id="project" className={mobileRoot}>
      <MobileHero roleLabel={roleLabel} />

      <div
        id="mobile-project-scroll"
        className={projectScroll}
        style={{ paddingBottom: NAV_FOOTPRINT }}
      >
        <ProjectContent
          project={project}
          detail={detail}
          previousProject={previousProject}
          nextProject={nextProject}
        />
      </div>

      <MobileNav />
    </main>
  );
};

export default MobileProject;
