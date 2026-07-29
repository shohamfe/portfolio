import type { SheetDragState } from "../hooks/bottomSheet.hooks";

export interface BottomSheetProps {
  /** The page owns the drag state (via useSheetDrag) rather than this
   *  component owning it internally, so the page's own scroll region can
   *  bind its clearance to the same live sheet.coverage value. */
  sheet: SheetDragState;
  /** Heading above the tray, doubling as the sheet's accessible name. */
  title: string;
  /** The tray itself - a pannable canvas on both pages, filling the sheet
   *  behind the title. */
  children: React.ReactNode;
}
