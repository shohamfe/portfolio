"use client";

import { useRef } from "react";
import ResumeTimeline from "@/components/resumeTimeline/ResumeTimeline";
import RulerScrollbar from "@/components/rulerScrollbar/RulerScrollbar";
import { RULER_TICK_COUNT } from "@/constants/resume";
import { cn } from "@/lib/cn";
import ResumeCardField from "./components/ResumeCardField";
import {
  stageContent,
  stageHeaderMask,
  stageRoot,
  stageRuler,
  stageScroller,
  stageTimeline,
} from "./components/resumeStage.variants";
import { useScrollFocus, useSmoothScrollProgress } from "./hooks/resumeStage.hooks";
import type { ResumeStageProps } from "./types/resumeStage.types";

/** Owns everything about the Resume page that depends on scrolling: the
 *  smooth-scroll container, the ruler that reports position, and the focus
 *  dimming that lifts whichever entry you are reading out of the greyed rest.
 *
 *  The timeline itself stays a server component - this only wraps it, so the
 *  resume text is rendered and readable regardless of whether any of this
 *  client-side behaviour runs. */
const ResumeStage: React.FC<ResumeStageProps> = ({ className }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const progress = useSmoothScrollProgress(wrapperRef, contentRef);
  useScrollFocus(wrapperRef);

  return (
    <div id="resume-stage" className={cn(stageRoot, className)}>
      <RulerScrollbar
        progress={progress}
        tickCount={RULER_TICK_COUNT}
        className={stageRuler}
      />

      <div id="resume-scroller" ref={wrapperRef} className={stageScroller}>
        <div id="resume-content" ref={contentRef} className={stageContent}>
          <ResumeTimeline className={stageTimeline} />

          <ResumeCardField />
        </div>
      </div>

      <div id="resume-header-mask" aria-hidden className={stageHeaderMask} />
    </div>
  );
};

export default ResumeStage;
