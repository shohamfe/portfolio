"use client";

import { useEffect, useMemo, useRef } from "react";
import { useMotionValue, useReducedMotion, type MotionValue } from "motion/react";

/** Max tilt in degrees at the card's own edge, scaled by depth (0 = still,
 *  1 = full tilt) - matches Aceternity's 3D Card Effect: local per-card mouse
 *  tracking rather than a window-wide cursor, so the tilt only reacts while
 *  the cursor is actually over that card, and resets the moment it leaves. */
const MAX_TILT_DEG = 14;

/** Local, hover-driven 3D tilt for one card - a straight port of Aceternity's
 *  3D Card Effect (https://ui.aceternity.com/components/3d-card-effect):
 *  rotateX/rotateY are computed from the cursor's position relative to this
 *  card's own bounding box, not the window, so every card tilts
 *  independently and only while actually hovered. Applied to a ref directly
 *  (not React state) so tilting doesn't trigger a re-render on every
 *  mousemove - the reference implementation does the same for the same
 *  reason.
 *
 *  Deliberately mouse events, not pointer events: the drag gesture on this
 *  same card listens for pointermove and stops its propagation, which would
 *  otherwise reach a shared ancestor listener before it saw this one. Mouse
 *  and pointer events are independent dispatch chains, so this tilt handler
 *  is never at risk of being swallowed by the drag gesture. */
export const useCard3DTilt = (depth: number) => {
  const prefersReducedMotion = useReducedMotion();
  const tiltRef = useRef<HTMLDivElement>(null);
  const maxTilt = MAX_TILT_DEG * depth;

  const handlers = useMemo(() => {
    if (prefersReducedMotion) return {};

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      const el = tiltRef.current;
      if (!el) return;

      const { left, top, width, height } = el.getBoundingClientRect();
      const nx = (event.clientX - left - width / 2) / (width / 2);
      const ny = (event.clientY - top - height / 2) / (height / 2);
      el.style.transform = `rotateY(${nx * maxTilt}deg) rotateX(${-ny * maxTilt}deg)`;
    };

    const handleMouseLeave = () => {
      const el = tiltRef.current;
      if (!el) return;
      el.style.transform = "rotateY(0deg) rotateX(0deg)";
    };

    return { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
  }, [maxTilt, prefersReducedMotion]);

  return { tiltRef, prefersReducedMotion, ...handlers };
};

/** The grip's drag offset, reset to 0 on every window resize.
 *
 *  Left to `drag`'s own uncontrolled internal x/y, resizing the window alone -
 *  no drag, no interaction - introduces a small but real and persistent
 *  offset: dragConstraints={boundaryRef} makes Motion re-measure and re-clamp
 *  the element's position against the boundary's new box on every resize
 *  event, and that recalculation drifts by a couple of pixels each time
 *  rather than landing back on exactly zero. Confirmed by reading the grip's
 *  own inline transform before and after a single resize round-trip with no
 *  interaction in between: 2.14px/-4.69px had appeared where there was
 *  nothing before. Resizing the window already reflows the card's real
 *  position correctly (top/left are set from percentages and a fixed
 *  offset), so there is nothing for the drag delta to preserve across a
 *  resize - zeroing it is a reset to the correct rest position, not a loss of
 *  anything meaningful. */
export const useDragReset = (): { x: MotionValue<number>; y: MotionValue<number> } => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const handleResize = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [x, y]);

  return { x, y };
};
