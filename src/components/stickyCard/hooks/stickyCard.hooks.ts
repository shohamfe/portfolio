"use client";

import { useEffect } from "react";
import { useMotionValue, useReducedMotion, useSpring, type MotionValue } from "motion/react";

/** Max drift in pixels at full cursor travel and depth 1. */
const PARALLAX_RANGE_PX = 14;

const PARALLAX_SPRING = { stiffness: 60, damping: 20, mass: 0.5 };

/** Drifts a card a few pixels with the cursor, scaled by depth (0 = still,
 *  1 = full drift). Cursor position is tracked window-wide via pointermove
 *  rather than per-element hover, so every card on the page drifts together
 *  as the cursor moves anywhere on screen. Skipped entirely under
 *  prefers-reduced-motion. */
export const useStickyCardParallax = (depth: number) => {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, PARALLAX_SPRING);
  const springY = useSpring(y, PARALLAX_SPRING);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      x.set(nx * 2 * PARALLAX_RANGE_PX * depth);
      y.set(ny * 2 * PARALLAX_RANGE_PX * depth);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [depth, prefersReducedMotion, x, y]);

  return { x: springX, y: springY, prefersReducedMotion };
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
