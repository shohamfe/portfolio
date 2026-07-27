"use client";

import { useEffect, useState, type RefObject } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "motion/react";

/** Only entries whose top edge falls inside this band count as focused. The
 *  band sits in the upper third of the scroller, so the entry you are reading
 *  lights up before it reaches the middle of the screen. */
const FOCUS_BAND = "-8% 0px -60% 0px";

/** Smooth-scrolls the given wrapper and reports how far through it we are.
 *
 *  Progress comes from a native scroll listener rather than from Lenis, since
 *  Lenis drives the wrapper's real scrollTop and therefore fires native scroll
 *  events anyway. Keeping the two separate means progress still works if
 *  smoothing is switched off, which is exactly what happens under reduced
 *  motion - Lenis hijacks the scroll wheel, so it is disabled there entirely
 *  rather than merely shortened. */
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

/** Marks resume entries as focused or not while they pass through the band.
 *
 *  The attributes are applied here rather than in the markup so ResumeTimeline
 *  can stay a server component with no knowledge of scrolling, and so the page
 *  renders fully legible before this effect ever runs - the dimming is an
 *  enhancement, never a prerequisite for reading. */
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
