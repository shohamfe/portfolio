import BottomSheet from "@/components/bottomSheet/BottomSheet";
import { sectionUnderline } from "@/components/bottomSheet/components/bottomSheet.variants";
import HomeCanvas from "@/components/homeCanvas/HomeCanvas";
import MobileNav from "@/components/mobileNav/MobileNav";
import { HOME_SHEET_PEEK, MOBILE_CANVAS_ORIGIN } from "@/constants/mobile";
import { getRoleTitle, getSiteDescription, SITE } from "@/constants/site";
import { HOME_CONTENT } from "@/content/home";
import type { MobileHomeProps } from "./types/mobileHome.types";
import {
  bioHeader,
  bioHeading,
  bioList,
  bioParagraph,
  bioSection,
  bioSections,
  heroDivider,
  heroName,
  heroRole,
  heroRoot,
  heroTagline,
  mobileRoot,
  mobileScroll,
} from "./components/mobileHome.variants";

const { passion, howIWork, about } = HOME_CONTENT;

/** Home below the lg breakpoint: the intro copy as one scrolling column,
 *  with the tech-stack folders moved into a pull-up sheet.
 *
 *  The canvas is the same component the desktop page uses, only re-anchored
 *  (panOrigin) so the tray opens on the folder cluster rather than on the
 *  empty margin around it. Contact details and the desktop nav are dropped
 *  here - the floating nav covers navigation, and the design gives the
 *  contact line no place on a phone. */
const MobileHome: React.FC<MobileHomeProps> = ({ roleLabel }) => {
  const sections = [
    { id: "passion", title: passion.title, bullets: passion.bullets },
    { id: "how-i-work", title: howIWork.title, bullets: howIWork.bullets },
  ];

  return (
    <main id="home" className={mobileRoot}>
      <div
        id="mobile-home-scroll"
        className={mobileScroll}
        style={{ paddingBottom: HOME_SHEET_PEEK }}
      >
        <header className={heroRoot}>
          <h1 className={heroName}>{SITE.name}</h1>

          <p className={heroRole}>{getRoleTitle(roleLabel)}</p>

          <p className={heroTagline}>{SITE.tagline}</p>
        </header>

        <hr className={heroDivider} />

        <div className={bioSections}>
          {sections.map((section) => (
            <section
              key={section.id}
              id={`mobile-home-${section.id}`}
              aria-labelledby={`mobile-${section.id}-heading`}
              className={bioSection}
            >
              <div className={bioHeader}>
                <h2 id={`mobile-${section.id}-heading`} className={bioHeading}>
                  {section.title}
                </h2>

                <span aria-hidden className={sectionUnderline} />
              </div>

              <ul className={bioList}>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </section>
          ))}

          <section
            id="mobile-home-about"
            aria-labelledby="mobile-about-heading"
            className={bioSection}
          >
            <div className={bioHeader}>
              <h2 id="mobile-about-heading" className={bioHeading}>
                {about.title}
              </h2>

              <span aria-hidden className={sectionUnderline} />
            </div>

            <p className={bioParagraph}>{getSiteDescription(roleLabel)}</p>

            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className={bioParagraph}>
                {paragraph}
              </p>
            ))}
          </section>
        </div>
      </div>

      <BottomSheet peekHeight={HOME_SHEET_PEEK} title="Tech Stack">
        <HomeCanvas panOrigin={MOBILE_CANVAS_ORIGIN} showHint={false} paintDots={false} />
      </BottomSheet>

      <MobileNav />
    </main>
  );
};

export default MobileHome;
