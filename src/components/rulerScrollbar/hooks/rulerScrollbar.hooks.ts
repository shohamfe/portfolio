"use client";

import { useEffect, useState, type RefObject } from "react";
import { TICK_SPACING_PX } from "../constants/rulerScrollbar.constants";

/** Tick count from the ruler's own rendered height, so it always spans the
 *  space it's given instead of a per-caller guessed constant. */
export const useTickCount = (ref: RefObject<HTMLElement | null>): number => {
  const [tickCount, setTickCount] = useState(2);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const measure = () => {
      setTickCount(
        Math.max(2, Math.round(element.clientHeight / TICK_SPACING_PX)),
      );
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(element);

    return () => observer.disconnect();
  }, [ref]);

  return tickCount;
};
