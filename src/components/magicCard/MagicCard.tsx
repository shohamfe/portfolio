"use client";

import { cn } from "@/lib/cn";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { useCallback, useEffect } from "react";
import { magicCardGlow, magicCardRoot } from "./components/magicCard.variants";
import type { MagicCardProps } from "./types/magicCard.types";

/** Spotlight that follows the cursor, adapted from
 *  https://magicui.design/docs/components/magic-card. */
const MagicCard: React.FC<MagicCardProps> = ({
  children,
  gradientSize = 220,
  glowColor,
  glowOpacity = 0.8,
  className,
}) => {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const parkCursor = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mouseX, mouseY, gradientSize]);

  useEffect(parkCursor, [parkCursor]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - bounds.left);
    mouseY.set(event.clientY - bounds.top);
  };

  const glowBackground = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 100%)`;

  return (
    <div
      className={cn(magicCardRoot, className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={parkCursor}
    >
      <motion.div
        aria-hidden
        className={magicCardGlow}
        style={{ background: glowBackground, opacity: glowOpacity }}
      />

      {children}
    </div>
  );
};

export default MagicCard;
