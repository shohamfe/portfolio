export interface ResumeCardPlacement {
  id: string;
  topPercent: number;
  left: number;
  rotation: number;
  depth: number;
}

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

/** Shared between the desktop (ResumeCardField) and mobile (MobileNoteCanvas)
 *  note tutorial mounts, so seeing it on one breakpoint doesn't show it again
 *  on the other. */
export const TUTORIAL_NOTES_STORAGE_KEY = "portfolio:tutorial-notes-seen";

/** The card that stays lit during the (only) stage of the notes walkthrough. */
export const TUTORIAL_NOTES_STAGE1_CARD_ID = "impact";

export const TUTORIAL_NOTES_STAGE_1 = {
  label: "Drag me around",
  ariaText: "Tutorial: the Impact note can be dragged with a mouse or touch.",
};
