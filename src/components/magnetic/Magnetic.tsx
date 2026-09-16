"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useMagnetic } from "./hooks/magnetic.hooks";
import type { MagneticProps } from "./types/magnetic.types";
import { useIsMobile } from "../viewportSwitch/hooks/viewportSwitch.hooks";

/** Pulls its child toward the cursor on hover, spring-returning to rest on
 *  mouse leave. Ported from https://21st.dev/@ibelick/components/magnetic/nested. */
const Magnetic: React.FC<MagneticProps> = ({
  children,
  intensity = 0.6,
  range = 100,
  actionArea = "self",
  springOptions,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { springX, springY, handleMouseEnter, handleMouseLeave } = useMagnetic(
    ref,
    {
      intensity,
      range,
      actionArea,
      springOptions,
    },
  );

  if (isMobile) return children;

  return (
    <motion.div
      ref={ref}
      onMouseEnter={actionArea === "self" ? handleMouseEnter : undefined}
      onMouseLeave={actionArea === "self" ? handleMouseLeave : undefined}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
