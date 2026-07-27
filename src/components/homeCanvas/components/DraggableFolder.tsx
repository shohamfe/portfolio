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

/** One folder the user can pick up and move anywhere on the canvas.
 *
 *  Two nested elements, not one - this is load-bearing, not decoration.
 *  Positioning lives on the outer slot; drag and its x/y motion values live
 *  on the inner grip. The mount drop-in is plain CSS (the folder-drop-in
 *  utility), not Motion's initial/animate: Motion never runs a mount
 *  animation on ANY descendant of a drag-enabled ancestor (confirmed with a
 *  bare probe carrying no drag props and no custom motion values, nested
 *  inside the pan layer - still froze at `initial` forever), and the pan
 *  layer these folders live inside has `drag`, so there was no way to keep
 *  this on Motion's side at all.
 *
 *  The committed position lives on the slot's left/top while the grip's x/y
 *  carry only the in-flight drag delta, folded into left/top on release.
 *  Driving position through `animate` instead does not work either: `drag`
 *  owns x/y and silently ignores animated targets, so restored positions
 *  never apply.
 *
 *  left/top only transition while not dragging, so a keyboard nudge glides
 *  but a drag still tracks the pointer 1:1. isDragging is cleared a frame
 *  after the drag-end position commits, rather than in the same tick - doing
 *  it immediately would let the transition apply to that same commit, and
 *  since the commit's delta is only visually a no-op once x/y are reset, that
 *  would animate a jump that should not be visible at all. */
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
        !isDragging && !prefersReducedMotion && "transition-[left,top] duration-200 ease-out"
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
            : { scale: 1.04, zIndex: 50, transition: { type: "spring", stiffness: 500, damping: 30 } }
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
