"use client";

import { motion } from "motion/react";
import Chip from "@/components/chip/Chip";
import { cn } from "@/lib/cn";
import {
  stickyCardBody,
  stickyCardChip,
  stickyCardPerspective,
  stickyCardTilt,
  stickyCardTitle,
  stickyCardVariants,
} from "./components/stickyCard.variants";
import { useCard3DTilt, useDragReset } from "./hooks/stickyCard.hooks";
import type { StickyCardProps } from "./types/stickyCard.types";

/** A sticky-note style card scattered down the Resume page: freely
 *  draggable, and leaning in 3D toward the cursor while hovered - Aceternity's
 *  3D Card Effect (https://ui.aceternity.com/components/3d-card-effect),
 *  adapted onto a draggable note instead of a static card.
 *
 *  Three nested layers, not one, because each needs its own untouched
 *  transform: the grip carries drag and its own resting 2D rotate; the
 *  perspective layer establishes the 3D viewing volume the tilt renders
 *  into (perspective must live on a parent of the tilted element); the tilt
 *  layer is what useCard3DTilt actually rotates, and its children (chip,
 *  title, body) pop toward the viewer on hover via their own translateZ.
 *  Putting tilt and drag on the same element would mean the drag gesture
 *  fighting the constantly-changing 3D rotation for one shared transform.
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
  const { tiltRef, onMouseMove, onMouseLeave, prefersReducedMotion } = useCard3DTilt(parallaxDepth);
  const drag = useDragReset();
  const id = `sticky-card-${card.id}`;

  return (
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
      <div className={stickyCardPerspective}>
        <div id={id} ref={tiltRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className={stickyCardTilt}>
          <Chip color={card.color} variant="solid" className={stickyCardChip}>
            {card.chip}
          </Chip>

          <p id={`${id}-title`} className={stickyCardTitle}>
            {card.title}
          </p>

          <p id={`${id}-body`} className={stickyCardBody}>
            {card.body}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default StickyCard;
