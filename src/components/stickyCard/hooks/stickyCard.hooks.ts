"use client";

import { useEffect } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "motion/react";

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
