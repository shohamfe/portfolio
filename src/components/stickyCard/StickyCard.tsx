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
import { useDragReset, useStickyCardTilt } from "./hooks/stickyCard.hooks";
import type { StickyCardProps } from "./types/stickyCard.types";

/** A sticky-note style card scattered down the Resume page: freely
 *  draggable, and leaning in 3D toward wherever the cursor currently is.
 *
 *  Two nested motion elements, not one - the outer carries the cursor tilt
 *  (rotateX/rotateY plus the perspective that makes them readable) and the
 *  inner carries drag and its own resting 2D rotate. Combining both on one
 *  element would mean the drag gesture also had to fight the constantly
 *  shifting 3D tilt for the same transform.
 *
 *  dragElastic is 0, not just a small value with a snap-back: paired with
 *  dragConstraints, elastic 0 means the position is clamped to the boundary
 *  continuously while dragging, so the card cannot leave the given bounds
 *  even mid-gesture. There is nothing to snap back from.
 *
 *  The grip's x/y are controlled motion values, not `drag`'s own uncontrolled
 *  internal ones, so they can be reset on resize (see useDragReset). Left
 *  uncontrolled, resizing the window alone - no drag, no interaction - drifts
 *  the card by a couple of pixels every time: dragConstraints={boundaryRef}
 *  makes Motion re-measure and re-clamp position against the boundary's new
 *  box on every resize event, and that recalculation does not land back on
 *  exactly zero. */
const StickyCard: React.FC<StickyCardProps> = ({
  card,
  rotation = 0,
  parallaxDepth = 0.5,
  boundaryRef,
  className,
}) => {
  const { rotateX, rotateY, prefersReducedMotion } = useStickyCardTilt(parallaxDepth);
  const drag = useDragReset();
  const id = `sticky-card-${card.id}`;

  return (
    <motion.div id={id} style={{ rotateX, rotateY, transformPerspective: 800 }}>
      <motion.div
        id={`${id}-grip`}
        data-grabbable
        className={cn(stickyCardVariants({ color: card.color }), className)}
        style={{ x: drag.x, y: drag.y, rotate: `${rotation}deg` }}
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
