"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  COLUMNS,
  COLUMN_STEP,
  DRAG_ELASTIC,
  FOLDER_HEIGHT,
  FOLDER_WIDTH,
  ROW_STEP,
} from "@/constants/canvas";
import { TECH_FOLDERS } from "@/constants/tech";
import { cn } from "@/lib/cn";
import DraggableFolder from "./components/DraggableFolder";
import { canvasPanLayer, canvasViewport } from "./components/homeCanvas.variants";
import { originForIndex, usePersistedOffsets } from "./hooks/homeCanvas.hooks";
import type { HomeCanvasProps } from "./types/homeCanvas.types";

const ROWS = Math.ceil(TECH_FOLDERS.length / COLUMNS);
const CONTENT_WIDTH = (COLUMNS - 1) * COLUMN_STEP + FOLDER_WIDTH;
const CONTENT_HEIGHT = (ROWS - 1) * ROW_STEP + FOLDER_HEIGHT;

/** Pannable canvas of technology folders.
 *
 *  Dragging empty space pans the whole board, which rubber-bands at the edges
 *  rather than stopping dead. Dragging a folder moves just that folder, and
 *  every position is remembered across reloads. */
const HomeCanvas: React.FC<HomeCanvasProps> = ({ className }) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { offsets, moveBy } = usePersistedOffsets();

  return (
    <div id="home-canvas" ref={viewportRef} className={cn(canvasViewport, className)}>
      <motion.div
        id="home-canvas-pan-layer"
        data-grabbable
        className={canvasPanLayer}
        style={{ width: CONTENT_WIDTH, height: CONTENT_HEIGHT }}
        drag
        dragConstraints={viewportRef}
        dragElastic={prefersReducedMotion ? 0 : DRAG_ELASTIC}
        dragMomentum={!prefersReducedMotion}
      >
        {TECH_FOLDERS.map((folder, index) => (
          <DraggableFolder
            key={folder.id}
            folder={folder}
            origin={originForIndex(index)}
            offset={offsets[folder.id] ?? { x: 0, y: 0 }}
            onMove={moveBy}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default HomeCanvas;
