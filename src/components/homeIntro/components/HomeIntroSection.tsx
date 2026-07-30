import type { HomeIntroSectionProps } from "../types/homeIntro.types";
import {
  introHeading,
  introList,
  introSection,
} from "./homeIntro.variants";

const HomeIntroSection: React.FC<HomeIntroSectionProps> = ({
  id,
  headingId,
  title,
  bullets,
}) => {
  return (
    <section id={id} aria-labelledby={headingId} className={introSection}>
      <h2 id={headingId} className={introHeading}>
        {title}
      </h2>

      <ul className={introList}>
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </section>
  );
};

export default HomeIntroSection;
