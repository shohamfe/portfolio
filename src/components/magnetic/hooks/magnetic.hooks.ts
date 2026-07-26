import { useEffect, useState, type RefObject } from "react";
import { useMotionValue, useReducedMotion, useSpring, type SpringOptions } from "motion/react";
import type { MagneticActionArea } from "../types/magnetic.types";

const DEFAULT_SPRING: SpringOptions = { stiffness: 26.7, damping: 4.1, mass: 0.2 };

interface UseMagneticOptions {
  intensity: number;
  range: number;
  actionArea: MagneticActionArea;
  springOptions?: SpringOptions;
}

/** Tracks the cursor and drives the springed x/y offsets for Magnetic. Ported
 *  from ibelick/motion-primitives, with a reduced-motion escape hatch added. */
export const useMagnetic = (
  ref: RefObject<HTMLDivElement | null>,
  { intensity, range, actionArea, springOptions }: UseMagneticOptions
) => {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springOptions ?? DEFAULT_SPRING);
  const springY = useSpring(y, springOptions ?? DEFAULT_SPRING);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const calculateDistance = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const absoluteDistance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (isHovered && absoluteDistance <= range) {
        const scale = 1 - absoluteDistance / range;
        x.set(distanceX * intensity * scale);
        y.set(distanceY * intensity * scale);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    document.addEventListener("mousemove", calculateDistance);

    return () => document.removeEventListener("mousemove", calculateDistance);
  }, [ref, isHovered, intensity, range, shouldReduceMotion, x, y]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    if (actionArea === "parent" && ref.current?.parentElement) {
      const parent = ref.current.parentElement;
      const handleParentEnter = () => setIsHovered(true);
      const handleParentLeave = () => setIsHovered(false);

      parent.addEventListener("mouseenter", handleParentEnter);
      parent.addEventListener("mouseleave", handleParentLeave);

      return () => {
        parent.removeEventListener("mouseenter", handleParentEnter);
        parent.removeEventListener("mouseleave", handleParentLeave);
      };
    }

    if (actionArea === "global") {
      setIsHovered(true);
    }
  }, [ref, actionArea, shouldReduceMotion]);

  const handleMouseEnter = () => {
    if (actionArea === "self") setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (actionArea === "self") {
      setIsHovered(false);
      x.set(0);
      y.set(0);
    }
  };

  return { springX, springY, handleMouseEnter, handleMouseLeave };
};
