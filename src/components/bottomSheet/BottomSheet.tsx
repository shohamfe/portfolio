"use client";

import { motion } from "motion/react";
import { SHEET_EXPANDED, SHEET_HINT } from "@/constants/mobile";
import { cn } from "@/lib/cn";
import {
  sectionUnderline,
  sheetBody,
  sheetGrip,
  sheetHandle,
  sheetHeader,
  sheetHint,
  sheetRoot,
  sheetTitle,
  sheetTitleBlock,
} from "./components/bottomSheet.variants";
import { useSheetDrag } from "./hooks/bottomSheet.hooks";
import type { BottomSheetProps } from "./types/bottomSheet.types";

/** The pull-up tray both mobile pages end with. Two resting positions:
 *  peeking, and pulled up to SHEET_EXPANDED.
 *
 *  Only the header takes the gesture - the tray inside is a drag canvas of
 *  its own, and a card drag must not haul the whole sheet with it. See
 *  useSheetDrag for why the gesture is hand-rolled rather than Motion's
 *  `drag`.
 *
 *  The handle is a real button, not just a bar: dragging is the only other
 *  way to open the sheet, and a drag is not something a keyboard can do. */
const BottomSheet: React.FC<BottomSheetProps> = ({ peekHeight, title, children }) => {
  const { ref, y, isExpanded, isSliding, toggle, onPointerDown, onPointerMove, onPointerUp } =
    useSheetDrag(peekHeight);

  return (
    <motion.section
      id="mobile-sheet"
      ref={ref}
      aria-label={title}
      className={cn(sheetRoot, isSliding && "transition-transform duration-300 ease-out")}
      style={{ height: SHEET_EXPANDED, y }}
    >
      <header
        className={sheetHeader}
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
      </header>

      <div className={sheetBody}>{children}</div>
    </motion.section>
  );
};

export default BottomSheet;
