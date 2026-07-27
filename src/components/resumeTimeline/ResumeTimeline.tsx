import { RESUME_SECTIONS } from "@/content/resume";
import { cn } from "@/lib/cn";
import ResumeSection from "./components/ResumeSection";
import { timelineRoot } from "./components/resumeTimeline.variants";
import type { ResumeTimelineProps } from "./types/resumeTimeline.types";

/** The Resume page's main body: a vertical timeline pairing a narrow year
 *  gutter with the experience content, each row's own left border lining up
 *  into one continuous divider down the page. */
const ResumeTimeline: React.FC<ResumeTimelineProps> = ({ className }) => {
  return (
    <div id="resume-timeline" className={cn(timelineRoot, className)}>
      {RESUME_SECTIONS.map((section) => (
        <ResumeSection key={section.id} section={section} />
      ))}
    </div>
  );
};

export default ResumeTimeline;
