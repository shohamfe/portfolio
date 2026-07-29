"use client";

import { motion } from "motion/react";
import { SHEET_EXPANDED, SHEET_HINT } from "@/constants/mobile";
import { cn } from "@/lib/cn";
import {
  sectionUnderline,
  sheetCanvasArea,
  sheetCanvasLayer,
  sheetGrip,
  sheetGripBar,
  sheetHandle,
  sheetHint,
  sheetRoot,
  sheetTitle,
  sheetTitleBlock,
  sheetTitleMask,
} from "./components/bottomSheet.variants";
import type { BottomSheetProps } from "./types/bottomSheet.types";

/** The pull-up tray both mobile pages end with. Two resting positions:
 *  peeking just above the floating nav, and pulled up to SHEET_EXPANDED.
 *
 *  The canvas (children) fills the sheet's entire remaining area, including
 *  behind the title - the title floats on top via sheetTitleMask and
 *  sheetTitleBlock, the same three-layer stack (content, blur+gradient
 *  mask, overlaid label) the desktop Home page uses for its canvas/intro
 *  overlap. Only the grip bar starts the sheet's own drag now; the canvas
 *  owns its own gestures for the rest of the sheet. See useSheetDrag for why
 *  the drag gesture is hand-rolled rather than Motion's `drag`, and why the
 *  snap-to-rest glide is a CSS transition rather than Motion's `animate()`.
 *
 *  The handle is a real button, not just a bar: dragging is the only other
 *  way to open the sheet, and a drag is not something a keyboard can do.
 *
 *  `sheet` comes from the parent page (useSheetDrag), not from a hook call
 *  in here - the page's own scroll region needs the same live coverage
 *  value this component uses for its own position, so the drag state has to
 *  be owned one level up and passed down to both. */
const BottomSheet: React.FC<BottomSheetProps> = ({ sheet, title, children }) => {
  const { ref, y, isExpanded, isSliding, toggle, onPointerDown, onPointerMove, onPointerUp } = sheet;

  return (
    <motion.section
      id="mobile-sheet"
      ref={ref}
      aria-label={title}
      className={cn(sheetRoot, isSliding && "transition-transform duration-300 ease-out")}
      style={{ height: SHEET_EXPANDED, y }}
    >
      <div
        className={sheetGripBar}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <button
          type="button"
          onClick={toggle}
          aria-expanded={isExpanded}
          aria-controls="mobile-sheet"
          aria-label={isExpanded ? `Collapse ${title}` : `Expand ${title}`}
          className={sheetGrip}
        >
          <span aria-hidden className={sheetHandle} />

          <span className={sheetHint}>{SHEET_HINT}</span>
        </button>
      </div>

      <div className={sheetCanvasArea}>
        <div className={sheetCanvasLayer}>{children}</div>

        <div aria-hidden className={sheetTitleMask} />

        <div className={sheetTitleBlock}>
          <h2 className={sheetTitle}>{title}</h2>

          <span aria-hidden className={sectionUnderline} />
        </div>
      </div>
    </motion.section>
  );
};

export default BottomSheet;
