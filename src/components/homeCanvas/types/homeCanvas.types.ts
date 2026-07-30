import type { TechFolder } from "@/constants/tech";

export interface Offset {
  x: number;
  y: number;
}

export type OffsetMap = Record<string, Offset>;

export interface DraggableFolderProps {
  folder: TechFolder;
  origin: Offset;
  offset: Offset;
  onMove: (id: string, delta: Offset) => void;
  index: number;
}

export interface HomeCanvasProps {
  className?: string;
  panOrigin?: Offset;
  showHint?: boolean;
  paintDots?: boolean;
}

export type HintPhase = "visible" | "leaving" | "gone";

export interface CanvasHintProps {
  boundaryRef: React.RefObject<HTMLElement | null>;
  dismissed: boolean;
}
