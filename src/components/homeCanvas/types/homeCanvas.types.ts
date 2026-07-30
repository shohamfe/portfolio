import type { TechFolder } from "@/constants/tech";

export interface Offset {
  x: number;
  y: number;
}

export type OffsetMap = Record<string, Offset>;

export interface DraggableFolderProps {
  folder: TechFolder;
  /** Grid slot, in pixels, before any user dragging. */
  origin: Offset;
  /** Offset applied on top of the origin, restored from storage. */
  offset: Offset;
  /** Reports a movement delta, not an absolute position. */
  onMove: (id: string, delta: Offset) => void;
  /** Position in the grid, used to stagger the initial drop-in animation. */
  index: number;
}

export interface HomeCanvasProps {
  className?: string;
  /** Where the pan layer starts, in pixels. Overrides the class-based
   *  placement, which is written for the full-page desktop canvas and would
   *  otherwise open on the empty pan margin inside a small tray. */
  panOrigin?: Offset;
  /** The cursor-following "try moving things around" pill. Off where there is
   *  no cursor to follow. */
  showHint?: boolean;
  /** Off inside the mobile sheet, which already paints its own dot-grid
   *  background - see canvasViewportPlain. */
  paintDots?: boolean;
}

/** visible → leaving (fading out) → gone (unmounted). */
export type HintPhase = "visible" | "leaving" | "gone";

export interface CanvasHintProps {
  /** The element the cursor is tracked over. */
  boundaryRef: React.RefObject<HTMLElement | null>;
  /** True once the user has touched the canvas - hides the hint immediately. */
  dismissed: boolean;
}
