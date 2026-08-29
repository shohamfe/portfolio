"use client";

import RulerScrollbar from "@/components/rulerScrollbar/RulerScrollbar";
import { useSmoothScrollProgress } from "@/hooks/smoothScroll.hooks";
import { cn } from "@/lib/cn";
import { useRef } from "react";
import StageHeader from "./components/StageHeader";
import {
  stageBody,
  stageRoot,
  stageRuler,
  stageScroller,
} from "./components/scrollStage.variants";
import type { ScrollStageProps } from "./types/scrollStage.types";

/** Site header, ruler and Lenis-driven scroller — the shell every long-form
 *  desktop page sits in. Pages supply only their own surface and content. */
const ScrollStage: React.FC<ScrollStageProps> = ({
  id,
  className,
  scrollerClassName,
  children,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { progress, scrollToPercent } = useSmoothScrollProgress(
    wrapperRef,
    contentRef,
    "page",
  );

  return (
    <div id={`${id}-stage`} className={cn(stageRoot, className)}>
      <StageHeader />

      <div id={`${id}-body`} className={stageBody}>
        <RulerScrollbar
          progress={progress}
          onSeek={scrollToPercent}
          controlsId={`${id}-scroller`}
          className={stageRuler}
        />

        <div
          id={`${id}-scroller`}
          ref={wrapperRef}
          className={cn(stageScroller, scrollerClassName)}
        >
          <div ref={contentRef}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ScrollStage;
