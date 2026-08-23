import ProjectCallout from "./ProjectCallout";
import ProjectSection from "./ProjectSection";
import {
  calloutNote,
  proseLead,
  proseMuted,
  proseStrong,
  sectionProse,
} from "./projectStage.variants";
import type { ProjectProseProps } from "../types/projectStage.types";

/** The first paragraph carries the section; every one after it drops to muted. */
const ProjectProse: React.FC<ProjectProseProps> = ({ index, section }) => {
  const [opening, ...rest] = section.paragraphs;
  const openingClass = section.emphasis === "lead" ? proseLead : proseStrong;

  return (
    <ProjectSection index={index} title={section.title}>
      <div className={sectionProse}>
        {opening && <p className={openingClass}>{opening}</p>}

        {rest.map((paragraph) => (
          <p key={paragraph} className={proseMuted}>
            {paragraph}
          </p>
        ))}

        {section.todo && <ProjectCallout text={section.todo} />}

        {section.note && <p className={calloutNote}>{section.note}</p>}
      </div>
    </ProjectSection>
  );
};

export default ProjectProse;
