"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "motion/react";
import SpotlightDim from "./components/SpotlightDim";
import SpotlightLabel from "./components/SpotlightLabel";
import { SPOTLIGHT_FADE_MS } from "./constants/tutorialSpotlight.constants";
import {
  useTargetRect,
  useTutorialSpotlightStage,
} from "./hooks/tutorialSpotlight.hooks";
import type {
  TutorialSpotlightProps,
  TutorialSpotlightStage,
} from "./types/tutorialSpotlight.types";

/** First-visit spotlight walkthrough. A dumb state machine driven by the
 *  caller's stage1Complete/stage2Complete booleans - it never listens for
 *  drags or key presses itself, and there is no backdrop click handler or
 *  auto-advance timer anywhere in it. */
const TutorialSpotlight: React.FC<TutorialSpotlightProps> = ({
  containerRef,
  stage1TargetRef,
  storageKey,
  stage1,
  stage2,
  stage1Complete,
  stage2Complete = false,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const hasStage2 = stage2 !== undefined;

  const stage = useTutorialSpotlightStage(
    storageKey,
    hasStage2,
    stage1Complete,
    stage2Complete
  );

  const isActiveStage = stage === "stage1" || stage === "stage2";

  // Kept at the last real stage so target/content/rects don't jump to a
  // fallback while fading out after dismissal.
  const [lastActiveStage, setLastActiveStage] = useState<TutorialSpotlightStage>("stage1");
  useEffect(() => {
    if (isActiveStage) setLastActiveStage(stage);
  }, [isActiveStage, stage]);

  // Stage 2 always lights the whole container, so its target is the container itself.
  const activeTargetRef = lastActiveStage === "stage2" ? containerRef : stage1TargetRef;

  // Mounted for as long as it's active, plus one fade-out after - not tied
  // directly to isActiveStage, so the exit transition has time to play
  // instead of the DOM disappearing the instant the tutorial is dismissed.
  const [shouldRender, setShouldRender] = useState(false);
  const [isEntered, setIsEntered] = useState(false);

  useEffect(() => {
    if (isActiveStage) {
      setShouldRender(true);
      setIsEntered(false);
      const frame = requestAnimationFrame(() => setIsEntered(true));
      return () => cancelAnimationFrame(frame);
    }

    setIsEntered(false);
    if (prefersReducedMotion) {
      setShouldRender(false);
      return;
    }
    const timeout = setTimeout(() => setShouldRender(false), SPOTLIGHT_FADE_MS);
    return () => clearTimeout(timeout);
  }, [isActiveStage, stage, prefersReducedMotion]);

  const { containerRect, targetRect } = useTargetRect(
    containerRef,
    activeTargetRef,
    shouldRender
  );

  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (stage === "stage1") setAnnouncement(stage1.ariaText);
    else if (stage === "stage2" && stage2) setAnnouncement(stage2.ariaText);
  }, [stage, stage1.ariaText, stage2]);

  if (!shouldRender || !containerRect || !targetRect) return null;

  const activeContent = lastActiveStage === "stage2" && stage2 ? stage2 : stage1;

  return createPortal(
    <>
      {lastActiveStage === "stage1" && (
        <SpotlightDim
          containerRect={containerRect}
          targetRect={targetRect}
          isVisible={isEntered}
          instant={!!prefersReducedMotion}
        />
      )}

      <SpotlightLabel
        containerRect={containerRect}
        targetRect={targetRect}
        text={activeContent.label}
        isVisible={isEntered}
        instant={!!prefersReducedMotion}
        centered={lastActiveStage === "stage2"}
      />

      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </>,
    document.body
  );
};

export default TutorialSpotlight;
