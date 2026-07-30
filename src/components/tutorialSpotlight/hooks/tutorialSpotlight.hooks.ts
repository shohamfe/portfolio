"use client";

import { useEffect, useState, type RefObject } from "react";
import type { TutorialSpotlightStage } from "../types/tutorialSpotlight.types";

interface TargetRects {
  containerRect: DOMRect | null;
  targetRect: DOMRect | null;
}

const rectsEqual = (a: DOMRect, b: DOMRect): boolean =>
  a.top === b.top && a.left === b.left && a.width === b.width && a.height === b.height;

/** Re-measures every frame via requestAnimationFrame while `enabled`, so the
 *  spotlight tracks the target live while it is being dragged instead of
 *  lagging behind at its pre-drag position. Bails out of re-rendering when
 *  neither rect actually changed, so this is cheap while idle. */
export const useTargetRect = (
  containerRef: RefObject<HTMLElement | null>,
  targetRef: RefObject<HTMLElement | null>,
  enabled: boolean
): TargetRects => {
  const [rects, setRects] = useState<TargetRects>({
    containerRect: null,
    targetRect: null,
  });

  useEffect(() => {
    if (!enabled) return;

    let frame: number;

    const measure = () => {
      const container = containerRef.current;
      const target = targetRef.current;

      if (container && target) {
        const containerRect = container.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        setRects((previous) =>
          previous.containerRect &&
          previous.targetRect &&
          rectsEqual(previous.containerRect, containerRect) &&
          rectsEqual(previous.targetRect, targetRect)
            ? previous
            : { containerRect, targetRect }
        );
      }

      frame = requestAnimationFrame(measure);
    };

    frame = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(frame);
  }, [containerRef, targetRef, enabled]);

  return rects;
};

/** Mirrors usePersistedOffsets (src/components/homeCanvas/hooks/homeCanvas.hooks.ts):
 *  hydrate the "already seen" flag from localStorage in an effect, fail open
 *  (tutorial shows) on corrupt data, and persist only once dismissed for good. */
export const useTutorialSpotlightStage = (
  storageKey: string,
  hasStage2: boolean,
  stage1Complete: boolean,
  stage2Complete: boolean
): TutorialSpotlightStage => {
  const [stage, setStage] = useState<TutorialSpotlightStage>("checking");

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    let alreadySeen = false;

    if (raw) {
      try {
        alreadySeen = JSON.parse(raw) === true;
      } catch {
        // Ignore corrupt storage.
        window.localStorage.removeItem(storageKey);
      }
    }

    setStage(alreadySeen ? "hidden" : "stage1");
  }, [storageKey]);

  useEffect(() => {
    if (stage === "stage1" && stage1Complete) {
      setStage(hasStage2 ? "stage2" : "dismissed");
    }
  }, [stage, stage1Complete, hasStage2]);

  useEffect(() => {
    if (stage === "stage2" && stage2Complete) {
      setStage("dismissed");
    }
  }, [stage, stage2Complete]);

  useEffect(() => {
    if (stage !== "dismissed") return;

    window.localStorage.setItem(storageKey, JSON.stringify(true));
  }, [stage, storageKey]);

  return stage;
};
