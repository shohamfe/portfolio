"use client";

import { useEffect } from "react";
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "motion/react";

const TILT_RANGE_DEG = 26;

const depthScale = (depth: number) => 0.55 + 0.45 * depth;

const TILT_SPRING = { stiffness: 150, damping: 22, mass: 0.4 };

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
      const range = TILT_RANGE_DEG * depthScale(depth);
      rotateYValue.set(nx * 2 * range);
      rotateXValue.set(-ny * 2 * range);
    };

    // Capture phase: the card's own drag gesture stops pointermove propagation on bubble.
    window.addEventListener("pointermove", handlePointerMove, {
      capture: true,
    });
    return () =>
      window.removeEventListener("pointermove", handlePointerMove, {
        capture: true,
      });
  }, [depth, prefersReducedMotion, rotateXValue, rotateYValue]);

  return { rotateX, rotateY, prefersReducedMotion };
};

export const useDragReset = (): {
  x: MotionValue<number>;
  y: MotionValue<number>;
} => {
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
