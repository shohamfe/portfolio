"use client";

import { useRef, useState } from "react";
import { motion, useDragControls, useReducedMotion } from "motion/react";
import StickyCard from "@/components/stickyCard/StickyCard";
import TutorialSpotlight from "@/components/tutorialSpotlight/TutorialSpotlight";
import { DRAG_ELASTIC } from "@/constants/canvas";
import {
  RESUME_CARD_PLACEMENTS,
  TUTORIAL_NOTES_STAGE1_CARD_ID,
  TUTORIAL_NOTES_STAGE_1,
  TUTORIAL_NOTES_STORAGE_KEY,
} from "@/constants/resume";
import { RESUME_CARDS } from "@/content/resume";
import {
  COLUMNS,
  MARGIN,
  STAGGER_Y,
  STEP_X,
  STEP_Y,
} from "../constants/mobileResume.constants";
import type { MobileNoteCanvasProps } from "./types/mobileNoteCanvas.types";
import { trayCard, trayPanLayer, trayViewport } from "./mobileResume.variants";

const ROWS = Math.ceil(RESUME_CARDS.length / COLUMNS);
const CONTENT_WIDTH = COLUMNS * STEP_X + MARGIN;
const CONTENT_HEIGHT = ROWS * STEP_Y + 2 * MARGIN;

const ROTATIONS = new Map(
  RESUME_CARD_PLACEMENTS.map((placement) => [placement.id, placement]),
);

const MobileNoteCanvas: React.FC<MobileNoteCanvasProps> = ({ isExpanded }) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const stage1TargetRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const dragControls = useDragControls();
  const [stage1Complete, setStage1Complete] = useState(false);

  const startPan = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) dragControls.start(event);
  };

  return (
    <div id="mobile-note-canvas" ref={viewportRef} className={trayViewport}>
      <motion.div
        data-grabbable
        className={trayPanLayer}
        style={{ width: CONTENT_WIDTH, height: CONTENT_HEIGHT }}
        drag={isExpanded}
        dragControls={dragControls}
        dragConstraints={viewportRef}
        dragElastic={prefersReducedMotion ? 0 : DRAG_ELASTIC}
        dragMomentum={!prefersReducedMotion}
        onPointerDown={startPan}
      >
        {RESUME_CARDS.map((card, index) => {
          const isTutorialTarget = card.id === TUTORIAL_NOTES_STAGE1_CARD_ID;

          return (
            <div
              key={card.id}
              className={trayCard}
              style={{
                left: (index % COLUMNS) * STEP_X + MARGIN / 5,
                top:
                  MARGIN * 1.25 +
                  Math.floor(index / COLUMNS) * STEP_Y +
                  (index % 2) * STAGGER_Y,
              }}
            >
              <StickyCard
                card={card}
                rotation={ROTATIONS.get(card.id)?.rotation ?? 0}
                parallaxDepth={ROTATIONS.get(card.id)?.depth ?? 0.5}
                cardRef={isTutorialTarget ? stage1TargetRef : undefined}
                onDragCommit={isTutorialTarget ? () => setStage1Complete(true) : undefined}
              />
            </div>
          );
        })}
      </motion.div>

      <TutorialSpotlight
        containerRef={viewportRef}
        stage1TargetRef={stage1TargetRef}
        storageKey={TUTORIAL_NOTES_STORAGE_KEY}
        stage1={TUTORIAL_NOTES_STAGE_1}
        stage1Complete={stage1Complete}
      />
    </div>
  );
};

export default MobileNoteCanvas;
