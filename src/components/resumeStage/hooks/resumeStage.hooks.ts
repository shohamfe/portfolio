"use client";

import { useEffect, type RefObject } from "react";
import { FOCUS_BAND } from "../constants/resumeStage.constants";

/** Marks resume entries as focused while they pass through the band. Applied
 *  here rather than in the markup so ResumeTimeline can stay a server component. */
export const useScrollFocus = (
  wrapperRef: RefObject<HTMLElement | null>,
): void => {
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const entries = wrapper.querySelectorAll<HTMLElement>(
      '[id^="resume-entry-"]',
    );
    entries.forEach((entry) => entry.setAttribute("data-scroll-dim", ""));

    const observer = new IntersectionObserver(
      (records) => {
        records.forEach((record) => {
          record.target.setAttribute(
            "data-in-view",
            String(record.isIntersecting),
          );
        });
      },
      { root: wrapper, rootMargin: FOCUS_BAND, threshold: 0 },
    );

    entries.forEach((entry) => observer.observe(entry));

    return () => observer.disconnect();
  }, [wrapperRef]);
};
