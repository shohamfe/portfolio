"use client";

import { cn } from "@/lib/cn";
import {
  SPOTLIGHT_LABEL_EDGE_MARGIN_PX,
  SPOTLIGHT_LABEL_HEIGHT_ESTIMATE_PX,
  SPOTLIGHT_LABEL_OFFSET_PX,
} from "../constants/tutorialSpotlight.constants";
import { spotlightLabel } from "./tutorialSpotlight.variants";
import type { SpotlightLabelProps } from "../types/tutorialSpotlight.types";

/** Point-target mode (stage 1): centered under the target, flipped above it
 *  when it would otherwise render past the bottom of the screen, then
 *  clamped to the viewport either way. Container-target mode (stage 2):
 *  centered in the visible portion of the container instead - "below the
 *  whole canvas" is usually off-screen, so the below/above logic doesn't
 *  apply to a target that size. Live-tracks targetRect (it does not lag
 *  behind a target being dragged). Viewport coordinates, not
 *  container-relative: this renders through a portal to escape the
 *  container's own stacking context. */
const SpotlightLabel: React.FC<SpotlightLabelProps> = ({
  containerRect,
  targetRect,
  text,
  isVisible,
  instant,
  centered,
}) => {
  let top: number;
  let left: number;
  let transform: string;

  if (centered) {
    const visibleTop = Math.max(containerRect.top, 0);
    const visibleBottom = Math.min(containerRect.bottom, window.innerHeight);
    const visibleLeft = Math.max(containerRect.left, 0);
    const visibleRight = Math.min(containerRect.right, window.innerWidth);

    top = (visibleTop + visibleBottom) / 2;
    left = (visibleLeft + visibleRight) / 2;
    transform = "translate(-50%, -50%)";
  } else {
    const belowTop = targetRect.bottom + SPOTLIGHT_LABEL_OFFSET_PX;
    const fitsBelow =
      belowTop + SPOTLIGHT_LABEL_HEIGHT_ESTIMATE_PX <=
      window.innerHeight - SPOTLIGHT_LABEL_EDGE_MARGIN_PX;
    const preferredTop = fitsBelow
      ? belowTop
      : targetRect.top - SPOTLIGHT_LABEL_OFFSET_PX - SPOTLIGHT_LABEL_HEIGHT_ESTIMATE_PX;
    top = Math.min(
      Math.max(preferredTop, SPOTLIGHT_LABEL_EDGE_MARGIN_PX),
      window.innerHeight - SPOTLIGHT_LABEL_EDGE_MARGIN_PX - SPOTLIGHT_LABEL_HEIGHT_ESTIMATE_PX
    );

    const centerX = targetRect.left + targetRect.width / 2;
    left = Math.min(
      Math.max(centerX, SPOTLIGHT_LABEL_EDGE_MARGIN_PX),
      window.innerWidth - SPOTLIGHT_LABEL_EDGE_MARGIN_PX
    );
    transform = "translateX(-50%)";
  }

  return (
    <div
      role="tooltip"
      style={{ top, left, transform }}
      className={cn(
        spotlightLabel,
        instant ? "duration-0" : "duration-300",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      {text}
    </div>
  );
};

export default SpotlightLabel;
