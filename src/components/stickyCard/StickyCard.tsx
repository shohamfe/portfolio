"use client";

import { motion } from "motion/react";
import Chip from "@/components/chip/Chip";
import { cn } from "@/lib/cn";
import {
  stickyCardBody,
  stickyCardChip,
  stickyCardPerspective,
  stickyCardTitle,
  stickyCardVariants,
} from "./components/stickyCard.variants";
import { useDragReset, useStickyCardTilt } from "./hooks/stickyCard.hooks";
import type { StickyCardProps } from "./types/stickyCard.types";

/** A sticky-note style card scattered down the Resume page: freely
 *  draggable, and leaning in 3D toward wherever the cursor is anywhere on
 *  screen - Aceternity's 3D Card Effect
 *  (https://ui.aceternity.com/components/3d-card-effect), adapted to react
 *  to the whole window instead of only its own hover, and layered onto a
 *  draggable note instead of a static card.
 *
 *  The card itself carries drag, its resting 2D rotate, AND the cursor tilt
 *  all in one style object - Motion composes every transform-related value
 *  passed there into a single transform, so this is the actual visible box
 *  (border, background, shadow) leaning in 3D, not just its text shifting
 *  inside a static frame. Only the perspective needs its own element: it
 *  has to live on a parent of the tilted element, not the tilted element
 *  itself, or the rotation reads as a flat skew instead of a card leaning
 *  in space.
 *
 *  Inside, the chip/title/body pop toward the viewer on hover via their own
 *  translateZ, riding on this card's preserve-3d.
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
    <div className={stickyCardPerspective}>
      <motion.div
        id={id}
        data-grabbable
        className={cn(stickyCardVariants({ color: card.color }), className)}
        style={{ x: drag.x, y: drag.y, rotate: `${rotation}deg`, rotateX, rotateY }}
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
    </div>
  );
};

export default StickyCard;
