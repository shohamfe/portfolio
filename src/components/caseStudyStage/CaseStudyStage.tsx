"use client";

import RulerScrollbar from "@/components/rulerScrollbar/RulerScrollbar";
import { useSmoothScrollProgress } from "@/components/resumeStage/hooks/resumeStage.hooks";
import { useRef } from "react";
import CaseStudyContent from "./components/CaseStudyContent";
import CaseStudyHeader from "./components/CaseStudyHeader";
import {
  stageBody,
  stageRoot,
  stageRuler,
  stageScroller,
} from "./components/caseStudyStage.variants";

const CaseStudyStage: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { progress } = useSmoothScrollProgress(wrapperRef, contentRef, "page");

  return (
    <div id="case-study-stage" className={stageRoot}>
      <CaseStudyHeader />

      <div id="case-study-body" className={stageBody}>
        <RulerScrollbar progress={progress} className={stageRuler} />

        <div
          id="case-study-scroller"
          ref={wrapperRef}
          className={stageScroller}
        >
          <div ref={contentRef}>
            <CaseStudyContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyStage;
