import type { RefObject } from "react";

export type TutorialSpotlightStage =
  "checking" | "hidden" | "stage1" | "stage2" | "dismissed";

export interface TutorialSpotlightStageContent {
  label: string;
  ariaText: string;
}

export interface TutorialSpotlightProps {
  /** Element the dim is confined to. */
  containerRef: RefObject<HTMLElement | null>;
  /** Element that stays lit during stage 1. */
  stage1TargetRef: RefObject<HTMLElement | null>;
  storageKey: string;
  stage1: TutorialSpotlightStageContent;
  /** Omit for a single-stage walkthrough - stage1Complete then goes straight
   *  to dismissed. When present, stage 2 always lights the whole container
   *  (its target rect is the container's own rect), so no stage2TargetRef
   *  is needed. */
  stage2?: TutorialSpotlightStageContent;
  stage1Complete: boolean;
  stage2Complete?: boolean;
}

export interface SpotlightDimProps {
  containerRect: DOMRect;
  targetRect: DOMRect;
  isVisible: boolean;
  instant: boolean;
}

export interface SpotlightLabelProps {
  containerRect: DOMRect;
  targetRect: DOMRect;
  text: string;
  isVisible: boolean;
  instant: boolean;
  /** True for a container-sized target (stage 2): centers in the visible
   *  portion of the container instead of anchoring below/above the target,
   *  since "below the whole canvas" is usually off-screen. */
  centered: boolean;
}
