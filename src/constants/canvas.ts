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
