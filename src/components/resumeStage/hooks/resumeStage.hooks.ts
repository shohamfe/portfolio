"use client";

import { useEffect, useState, type RefObject } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "motion/react";
import { FOCUS_BAND } from "../constants/resumeStage.constants";

export const useSmoothScrollProgress = (
  wrapperRef: RefObject<HTMLElement | null>,
  contentRef: RefObject<HTMLElement | null>
): number => {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleScroll = () => {
      const scrollable = wrapper.scrollHeight - wrapper.clientHeight;
      setProgress(scrollable > 0 ? wrapper.scrollTop / scrollable : 0);
    };

    handleScroll();
    wrapper.addEventListener("scroll", handleScroll, { passive: true });

    return () => wrapper.removeEventListener("scroll", handleScroll);
  }, [wrapperRef]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content || prefersReducedMotion) return;

    const lenis = new Lenis({ wrapper, content, autoRaf: true });

    return () => lenis.destroy();
  }, [wrapperRef, contentRef, prefersReducedMotion]);

  return progress;
};

/** Marks resume entries as focused while they pass through the band. Applied
 *  here rather than in the markup so ResumeTimeline can stay a server component. */
export const useScrollFocus = (wrapperRef: RefObject<HTMLElement | null>): void => {
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const entries = wrapper.querySelectorAll<HTMLElement>('[id^="resume-entry-"]');
    entries.forEach((entry) => entry.setAttribute("data-scroll-dim", ""));

    const observer = new IntersectionObserver(
      (records) => {
        records.forEach((record) => {
          record.target.setAttribute("data-in-view", String(record.isIntersecting));
        });
      },
      { root: wrapper, rootMargin: FOCUS_BAND, threshold: 0 }
    );

    entries.forEach((entry) => observer.observe(entry));

    return () => observer.disconnect();
  }, [wrapperRef]);
};
