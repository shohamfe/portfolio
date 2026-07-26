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
}

export interface HomeCanvasProps {
  className?: string;
}
