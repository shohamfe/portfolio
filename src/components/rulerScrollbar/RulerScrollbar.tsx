"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import {
  rulerHoverTickVariants,
  rulerRoot,
  rulerTickVariants,
} from "./components/rulerScrollbar.variants";
import {
  DEFAULT_ACTIVE_RADIUS,
  DEFAULT_HOVER_RADIUS,
  KEYBOARD_SEEK_STEP,
} from "./constants/rulerScrollbar.constants";
import {
  getActiveTickIndex,
  getPercentFromPointer,
  getTickDistanceBucket,
} from "./helpers/rulerScrollbar.helpers";
import { useTickCount } from "./hooks/rulerScrollbar.hooks";
import type { RulerScrollbarProps } from "./types/rulerScrollbar.types";

const RulerScrollbar: React.FC<RulerScrollbarProps> = ({
  progress,
  onSeek,
  controlsId,
  activeRadius = DEFAULT_ACTIVE_RADIUS,
  hoverRadius = DEFAULT_HOVER_RADIUS,
  className,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const tickCount = useTickCount(rootRef);
  const activeIndex = getActiveTickIndex(progress, tickCount);

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const seekFromPointer = (clientY: number) => {
    const bounds = rootRef.current?.getBoundingClientRect();
    if (!bounds) return;

    onSeek?.(getPercentFromPointer(clientY, bounds));
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = rootRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const percent = getPercentFromPointer(event.clientY, bounds);
    setHoverIndex(getActiveTickIndex(percent, tickCount));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onSeek) return;

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      onSeek(progress - KEYBOARD_SEEK_STEP);
    } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      onSeek(progress + KEYBOARD_SEEK_STEP);
    } else if (event.key === "Home") {
      event.preventDefault();
      onSeek(0);
    } else if (event.key === "End") {
      event.preventDefault();
      onSeek(1);
    }
  };

  return (
    <div
      id="ruler-scrollbar"
      ref={rootRef}
      role="scrollbar"
      aria-label="Scroll position"
      aria-controls={controlsId}
      aria-orientation="vertical"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(Math.min(1, Math.max(0, progress)) * 100)}
      tabIndex={onSeek ? 0 : -1}
      className={cn(rulerRoot, className)}
      onPointerMove={onSeek ? handlePointerMove : undefined}
      onPointerLeave={onSeek ? () => setHoverIndex(null) : undefined}
      onPointerDown={
        onSeek ? (event) => seekFromPointer(event.clientY) : undefined
      }
      onKeyDown={onSeek ? handleKeyDown : undefined}
    >
      {Array.from({ length: tickCount }, (_, index) => {
        const activeDistance = Math.abs(index - activeIndex);
        const activeBucket = getTickDistanceBucket(
          activeDistance,
          activeRadius,
        );

        if (activeBucket !== "far") {
          return (
            <div
              key={index}
              id={`ruler-tick-${index}`}
              className={rulerTickVariants({ distance: activeBucket })}
            />
          );
        }

        const hoverDistance =
          hoverIndex === null ? Infinity : Math.abs(index - hoverIndex);
        const hoverBucket = getTickDistanceBucket(hoverDistance, hoverRadius);

        return (
          <div
            key={index}
            id={`ruler-tick-${index}`}
            className={rulerHoverTickVariants({ distance: hoverBucket })}
          />
        );
      })}
    </div>
  );
};

export default RulerScrollbar;
