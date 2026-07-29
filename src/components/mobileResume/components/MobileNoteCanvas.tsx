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
/** Generous on purpose, and specifically tall enough that CONTENT_HEIGHT
 *  clears any real phone's viewport height: the tray now fills the whole
 *  sheet (not just the leftover space below a header), and Motion's drag
 *  constraints assume the draggable content is LARGER than the box it is
 *  constrained to - the standard "pan reveals more content" case. A margin
 *  too small left the pan layer's own content SHORTER than the viewport
 *  (700px of content in a 733px-tall box, measured on a mid-size phone),
 *  which is the inverted case Motion's constraint math does not handle
 *  cleanly: cards jumped on drag start and the pan layer could only be
 *  moved within whatever sliver of range that inversion left it. */
const MARGIN = 400;
/** Every other card drops slightly, so the row does not read as a ruler. */
const STAGGER_Y = 20;

const ROWS = Math.ceil(RESUME_CARDS.length / COLUMNS);
const CONTENT_WIDTH = COLUMNS * STEP_X + 2 * MARGIN;
const CONTENT_HEIGHT = ROWS * STEP_Y + 2 * MARGIN;

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
 *  board at the same time.
 *
 *  Each card's own dragConstraints points at viewportRef, the static outer
 *  box - not panLayerRef, the pan layer itself. That layer is also
 *  draggable, and constraining a card's bounds to an ancestor that is
 *  concurrently being dragged is a moving target: the card would visibly
 *  jump on drag start as Motion reconciled its position against a
 *  constantly-shifting box, and panning only worked within whatever sliver
 *  of that box happened to still be on screen. Desktop's ResumeCardField
 *  avoids this the same way, constraining to the static content column
 *  rather than anything with its own drag. */
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
              boundaryRef={viewportRef}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MobileNoteCanvas;
