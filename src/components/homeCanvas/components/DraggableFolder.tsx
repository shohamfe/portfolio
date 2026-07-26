"use client";

import { motion, useMotionValue, useReducedMotion } from "motion/react";
import Folder from "@/components/folder/Folder";
import { KEYBOARD_NUDGE } from "@/constants/canvas";
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
 *  Pointer events are stopped on capture so grabbing a folder moves only that
 *  folder — the canvas underneath does not pan at the same time. */
const DraggableFolder: React.FC<DraggableFolderProps> = ({ folder, origin, offset, onMove }) => {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

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
      className={canvasFolderSlot}
      style={{ x, y, left: origin.x + offset.x, top: origin.y + offset.y }}
      drag
      dragMomentum={false}
      dragElastic={0}
      whileDrag={prefersReducedMotion ? { zIndex: 50 } : { scale: 1.04, zIndex: 50 }}
      onPointerDownCapture={(event) => event.stopPropagation()}
      onDragEnd={(_, info) => commit(info.offset.x, info.offset.y)}
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
