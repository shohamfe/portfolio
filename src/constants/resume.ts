/** Where each sticky note sits in the card column beside the timeline, and how
 *  strongly it reacts to the cursor.
 *
 *  Placement is deliberately hand-set rather than derived: the notes are meant
 *  to look scattered, and anything evenly spaced reads as a list. `depth`
 *  varies so they do not drift as one flat sheet - lower values sit further
 *  back and move less. */
export interface ResumeCardPlacement {
  id: string;
  /** Pixels from the top of the scrolling content. */
  top: number;
  /** Pixels from the left of the card column. */
  left: number;
  /** Resting tilt in degrees. */
  rotation: number;
  /** 0 to 1 cursor-parallax strength. */
  depth: number;
}

export const RESUME_CARD_PLACEMENTS: readonly ResumeCardPlacement[] = [
  { id: "impact", top: 40, left: 24, rotation: -4, depth: 0.9 },
  { id: "scale", top: 250, left: 196, rotation: 5, depth: 0.45 },
  { id: "real-time", top: 470, left: 8, rotation: -6, depth: 0.75 },
  { id: "methodology", top: 720, left: 188, rotation: 4, depth: 0.35 },
  { id: "data", top: 980, left: 30, rotation: -3, depth: 0.85 },
  { id: "architecture", top: 1240, left: 200, rotation: 6, depth: 0.5 },
  { id: "performance", top: 1520, left: 12, rotation: -5, depth: 0.7 },
  { id: "execution", top: 1790, left: 184, rotation: 3, depth: 0.4 },
];

/** Number of ticks on the resume ruler. Enough that the bulge moves smoothly
 *  rather than jumping a visible step per scroll. */
export const RULER_TICK_COUNT = 56;
