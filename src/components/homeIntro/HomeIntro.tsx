import SiteNav from "@/components/siteNav/SiteNav";
import { SITE } from "@/constants/site";
import { HOME_CONTENT } from "@/content/home";
import {
  introDivider,
  introHeader,
  introHeading,
  introList,
  introName,
  introParagraph,
  introRole,
  introRoot,
  introSection,
  introSectionWide,
  introTagline,
} from "./components/homeIntro.variants";

const { passion, howIWork, about } = HOME_CONTENT;

/** The left-hand column of the Home page: identity, navigation, and the three
 *  short prose sections. Each section is labelled by its heading so it is
 *  announced as a named landmark rather than an anonymous region. */
const HomeIntro: React.FC = () => {
  return (
    <div id="home-intro" className={introRoot}>
      <header id="home-intro-header" className={introHeader}>
        <h1 id="home-intro-name" className={introName}>
          {SITE.name}
        </h1>

        <p id="home-intro-role" className={introRole}>
          {SITE.role}
        </p>

        <p id="home-intro-tagline" className={introTagline}>
          {SITE.tagline}
        </p>

        <SiteNav className="mt-2" />
      </header>

      <hr className={introDivider} />

      <section id="home-passion" aria-labelledby="passion-heading" className={introSection}>
        <h2 id="passion-heading" className={introHeading}>
          {passion.title}
        </h2>

        <ul className={introList}>
          {passion.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </section>

      <section id="home-how-i-work" aria-labelledby="how-i-work-heading" className={introSection}>
        <h2 id="how-i-work-heading" className={introHeading}>
          {howIWork.title}
        </h2>

        <ul className={introList}>
          {howIWork.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </section>

      <section id="home-about" aria-labelledby="about-heading" className={introSectionWide}>
        <h2 id="about-heading" className={introHeading}>
          {about.title}
        </h2>

        {about.paragraphs.map((paragraph) => (
          <p key={paragraph} className={introParagraph}>
            {paragraph}
          </p>
        ))}
      </section>
    </div>
  );
};

export default HomeIntro;
