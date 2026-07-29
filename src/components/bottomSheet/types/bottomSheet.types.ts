export interface BottomSheetProps {
  /** Heading above the tray, doubling as the sheet's accessible name. */
  title: string;
  /** The tray itself - a pannable canvas on both pages, filling the sheet
   *  behind the title. */
  children: React.ReactNode;
}
