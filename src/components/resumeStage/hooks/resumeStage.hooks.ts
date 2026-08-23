"use client";

import { useEffect, useState, type RefObject } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "motion/react";
import { FOCUS_BAND } from "../constants/resumeStage.constants";

/** "page" lets a wheel anywhere on the document drive the wrapper, so the
 *  margins beside the scroller scroll it too. */
type ScrollEventsTarget = "wrapper" | "page";

export const useSmoothScrollProgress = (
  wrapperRef: RefObject<HTMLElement | null>,
  contentRef: RefObject<HTMLElement | null>,
  eventsTarget: ScrollEventsTarget = "wrapper",
): { progress: number; hasOverflow: boolean } => {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper) return;

    const handleScroll = () => {
      const scrollable = wrapper.scrollHeight - wrapper.clientHeight;
      setHasOverflow(scrollable > 0);
      setProgress(scrollable > 0 ? wrapper.scrollTop / scrollable : 0);
    };

    handleScroll();
    wrapper.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new ResizeObserver(handleScroll);
    observer.observe(wrapper);

    if (content) observer.observe(content);

    return () => {
      wrapper.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [wrapperRef, contentRef]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content || prefersReducedMotion) return;

    const lenis = new Lenis({
      wrapper,
      content,
      autoRaf: true,
      eventsTarget:
        eventsTarget === "page" ? document.documentElement : wrapper,
    });

    return () => lenis.destroy();
  }, [wrapperRef, contentRef, eventsTarget, prefersReducedMotion]);

  return { progress, hasOverflow };
};

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
