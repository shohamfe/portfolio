/** Home canvas geometry. Folder size and the 100px gutter come from the Figma
 *  grid; everything else is derived so the layout stays consistent if the
 *  folder size ever changes. */
export const FOLDER_WIDTH = 175;
export const FOLDER_HEIGHT = 196;
export const GUTTER = 100;
export const COLUMNS = 5;

export const COLUMN_STEP = FOLDER_WIDTH + GUTTER;
export const ROW_STEP = FOLDER_HEIGHT + GUTTER;

/** Empty, draggable margin added around the folder grid on every side, so
 *  there's real room to pan beyond just the tight bounding box of the
 *  folders themselves. */
export const CANVAS_MARGIN = 600;

/** How far one arrow-key press nudges a focused folder. */
export const KEYBOARD_NUDGE = 16;

/** Rubber-band strength when the canvas is dragged past its bounds. */
export const DRAG_ELASTIC = 0.2;

export const STORAGE_KEY = "portfolio:folder-offsets";

/** The hand-arranged layout, captured from a real session and promoted to
 *  the default so a first-time visitor sees it immediately instead of the
 *  neat grid. Offsets are deltas on top of originForIndex's grid slot, same
 *  as anything a user drags themselves — the two compose the same way. */
export const DEFAULT_FOLDER_OFFSETS: Readonly<Record<string, { x: number; y: number }>> = {
  react: { x: 364, y: 338 },
  css3: { x: -482, y: -310 },
  html5: { x: 568, y: -382 },
  typescript: { x: 4, y: 59 },
  javascript: { x: -252, y: 595 },
  nodejs: { x: -148, y: 253 },
  github: { x: -209, y: 296 },
  aws: { x: -36, y: 284 },
  figma: { x: -525, y: -52 },
  claude: { x: -106, y: 104 },
  npm: { x: 59, y: 46 },
  illustrator: { x: -100, y: -69 },
  photoshop: { x: -235, y: 151 },
  axios: { x: -82, y: 241 },
  tanstack: { x: -37, y: 155 },
  gemini: { x: 268, y: 171 },
  jira: { x: 81, y: 218 },
  "react-router": { x: 184, y: 356 },
  mui: { x: -62, y: -31 },
};
