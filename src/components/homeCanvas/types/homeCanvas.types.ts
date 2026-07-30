import type { RefObject } from "react";
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
  /** Exposes this folder's drag grip to a caller - used to point the
   *  tutorial spotlight's stage1TargetRef at one specific folder. */
  gripRef?: RefObject<HTMLDivElement | null>;
}

export interface HomeCanvasProps {
  className?: string;
  panOrigin?: Offset;
  paintDots?: boolean;
}
