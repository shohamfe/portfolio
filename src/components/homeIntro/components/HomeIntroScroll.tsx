"use client";

import { useRef } from "react";
import RulerScrollbar from "@/components/rulerScrollbar/RulerScrollbar";
import { useSmoothScrollProgress } from "@/components/resumeStage/hooks/resumeStage.hooks";
import { RULER_TICK_COUNT } from "@/constants/resume";
import { HOME_CONTENT } from "@/content/home";
import type { HomeIntroScrollProps } from "../types/homeIntro.types";
import HomeIntroAboutSection from "./HomeIntroAboutSection";
import HomeIntroSection from "./HomeIntroSection";
import { introContent, introRuler, introScroll, introScroller } from "./homeIntro.variants";

const { passion, howIWork, about } = HOME_CONTENT;

const HomeIntroScroll: React.FC<HomeIntroScrollProps> = ({ roleLabel }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progress = useSmoothScrollProgress(wrapperRef, contentRef);

  return (
    <div id="home-intro-scroll" className={introScroll}>
      <RulerScrollbar
        progress={progress}
        className={introRuler}
        tickCount={RULER_TICK_COUNT - 16}
      />

      <div id="home-intro-scroller" ref={wrapperRef} className={introScroller}>
        <div id="home-intro-content" ref={contentRef} className={introContent}>
          <HomeIntroSection
            id="home-passion"
            headingId="passion-heading"
            title={passion.title}
            bullets={passion.bullets}
          />

          <HomeIntroSection
            id="home-how-i-work"
            headingId="how-i-work-heading"
            title={howIWork.title}
            bullets={howIWork.bullets}
          />

          <HomeIntroAboutSection roleLabel={roleLabel} about={about} />
        </div>
      </div>
    </div>
  );
};

export default HomeIntroScroll;



