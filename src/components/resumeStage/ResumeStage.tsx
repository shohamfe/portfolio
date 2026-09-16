"use client";

import ResumeTimeline from "@/components/resumeTimeline/ResumeTimeline";
import RulerScrollbar from "@/components/rulerScrollbar/RulerScrollbar";
import { cn } from "@/lib/cn";
import { useRef } from "react";
import ResumeHeader from "../resumeHeader/ResumeHeader";
import ResumeCardField from "./components/ResumeCardField";
import {
  stageLeftBody,
  stageLeftSection,
  stageRoot,
  stageRuler,
  stageScroller,
  stageTimeline,
} from "./components/resumeStage.variants";
import { useScrollFocus } from "./hooks/resumeStage.hooks";
import { useSmoothScrollProgress } from "@/hooks/smoothScroll.hooks";
import type { ResumeStageProps } from "./types/resumeStage.types";

const ResumeStage: React.FC<ResumeStageProps> = ({ className, roleLabel }) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { progress, scrollToPercent } = useSmoothScrollProgress(
    wrapperRef,
    contentRef,
  );
  useScrollFocus(wrapperRef);

  return (
    <div id="resume-stage" ref={stageRef} className={cn(stageRoot, className)}>
      <div id="resume-left-section" className={stageLeftSection}>
        <ResumeHeader roleLabel={roleLabel} />

        <div id="resume-left-body" className={stageLeftBody}>
          <RulerScrollbar
            progress={progress}
            onSeek={scrollToPercent}
            controlsId="resume-scroller"
            className={stageRuler}
          />

          <div id="resume-scroller" ref={wrapperRef} className={stageScroller}>
            <div id="resume-content" ref={contentRef}>
              <ResumeTimeline className={stageTimeline} />
            </div>
          </div>
        </div>
      </div>

      <ResumeCardField boundaryRef={stageRef} />
    </div>
  );
};

export default ResumeStage;
