import SiteNav from "@/components/siteNav/SiteNav";
import { getRoleTitle, getSiteDescription, SITE } from "@/constants/site";
import { HOME_CONTENT } from "@/content/home";
import { cn } from "@/lib/cn";
import type { HomeIntroProps } from "./types/homeIntro.types";
import {
  introDivider,
  introFixed,
  introHeader,
  introHeading,
  introList,
  introName,
  introParagraph,
  introRole,
  introRoot,
  introScroll,
  introSection,
  introSectionWide,
  introTagline,
} from "./components/homeIntro.variants";

const { passion, howIWork, about } = HOME_CONTENT;

const HomeIntro: React.FC<HomeIntroProps> = ({ className, roleLabel }) => {
  return (
    <div id="home-intro" className={cn(introRoot, className)}>
      <div id="home-intro-fixed" className={introFixed}>
        <header id="home-intro-header" className={introHeader}>
          <h1 id="home-intro-name" className={introName}>
            {SITE.name}
          </h1>

          <p id="home-intro-role" className={introRole}>
            {getRoleTitle(roleLabel)}
          </p>

          <p id="home-intro-tagline" className={introTagline}>
            {SITE.tagline}
          </p>

          <SiteNav className="mt-2" />
        </header>

        <hr className={introDivider} />
      </div>

      <div id="home-intro-scroll" className={introScroll}>
        <section
          id="home-passion"
          aria-labelledby="passion-heading"
          className={introSection}
        >
          <h2 id="passion-heading" className={introHeading}>
            {passion.title}
          </h2>

          <ul className={introList}>
            {passion.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </section>

        <section
          id="home-how-i-work"
          aria-labelledby="how-i-work-heading"
          className={introSection}
        >
          <h2 id="how-i-work-heading" className={introHeading}>
            {howIWork.title}
          </h2>

          <ul className={introList}>
            {howIWork.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </section>

        <section
          id="home-about"
          aria-labelledby="about-heading"
          className={introSectionWide}
        >
          <h2 id="about-heading" className={introHeading}>
            {about.title}
          </h2>

          <p className={introParagraph}>{getSiteDescription(roleLabel)}</p>

          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className={introParagraph}>
              {paragraph}
            </p>
          ))}
        </section>
      </div>
    </div>
  );
};

export default HomeIntro;
