"use client";

import { useRef } from "react";
import { motion, useDragControls, useReducedMotion } from "motion/react";
import StickyCard from "@/components/stickyCard/StickyCard";
import { DRAG_ELASTIC } from "@/constants/canvas";
import { RESUME_CARD_PLACEMENTS } from "@/constants/resume";
import { RESUME_CARDS } from "@/content/resume";
import type { MobileNoteCanvasProps } from "./types/mobileNoteCanvas.types";
import { trayCard, trayPanLayer, trayViewport } from "./mobileResume.variants";

const COLUMNS = 4;
const STEP_X = 180;
const STEP_Y = 210;

const MARGIN = 100;
const STAGGER_Y = 20;

const ROWS = Math.ceil(RESUME_CARDS.length / COLUMNS);
const CONTENT_WIDTH = COLUMNS * STEP_X + MARGIN;
const CONTENT_HEIGHT = ROWS * STEP_Y + 2 * MARGIN;

const ROTATIONS = new Map(
  RESUME_CARD_PLACEMENTS.map((placement) => [placement.id, placement]),
);

const MobileNoteCanvas: React.FC<MobileNoteCanvasProps> = ({ isExpanded }) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const dragControls = useDragControls();

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
        {RESUME_CARDS.map((card, index) => (
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
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MobileNoteCanvas;
