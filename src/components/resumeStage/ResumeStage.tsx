"use client";

import ResumeTimeline from "@/components/resumeTimeline/ResumeTimeline";
import RulerScrollbar from "@/components/rulerScrollbar/RulerScrollbar";
import { RULER_TICK_COUNT } from "@/constants/resume";
import { cn } from "@/lib/cn";
import { useRef } from "react";
import ResumeHeader from "../resumeHeader/ResumeHeader";
import ResumeCardField from "./components/ResumeCardField";
import {
  stageContent,
  stageRoot,
  stageRuler,
  stageScroller,
  stageTimeline,
} from "./components/resumeStage.variants";
import {
  useScrollFocus,
  useSmoothScrollProgress,
} from "./hooks/resumeStage.hooks";
import type { ResumeStageProps } from "./types/resumeStage.types";

const ResumeStage: React.FC<ResumeStageProps> = ({ className }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const progress = useSmoothScrollProgress(wrapperRef, contentRef);
  useScrollFocus(wrapperRef);

  return (
    <>
      <ResumeHeader />

      <div id="resume-stage" className={cn(stageRoot, className)}>
        <RulerScrollbar
          progress={progress}
          tickCount={RULER_TICK_COUNT}
          className={stageRuler}
        />

        <div id="resume-scroller" ref={wrapperRef} className={stageScroller}>
          <div id="resume-content" ref={contentRef} className={stageContent}>
            <ResumeTimeline className={stageTimeline} />

            <ResumeCardField boundaryRef={contentRef} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeStage;
