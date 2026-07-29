import Typewriter from "@/components/typewriter/Typewriter";
import { sectionUnderline } from "@/components/bottomSheet/components/bottomSheet.variants";
import { RESUME_SECTIONS } from "@/content/resume";
import type { MobileTimelineEntryProps } from "../types/mobileResume.types";
import {
  entryBullets,
  entryContent,
  entryLink,
  entrySubtitle,
  entryTitle,
  entryYear,
  indicatorColumn,
  pinDot,
  pinDotCore,
  pinLine,
  sectionHeader,
  sectionHeading,
  timelineItem,
  timelineRoot,
} from "./mobileResume.variants";

/** One entry: pin dot and connecting line on the left, the entry's own copy
 *  on the right. The year moves inline above the title here rather than
 *  sitting in a gutter, which a 430px frame has no room for. */
const MobileTimelineEntry: React.FC<MobileTimelineEntryProps> = ({ entry, connected }) => {
  return (
    <div id={`mobile-entry-${entry.id}`} className={timelineItem}>
      <div className={indicatorColumn}>
        <span aria-hidden className={pinDot}>
          <span className={pinDotCore} />
        </span>

        {connected && <span aria-hidden className={pinLine} />}
      </div>

      <div className={entryContent}>
        {entry.year && <p className={entryYear}>{entry.year}</p>}

        <h3 className={entryTitle}>
          {entry.href ? (
            <a href={entry.href} target="_blank" rel="noreferrer" className={entryLink}>
              {entry.title}
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

/** The Resume page's body on mobile. Same content as the desktop timeline,
 *  restructured from a two-column gutter layout into a single rail - and
 *  without the scroll-focus dimming or the ruler, both of which are tied to
 *  the desktop stage's own scroll container. */
const MobileTimeline: React.FC = () => {
  return (
    <div id="mobile-timeline" className={timelineRoot}>
      {RESUME_SECTIONS.map((section) => (
        <section
          key={section.id}
          id={`mobile-section-${section.id}`}
          aria-labelledby={`mobile-section-${section.id}-heading`}
        >
          <div className={sectionHeader}>
            <h2 id={`mobile-section-${section.id}-heading`} className={sectionHeading}>
              {section.title}
            </h2>

            <span aria-hidden className={sectionUnderline} />
          </div>

          {section.entries.map((entry, index) => (
            <MobileTimelineEntry
              key={entry.id}
              entry={entry}
              connected={index < section.entries.length - 1}
            />
          ))}
        </section>
      ))}
    </div>
  );
};

export default MobileTimeline;
