"use client";

import { cn } from "@/lib/cn";
import { SPOTLIGHT_HOLE_PADDING_PX } from "../constants/tutorialSpotlight.constants";
import { spotlightFiller } from "./tutorialSpotlight.variants";
import type { SpotlightDimProps } from "../types/tutorialSpotlight.types";

/** One rect the size of the container with a circular hole cut out around
 *  the target, via clip-path rather than a mask - a mask only changes what's
 *  painted, so pointer events would still land on the (invisible) dim layer
 *  over the target and block dragging it; clip-path excludes the cut-out
 *  region from hit-testing too, so the target underneath stays natively
 *  interactive with no z-index tricks needed. Confined to the container's
 *  own bounds; never dims anything outside it. Position is viewport
 *  coordinates (not container-relative) because this renders through a
 *  portal to escape the container's own stacking context - a sibling with a
 *  higher z-index elsewhere on the page would otherwise sit on top of it. */
const SpotlightDim: React.FC<SpotlightDimProps> = ({
  containerRect,
  targetRect,
  isVisible,
  instant,
}) => {
  const radius =
    Math.max(targetRect.width, targetRect.height) / 2 +
    SPOTLIGHT_HOLE_PADDING_PX;
  const centerX = targetRect.left + targetRect.width / 2 - containerRect.left;
  const centerY = targetRect.top + targetRect.height / 2 - containerRect.top;
  const outer = `M0 0 H${containerRect.width} V${containerRect.height} H0 Z`;
  const hole =
    `M${centerX + radius} ${centerY} ` +
    `A${radius} ${radius} 0 1 0 ${centerX - radius} ${centerY} ` +
    `A${radius} ${radius} 0 1 0 ${centerX + radius} ${centerY} Z`;
  const clipPath = `path(evenodd, "${outer} ${hole}")`;

  return (
    <div
      aria-hidden
      className={cn(
        spotlightFiller,
        instant ? "duration-0" : "duration-300",
        isVisible ? "opacity-100" : "opacity-0",
      )}
      style={{
        top: containerRect.top,
        left: containerRect.left,
        width: containerRect.width,
        height: containerRect.height,
        clipPath,
        WebkitClipPath: clipPath,
      }}
    />
  );
};

export default SpotlightDim;
