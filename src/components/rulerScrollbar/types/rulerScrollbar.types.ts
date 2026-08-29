export interface RulerScrollbarProps {
  /** 0 to 1. Which point of the scrollable content is currently shown. */
  progress: number;
  /** Called with a 0-1 point when the ruler is clicked or driven by the
   *  keyboard. Omit to keep the ruler purely decorative. */
  onSeek?: (percent: number) => void;
  /** Id of the element this ruler scrolls, for aria-controls. */
  controlsId?: string;
  /** Ticks out from centre the "current position" bulge's falloff spans. */
  activeRadius?: number;
  /** Ticks out from centre the cursor's bulge falloff spans. */
  hoverRadius?: number;
  className?: string;
}

/** Distance (in tick count) from the tick nearest a bulge's centre, scaled
 *  onto a fixed 3-step-plus-far scale regardless of the bulge's own radius.
 *  "far" covers every distance past that radius, since they all render the
 *  same width and colour. */
export type TickDistanceBucket = "0" | "1" | "2" | "far";
