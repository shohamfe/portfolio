"use client";

import { motion } from "motion/react";
import Chip from "@/components/chip/Chip";
import { cn } from "@/lib/cn";
import {
  stickyCardBody,
  stickyCardChip,
  stickyCardTitle,
  stickyCardVariants,
} from "./components/stickyCard.variants";
import { useStickyCardParallax } from "./hooks/stickyCard.hooks";
import type { StickyCardProps } from "./types/stickyCard.types";

/** A sticky-note style card scattered down the Resume page: freely
 *  draggable, and drifting a few pixels with the cursor.
 *
 *  Two nested motion elements, not one - Motion only manages one x/y pair
 *  per element, so the cursor-parallax offset (outer) and the drag offset
 *  (inner, Motion's own internal x/y) have to live on separate elements.
 *
 *  dragElastic is 0, not just a small value with a snap-back: paired with
 *  dragConstraints, elastic 0 means the position is clamped to the boundary
 *  continuously while dragging, so the card cannot leave the given bounds
 *  even mid-gesture. There is nothing to snap back from. */
const StickyCard: React.FC<StickyCardProps> = ({
  card,
  rotation = 0,
  parallaxDepth = 0.5,
  boundaryRef,
  className,
}) => {
  const { x, y, prefersReducedMotion } = useStickyCardParallax(parallaxDepth);
  const id = `sticky-card-${card.id}`;

  return (
    <motion.div id={id} style={{ x, y }}>
      <motion.div
        id={`${id}-grip`}
        data-grabbable
        className={cn(stickyCardVariants({ color: card.color }), className)}
        style={{ rotate: `${rotation}deg` }}
        drag
        dragConstraints={boundaryRef}
        dragMomentum={false}
        dragElastic={0}
        whileDrag={
          prefersReducedMotion
            ? { zIndex: 50 }
            : { scale: 1.04, zIndex: 50, transition: { type: "spring", stiffness: 500, damping: 30 } }
        }
      >
        <Chip color={card.color} variant="solid" className={stickyCardChip}>
          {card.chip}
        </Chip>

        <p id={`${id}-title`} className={stickyCardTitle}>
          {card.title}
        </p>

        <p id={`${id}-body`} className={stickyCardBody}>
          {card.body}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default StickyCard;
