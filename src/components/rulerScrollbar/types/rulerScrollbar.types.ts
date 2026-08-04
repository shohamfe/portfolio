export interface RulerScrollbarProps {
  /** 0 to 1. Which point of the scrollable content is currently shown. */
  progress: number;
  className?: string;
}

/** Distance (in tick count) from the tick nearest the current scroll
 *  position. "far" covers every distance of 3 or more, since they all render
 *  the same width and colour. */
export type TickDistanceBucket = "0" | "1" | "2" | "far";
