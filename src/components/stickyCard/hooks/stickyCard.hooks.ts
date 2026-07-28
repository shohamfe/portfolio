"use client";

import { useEffect } from "react";
import { useMotionValue, useReducedMotion, useSpring, type MotionValue } from "motion/react";

/** Max tilt in degrees at full cursor travel and depth 1.
 *
 *  Large on purpose. An earlier pass used 14 and the tilt was effectively
 *  invisible: combined with the depth scaling below, the further-back cards
 *  topped out around 5deg, and 5deg of rotateX on a 190px card viewed
 *  through a 1000px perspective moves its edges by roughly a pixel. The
 *  hover translateZ on the card's children was the only thing that read as
 *  motion, which made it look like the children tracked the cursor while
 *  the card sat still. */
const TILT_RANGE_DEG = 26;

/** Depth still separates the cards front-to-back, but from a floor rather
 *  than from zero - at the old raw multiplier a depth of 0.35 scaled the
 *  tilt down to almost nothing, so the "further back" cards read as simply
 *  broken rather than as subtler. Every card now tilts clearly; depth only
 *  decides how much more the front ones do. */
const depthScale = (depth: number) => 0.55 + 0.45 * depth;

/** Responsive enough to feel attached to the cursor rather than lagging
 *  behind it, still damped enough not to jitter on small movements. */
const TILT_SPRING = { stiffness: 150, damping: 22, mass: 0.4 };

/** Leans a card in 3D toward wherever the cursor currently is, anywhere on
 *  screen - not just while the cursor is over that particular card - scaled
 *  by depth (0 = still, 1 = full tilt). The returned rotateX/rotateY are
 *  meant to go directly into the SAME motion component that also carries
 *  drag (see StickyCard), not a separate inner wrapper: Motion composes
 *  every transform-related value passed to one element's style into a
 *  single transform, so the actual visible card - its border, background,
 *  shadow - tilts as one physical object, rather than only its inner
 *  content shifting inside a static box. */
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
      const range = TILT_RANGE_DEG * depthScale(depth);
      rotateYValue.set(nx * 2 * range);
      rotateXValue.set(-ny * 2 * range);
    };

    // Capture phase, not bubble: this same card's own drag gesture stops
    // propagation on pointermove for its drag handling, which would
    // otherwise swallow the event before a bubble-phase window listener
    // ever saw it - exactly while the cursor is over a card, which is one
    // of the places this effect most needs to keep working.
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
