"use client";

import BottomSheet from "@/components/bottomSheet/BottomSheet";
import { sectionUnderline } from "@/components/bottomSheet/components/bottomSheet.variants";
import { useSheetDrag } from "@/components/bottomSheet/hooks/bottomSheet.hooks";
import HomeCanvas from "@/components/homeCanvas/HomeCanvas";
import MobileHero from "@/components/mobileHero/MobileHero";
import MobileNav from "@/components/mobileNav/MobileNav";
import { MOBILE_CANVAS_ORIGIN } from "@/constants/mobile";
import { SITE } from "@/constants/site";
import { HOME_CONTENT } from "@/content/home";
import { motion } from "motion/react";
import {
  bioHeader,
  bioHeading,
  bioList,
  bioParagraph,
  bioSection,
  bioSections,
  mobileRoot,
  mobileScroll,
} from "./components/mobileHome.variants";

const { passion, howIWork, about } = HOME_CONTENT;

const MobileHome: React.FC = () => {
  const sheet = useSheetDrag();

  const sections = [
    { id: "passion", title: passion.title, bullets: passion.bullets },
    { id: "how-i-work", title: howIWork.title, bullets: howIWork.bullets },
  ];

  return (
    <main id="home" className={mobileRoot}>
      <MobileHero />

      <motion.div
        id="mobile-home-scroll"
        className={mobileScroll}
        style={{ paddingBottom: sheet.coverage }}
      >
        <div id="bio-secions-container" className={bioSections}>
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

            <p className={bioParagraph}>{SITE.description}</p>

            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className={bioParagraph}>
                {paragraph}
              </p>
            ))}
          </section>
        </div>
      </motion.div>

      <BottomSheet sheet={sheet} title="Tech Stack">
        <HomeCanvas
          panOrigin={MOBILE_CANVAS_ORIGIN}
          paintDots={false}
          tutorialEnabled={sheet.isExpanded}
        />
      </BottomSheet>

      <MobileNav />
    </main>
  );
};

export default MobileHome;
