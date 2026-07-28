"use client";

import { useEffect } from "react";
import { useMotionValue, useReducedMotion, useSpring, type MotionValue } from "motion/react";

/** Max tilt in degrees at full cursor travel and depth 1. */
const TILT_RANGE_DEG = 10;

const TILT_SPRING = { stiffness: 60, damping: 20, mass: 0.5 };

/** Leans a card in 3D toward wherever the cursor currently is, scaled by
 *  depth (0 = still, 1 = full tilt) - rotation only, no change in position.
 *  An earlier version translated the card a few pixels toward the cursor
 *  instead; in practice that read as the whole card nervously wiggling
 *  around rather than reacting to the cursor, since its location kept
 *  shifting on every pointermove. Tilting the orientation while the card
 *  stays anchored in place reads as a calmer, more deliberate response.
 *
 *  Cursor position is tracked window-wide via pointermove rather than
 *  per-element hover, so every card leans together as the cursor moves
 *  anywhere on screen. Skipped entirely under prefers-reduced-motion. */
export const useStickyCardTilt = (depth: number) => {
  const prefersReducedMotion = useReducedMotion();
  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  const rotateX = useSpring(rotateXValue, TILT_SPRING);
  const rotateY = useSpring(rotateYValue, TILT_SPRING);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      // Cursor to the right tilts the card's right edge back (positive
      // rotateY); cursor above tilts the top edge back (negative rotateX) -
      // both read as the card leaning toward the cursor's side.
      rotateYValue.set(nx * 2 * TILT_RANGE_DEG * depth);
      rotateXValue.set(-ny * 2 * TILT_RANGE_DEG * depth);
    };

    // Capture phase, not bubble: each card's own drag-enabled element stops
    // propagation on pointermove for its drag-gesture handling, which would
    // otherwise swallow the event before a bubble-phase window listener ever
    // saw it - exactly while the cursor is over a card, which is the one
    // place this effect most needs to fire.
    window.addEventListener("pointermove", handlePointerMove, { capture: true });
    return () => window.removeEventListener("pointermove", handlePointerMove, { capture: true });
  }, [depth, prefersReducedMotion, rotateXValue, rotateYValue]);

  return { rotateX, rotateY, prefersReducedMotion };
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
