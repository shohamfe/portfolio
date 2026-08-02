"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";
import {
  rulerRoot,
  rulerTickVariants,
} from "./components/rulerScrollbar.variants";
import {
  getActiveTickIndex,
  getTickDistanceBucket,
} from "./helpers/rulerScrollbar.helpers";
import { useTickCount } from "./hooks/rulerScrollbar.hooks";
import type { RulerScrollbarProps } from "./types/rulerScrollbar.types";

const RulerScrollbar: React.FC<RulerScrollbarProps> = ({
  progress,
  className,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const tickCount = useTickCount(rootRef);
  const activeIndex = getActiveTickIndex(progress, tickCount);

  return (
    <div
      id="ruler-scrollbar"
      ref={rootRef}
      aria-hidden
      className={cn(rulerRoot, className)}
    >
      {Array.from({ length: tickCount }, (_, index) => {
        const distance = Math.abs(index - activeIndex);
        const bucket = getTickDistanceBucket(distance);

        return (
          <div
            key={index}
            id={`ruler-tick-${index}`}
            className={rulerTickVariants({ distance: bucket })}
          />
        );
      })}
    </div>
  );
};

export default RulerScrollbar;
