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

/** Pull-up tray: two positions (peeking/expanded). Canvas fills entire area including behind title
 *. Only grip bar initiates drag; canvas handles its own gestures. */
const BottomSheet: React.FC<BottomSheetProps> = ({
  sheet,
  title,
  children,
}) => {
  const {
    ref,
    y,
    isExpanded,
    isSliding,
    toggle,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  } = sheet;

  return (
    <motion.section
      id="mobile-sheet"
      ref={ref}
      aria-label={title}
      className={cn(
        sheetRoot,
        isSliding && "transition-transform duration-300 ease-out",
      )}
      style={{ height: SHEET_EXPANDED, y }}
    >
      <div
        id="mobile-sheet-grip"
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

        <div className={sheetTitleBlock}>
          <h2 className={sheetTitle}>{title}</h2>

          <span aria-hidden className={sectionUnderline} />
        </div>
      </div>

      <div className={sheetCanvasArea} id="mobile-sheet-canvas">
        <div className={sheetCanvasLayer}>{children}</div>

        <div aria-hidden className={sheetTitleMask} />
      </div>
    </motion.section>
  );
};

export default BottomSheet;
