"use client";

import { useRef } from "react";
import { motion, useDragControls, useReducedMotion } from "motion/react";
import StickyCard from "@/components/stickyCard/StickyCard";
import { DRAG_ELASTIC } from "@/constants/canvas";
import { RESUME_CARD_PLACEMENTS } from "@/constants/resume";
import { RESUME_CARDS } from "@/content/resume";
import { trayCard, trayPanLayer, trayViewport } from "./mobileResume.variants";

/* A loose grid rather than the desktop's percent-based column: the notes have
 * to sit inside a short tray here, so they spread sideways instead of down
 * the page. The resting tilt still comes from RESUME_CARD_PLACEMENTS, so the
 * row keeps the same hand-scattered feel. */
const COLUMNS = 4;
const STEP_X = 210;
const STEP_Y = 150;
const MARGIN = 16;
/** Every other card drops slightly, so the row does not read as a ruler. */
const STAGGER_Y = 20;

const ROWS = Math.ceil(RESUME_CARDS.length / COLUMNS);
const CONTENT_WIDTH = COLUMNS * STEP_X + MARGIN;
const CONTENT_HEIGHT = ROWS * STEP_Y + MARGIN;

const ROTATIONS = new Map(RESUME_CARD_PLACEMENTS.map((placement) => [placement.id, placement]));

/** The Resume sheet's tray: the same sticky notes as the desktop page, on a
 *  canvas that pans in both directions.
 *
 *  Deliberately a small copy of HomeCanvas's pan arrangement rather than a
 *  shared abstraction - the two differ in what they lay out and how they
 *  persist, and only the six lines below are actually common. Those six
 *  matter though: the pan layer's own drag listener is off and started
 *  manually only when the pointer went down on empty canvas, since Motion
 *  ignores a child's stopPropagation and a card drag would otherwise pan the
 *  board at the same time. */
const MobileNoteCanvas: React.FC = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const panLayerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const dragControls = useDragControls();

  const startPan = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) dragControls.start(event);
  };

  return (
    <div id="mobile-note-canvas" ref={viewportRef} className={trayViewport}>
      <motion.div
        ref={panLayerRef}
        data-grabbable
        className={trayPanLayer}
        style={{ width: CONTENT_WIDTH, height: CONTENT_HEIGHT }}
        drag
        dragListener={false}
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
              left: MARGIN + (index % COLUMNS) * STEP_X,
              top: MARGIN + Math.floor(index / COLUMNS) * STEP_Y + (index % 2) * STAGGER_Y,
            }}
          >
            <StickyCard
              card={card}
              rotation={ROTATIONS.get(card.id)?.rotation ?? 0}
              parallaxDepth={ROTATIONS.get(card.id)?.depth ?? 0.5}
              boundaryRef={panLayerRef}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MobileNoteCanvas;
