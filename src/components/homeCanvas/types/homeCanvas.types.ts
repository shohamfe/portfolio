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
}

/** visible → leaving (fading out) → gone (unmounted). */
export type HintPhase = "visible" | "leaving" | "gone";

export interface CanvasHintProps {
  /** The element the cursor is tracked over. */
  boundaryRef: React.RefObject<HTMLElement | null>;
  /** True once the user has touched the canvas - hides the hint immediately. */
  dismissed: boolean;
}
