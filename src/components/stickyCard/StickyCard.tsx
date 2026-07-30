"use client";

import Chip from "@/components/chip/Chip";
import Magnetic from "@/components/magnetic/Magnetic";
import { cn } from "@/lib/cn";
import { motion } from "motion/react";
import {
  stickyCardBody,
  stickyCardChip,
  stickyCardPerspective,
  stickyCardTitle,
  stickyCardVariants,
} from "./components/stickyCard.variants";
import { useDragReset, useStickyCardTilt } from "./hooks/stickyCard.hooks";
import type { StickyCardProps } from "./types/stickyCard.types";

const StickyCard: React.FC<StickyCardProps> = ({
  card,
  rotation = 0,
  parallaxDepth = 0.5,
  boundaryRef,
  className,
  cardRef,
  onDragCommit,
}) => {
  const { rotateX, rotateY, prefersReducedMotion } =
    useStickyCardTilt(parallaxDepth);
  const drag = useDragReset();
  const id = `sticky-card-${card.id}`;

  return (
    <Magnetic actionArea="global" range={200}>
      <div className={stickyCardPerspective}>
        <motion.div
          id={id}
          ref={cardRef}
          data-grabbable
          className={cn(stickyCardVariants({ color: card.color }), className)}
          style={{
            x: drag.x,
            y: drag.y,
            rotate: `${rotation}deg`,
            rotateX,
            rotateY,
          }}
          drag
          dragConstraints={boundaryRef}
          dragMomentum={false}
          dragElastic={0}
          whileDrag={
            prefersReducedMotion
              ? { zIndex: 50 }
              : {
                  scale: 1.04,
                  zIndex: 50,
                  transition: { type: "spring", stiffness: 500, damping: 30 },
                }
          }
          onDragEnd={(_, info) => {
            if (onDragCommit && (info.offset.x !== 0 || info.offset.y !== 0)) {
              onDragCommit();
            }
          }}
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
    </Magnetic>
  );
};

export default StickyCard;
