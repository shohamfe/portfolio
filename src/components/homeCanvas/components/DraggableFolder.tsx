"use client";

import { useState } from "react";
import { motion, useMotionValue, useReducedMotion } from "motion/react";
import Folder from "@/components/folder/Folder";
import { KEYBOARD_NUDGE } from "@/constants/canvas";
import { cn } from "@/lib/cn";
import { canvasFolderGrip, canvasFolderSlot } from "./homeCanvas.variants";
import type { DraggableFolderProps, Offset } from "../types/homeCanvas.types";

const ARROW_DELTAS: Record<string, Offset> = {
  ArrowUp: { x: 0, y: -KEYBOARD_NUDGE },
  ArrowDown: { x: 0, y: KEYBOARD_NUDGE },
  ArrowLeft: { x: -KEYBOARD_NUDGE, y: 0 },
  ArrowRight: { x: KEYBOARD_NUDGE, y: 0 },
};

const DraggableFolder: React.FC<DraggableFolderProps> = ({
  folder,
  origin,
  offset,
  onMove,
  index,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  const commit = (deltaX: number, deltaY: number) => {
    onMove(folder.id, { x: deltaX, y: deltaY });
    x.set(0);
    y.set(0);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const delta = ARROW_DELTAS[event.key];
    if (!delta) return;

    event.preventDefault();
    commit(delta.x, delta.y);
  };

  return (
    <div
      id={`canvas-slot-${folder.id}`}
      className={cn(
        canvasFolderSlot,
        !prefersReducedMotion && "folder-drop-in",
        !isDragging &&
          !prefersReducedMotion &&
          "transition-[left,top] duration-200 ease-out",
      )}
      style={{
        left: origin.x + offset.x,
        top: origin.y + offset.y,
        animationDelay: prefersReducedMotion ? undefined : `${index * 30}ms`,
      }}
    >
      <motion.div
        id={`canvas-grip-${folder.id}`}
        data-grabbable
        className={canvasFolderGrip}
        style={{ x, y }}
        drag
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
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_, info) => {
          commit(info.offset.x, info.offset.y);
          requestAnimationFrame(() => setIsDragging(false));
        }}
        tabIndex={0}
        role="group"
        aria-label={`${folder.label} - drag, or move with the arrow keys`}
        onKeyDown={handleKeyDown}
      >
        <Folder folder={folder} />
      </motion.div>
    </div>
  );
};

export default DraggableFolder;
