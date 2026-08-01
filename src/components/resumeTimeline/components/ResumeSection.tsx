import type { ResumeSectionProps } from "../types/resumeTimeline.types";
import ResumeEntry from "./ResumeEntry";
import {
  sectionHeading,
  sectionRule,
  timelineContent,
  timelineGutter,
  timelineRow,
} from "./resumeTimeline.variants";

/** A titled block of entries. The heading sits in its own gutter/content row
 *  so the divider runs behind it too, then a rule marks the section's end. */
const ResumeSection: React.FC<ResumeSectionProps> = ({ section }) => {
  const headingId = `resume-section-${section.id}-heading`;

  return (
    <section id={`resume-section-${section.id}`} aria-labelledby={headingId}>
      <div className={timelineRow}>
        <div className={timelineGutter} />
        <div className={timelineContent}>
          <h2 id={headingId} className={sectionHeading}>
            {section.title}
          </h2>
        </div>
      </div>

      {section.entries.map((entry) => (
        <ResumeEntry key={entry.id} entry={entry} />
      ))}

      <hr className={sectionRule} />
    </section>
  );
};

export default ResumeSection;
