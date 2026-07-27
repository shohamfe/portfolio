"use client";

import { useRef, useState } from "react";
import { motion, useDragControls, useReducedMotion } from "motion/react";
import {
  CANVAS_MARGIN,
  COLUMNS,
  COLUMN_STEP,
  DRAG_ELASTIC,
  FOLDER_HEIGHT,
  FOLDER_WIDTH,
  ROW_STEP,
} from "@/constants/canvas";
import { TECH_FOLDERS } from "@/constants/tech";
import { cn } from "@/lib/cn";
import CanvasHint from "./components/CanvasHint";
import DraggableFolder from "./components/DraggableFolder";
import { canvasPanLayer, canvasViewport } from "./components/homeCanvas.variants";
import { originForIndex, usePersistedOffsets } from "./hooks/homeCanvas.hooks";
import type { HomeCanvasProps } from "./types/homeCanvas.types";

const ROWS = Math.ceil(TECH_FOLDERS.length / COLUMNS);
const CONTENT_WIDTH = (COLUMNS - 1) * COLUMN_STEP + FOLDER_WIDTH + 2 * CANVAS_MARGIN;
const CONTENT_HEIGHT = (ROWS - 1) * ROW_STEP + FOLDER_HEIGHT + 2 * CANVAS_MARGIN;

/** Pannable canvas of technology folders.
 *
 *  Dragging empty space pans the whole board, which rubber-bands at the edges
 *  rather than stopping dead. Dragging a folder moves just that folder, and
 *  every position is remembered across reloads.
 *
 *  The pan layer's own drag listener is disabled (`dragListener={false}`) and
 *  started manually via `dragControls`, only when the pointer actually went
 *  down on empty canvas. Relying on event propagation to stop a folder's own
 *  drag from also starting the parent's pan does not work - Motion's pointer
 *  handling does not respect a child's stopPropagation the way plain DOM
 *  listeners would, so both gestures used to fire at once and the folder
 *  never moved. */
const HomeCanvas: React.FC<HomeCanvasProps> = ({ className }) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const dragControls = useDragControls();
  const [hasInteracted, setHasInteracted] = useState(false);

  const { offsets, moveBy } = usePersistedOffsets();

  const startPan = (event: React.PointerEvent<HTMLDivElement>) => {
    setHasInteracted(true);

    if (event.target === event.currentTarget) {
      dragControls.start(event);
    }
  };

  return (
    <div id="home-canvas" ref={viewportRef} className={cn(canvasViewport, className)}>
      <motion.div
        id="home-canvas-pan-layer"
        data-grabbable
        className={canvasPanLayer}
        style={{ width: CONTENT_WIDTH, height: CONTENT_HEIGHT }}
        drag
        dragListener={false}
        dragControls={dragControls}
        dragConstraints={viewportRef}
        dragElastic={prefersReducedMotion ? 0 : DRAG_ELASTIC}
        dragMomentum={!prefersReducedMotion}
        onPointerDown={startPan}
      >
        {TECH_FOLDERS.map((folder, index) => (
          <DraggableFolder
            key={folder.id}
            folder={folder}
            index={index}
            origin={originForIndex(index)}
            offset={offsets[folder.id] ?? { x: 0, y: 0 }}
            onMove={moveBy}
          />
        ))}
      </motion.div>

      <CanvasHint boundaryRef={viewportRef} dismissed={hasInteracted} />
    </div>
  );
};

export default HomeCanvas;
