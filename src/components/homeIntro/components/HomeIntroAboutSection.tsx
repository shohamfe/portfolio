import { SITE } from "@/constants/site";
import type { HomeIntroAboutSectionProps } from "../types/homeIntro.types";
import {
  introHeading,
  introParagraph,
  introSectionWide,
} from "./homeIntro.variants";

const HomeIntroAboutSection: React.FC<HomeIntroAboutSectionProps> = ({
  about,
}) => {
  return (
    <section
      id="home-about"
      aria-labelledby="about-heading"
      className={introSectionWide}
    >
      <h2 id="about-heading" className={introHeading}>
        {about.title}
      </h2>

      <p className={introParagraph}>{SITE.description}</p>

      {about.paragraphs.map((paragraph) => (
        <p key={paragraph} className={introParagraph}>
          {paragraph}
        </p>
      ))}
    </section>
  );
};

export default HomeIntroAboutSection;
