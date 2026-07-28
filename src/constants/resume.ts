/** Where each sticky note sits in the card column beside the timeline, and how
 *  strongly it reacts to the cursor.
 *
 *  Placement is deliberately hand-set rather than derived: the notes are meant
 *  to look scattered, and anything evenly spaced reads as a list. `depth`
 *  varies so they do not drift as one flat sheet - lower values sit further
 *  back and move less. */
export interface ResumeCardPlacement {
  id: string;
  /** Percent down the card column, which stretches to the resume's own
   *  height. Percentages rather than pixels so the notes always span the
   *  resume's full range: the content's height changes with viewport width
   *  as text rewraps, and fixed offsets would bunch up at the top of a tall
   *  layout or overrun a short one. */
  topPercent: number;
  /** Pixels from the left of the card column. */
  left: number;
  /** Resting tilt in degrees. */
  rotation: number;
  /** 0 to 1 cursor-parallax strength. */
  depth: number;
}

/** Spread from just inside the top to far enough down that the last note's
 *  own height still lands within the resume rather than past its end. */
export const RESUME_CARD_PLACEMENTS: readonly ResumeCardPlacement[] = [
  { id: "impact", topPercent: 2, left: 24, rotation: -4, depth: 0.9 },
  { id: "scale", topPercent: 13, left: 196, rotation: 5, depth: 0.45 },
  { id: "real-time", topPercent: 25, left: 8, rotation: -6, depth: 0.75 },
  { id: "methodology", topPercent: 37, left: 188, rotation: 4, depth: 0.35 },
  { id: "data", topPercent: 49, left: 30, rotation: -3, depth: 0.85 },
  { id: "architecture", topPercent: 61, left: 200, rotation: 6, depth: 0.5 },
  { id: "performance", topPercent: 73, left: 12, rotation: -5, depth: 0.7 },
  { id: "execution", topPercent: 85, left: 184, rotation: 3, depth: 0.4 },
];

/** Number of ticks on the resume ruler. Enough that the bulge moves smoothly
 *  rather than jumping a visible step per scroll. */
export const RULER_TICK_COUNT = 56;
