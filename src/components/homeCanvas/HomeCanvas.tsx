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
import TutorialSpotlight from "@/components/tutorialSpotlight/TutorialSpotlight";
import { cn } from "@/lib/cn";
import DraggableFolder from "./components/DraggableFolder";
import {
  canvasPanLayer,
  canvasPanLayerFree,
  canvasViewport,
  canvasViewportPlain,
} from "./components/homeCanvas.variants";
import {
  TUTORIAL_STAGE1_FOLDER_ID,
  TUTORIAL_STAGE_1,
  TUTORIAL_STAGE_2,
  TUTORIAL_STORAGE_KEY,
} from "./constants/homeCanvas.constants";
import { originForIndex, usePersistedOffsets } from "./hooks/homeCanvas.hooks";
import type { HomeCanvasProps, Offset } from "./types/homeCanvas.types";

const ROWS = Math.ceil(TECH_FOLDERS.length / COLUMNS);
const CONTENT_WIDTH =
  (COLUMNS - 1) * COLUMN_STEP + FOLDER_WIDTH + 2 * CANVAS_MARGIN;
const CONTENT_HEIGHT =
  (ROWS - 1) * ROW_STEP + FOLDER_HEIGHT + 2 * CANVAS_MARGIN;

/** Pannable canvas of technology folders */
const HomeCanvas: React.FC<HomeCanvasProps> = ({
  className,
  panOrigin,
  paintDots = true,
}) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const stage1TargetRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const dragControls = useDragControls();
  const [reactFolderMoved, setReactFolderMoved] = useState(false);
  const [canvasPanned, setCanvasPanned] = useState(false);

  const { offsets, moveBy } = usePersistedOffsets();

  const handleFolderMove = (id: string, delta: Offset) => {
    moveBy(id, delta);

    if (id === TUTORIAL_STAGE1_FOLDER_ID && (delta.x !== 0 || delta.y !== 0)) {
      setReactFolderMoved(true);
    }
  };

  const startPan = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      dragControls.start(event);
    }
  };

  return (
    <div
      id="home-canvas"
      ref={viewportRef}
      className={cn(
        paintDots ? canvasViewport : canvasViewportPlain,
        className,
      )}
    >
      <motion.div
        id="home-canvas-pan-layer"
        data-grabbable
        className={panOrigin ? canvasPanLayerFree : canvasPanLayer}
        style={{
          width: CONTENT_WIDTH,
          height: CONTENT_HEIGHT,
          left: panOrigin?.x,
          top: panOrigin?.y,
        }}
        drag
        dragListener={false}
        dragControls={dragControls}
        dragConstraints={viewportRef}
        dragElastic={prefersReducedMotion ? 0 : DRAG_ELASTIC}
        dragMomentum={!prefersReducedMotion}
        onPointerDown={startPan}
        onDragEnd={(_, info) => {
          if (info.offset.x !== 0 || info.offset.y !== 0) {
            setCanvasPanned(true);
          }
        }}
      >
        {TECH_FOLDERS.map((folder, index) => (
          <DraggableFolder
            key={folder.id}
            folder={folder}
            index={index}
            origin={originForIndex(index)}
            offset={offsets[folder.id] ?? { x: 0, y: 0 }}
            onMove={handleFolderMove}
            gripRef={folder.id === TUTORIAL_STAGE1_FOLDER_ID ? stage1TargetRef : undefined}
          />
        ))}
      </motion.div>

      <TutorialSpotlight
        containerRef={viewportRef}
        stage1TargetRef={stage1TargetRef}
        storageKey={TUTORIAL_STORAGE_KEY}
        stage1={TUTORIAL_STAGE_1}
        stage2={TUTORIAL_STAGE_2}
        stage1Complete={reactFolderMoved}
        stage2Complete={canvasPanned}
      />
    </div>
  );
};

export default HomeCanvas;
