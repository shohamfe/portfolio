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
 *  as anything a user drags themselves - the two compose the same way. */
export const DEFAULT_FOLDER_OFFSETS: Readonly<
  Record<string, { x: number; y: number }>
> = {
  react: { x: 659, y: 637 },
  css3: { x: -136, y: -630 },
  html5: { x: 595, y: -487 },
  typescript: { x: 14, y: -40 },
  javascript: { x: -241, y: 529 },
  nodejs: { x: 36, y: 350 },
  github: { x: -333, y: 585 },
  aws: { x: 99, y: -453 },
  figma: { x: -412, y: -40 },
  claude: { x: -166, y: -146 },
  npm: { x: 293, y: 65 },
  illustrator: { x: -17, y: -10 },
  photoshop: { x: -125, y: 241 },
  axios: { x: 3, y: 174 },
  tanstack: { x: 67, y: 274 },
  gemini: { x: -104, y: 295 },
  jira: { x: 376, y: 416 },
  "react-router": { x: 348, y: -16 },
  mui: { x: 219, y: 131 },
  nextjs: { x: -633, y: -555 },
  tailwind: { x: -424, y: -1047 },
  mongodb: { x: 756, y: -1069 },
  vite: { x: 780, y: -1244 },
  vitest: { x: 259, y: -684 },
  framer: { x: -1185, y: -1196 },
};
