"use client";

import { useState } from "react";
import { motion, useMotionValue, useReducedMotion } from "motion/react";
import Folder from "@/components/folder/Folder";
import { KEYBOARD_NUDGE } from "@/constants/canvas";
import { cn } from "@/lib/cn";
import { canvasFolderSlot } from "./homeCanvas.variants";
import type { DraggableFolderProps, Offset } from "../types/homeCanvas.types";

const ARROW_DELTAS: Record<string, Offset> = {
  ArrowUp: { x: 0, y: -KEYBOARD_NUDGE },
  ArrowDown: { x: 0, y: KEYBOARD_NUDGE },
  ArrowLeft: { x: -KEYBOARD_NUDGE, y: 0 },
  ArrowRight: { x: KEYBOARD_NUDGE, y: 0 },
};

/** One folder the user can pick up and move anywhere on the canvas.
 *
 *  The committed position lives on left/top while x/y carry only the in-flight
 *  drag delta, which is folded into the committed position on release. Driving
 *  position through `animate` instead does not work: `drag` owns x/y and
 *  silently ignores animated targets, so restored positions never apply.
 *
 *  left/top only transition while not dragging, so a keyboard nudge glides
 *  but a drag still tracks the pointer 1:1. isDragging is cleared a frame
 *  after the drag-end position commits, rather than in the same tick — doing
 *  it immediately would let the transition apply to that same commit, and
 *  since the commit's delta is only visually a no-op once x/y are reset, that
 *  would animate a jump that should not be visible at all. */
const DraggableFolder: React.FC<DraggableFolderProps> = ({ folder, origin, offset, onMove }) => {
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
    <motion.div
      id={`canvas-slot-${folder.id}`}
      data-grabbable
      className={cn(
        canvasFolderSlot,
        !isDragging && !prefersReducedMotion && "transition-[left,top] duration-200 ease-out"
      )}
      style={{ x, y, left: origin.x + offset.x, top: origin.y + offset.y }}
      drag
      dragMomentum={false}
      dragElastic={0}
      whileDrag={prefersReducedMotion ? { zIndex: 50 } : { scale: 1.04, zIndex: 50 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(_, info) => {
        commit(info.offset.x, info.offset.y);
        requestAnimationFrame(() => setIsDragging(false));
      }}
      tabIndex={0}
      role="group"
      aria-label={`${folder.label} — drag, or move with the arrow keys`}
      onKeyDown={handleKeyDown}
    >
      <Folder folder={folder} />
    </motion.div>
  );
};

export default DraggableFolder;
