export interface BottomSheetProps {
  /** How much of the sheet stays on screen while collapsed, in pixels. */
  peekHeight: number;
  /** Heading above the tray, doubling as the sheet's accessible name. */
  title: string;
  /** The tray itself - a pannable canvas on both pages. */
  children: React.ReactNode;
}
