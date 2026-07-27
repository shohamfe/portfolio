import { PiLink } from "react-icons/pi";
import Typewriter from "@/components/typewriter/Typewriter";
import type { ResumeEntryProps } from "../types/resumeTimeline.types";
import {
  entryBullets,
  entryLinkIcon,
  entrySubtitle,
  entryTitle,
  entryTitleLink,
  timelineContent,
  timelineGutter,
  timelineRow,
} from "./resumeTimeline.variants";

/** One row of the timeline: a year in the gutter (left empty when the entry
 *  shares its year with the row above) and the title/subtitle/bullets to the
 *  right of the divider. */
const ResumeEntry: React.FC<ResumeEntryProps> = ({ entry }) => {
  return (
    <div id={`resume-entry-${entry.id}`} className={timelineRow}>
      <div className={timelineGutter}>{entry.year}</div>

      <div className={timelineContent}>
        <h3 className={entryTitle}>
          {entry.href ? (
            <a href={entry.href} target="_blank" rel="noreferrer" className={entryTitleLink}>
              {entry.title}
              <PiLink aria-hidden className={entryLinkIcon} />
            </a>
          ) : (
            entry.title
          )}
        </h3>

        {entry.subtitleWords ? (
          <p className={entrySubtitle}>
            <Typewriter words={entry.subtitleWords} />
          </p>
        ) : (
          entry.subtitle && <p className={entrySubtitle}>{entry.subtitle}</p>
        )}

        {entry.bullets.length > 0 && (
          <ul className={entryBullets}>
            {entry.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ResumeEntry;
