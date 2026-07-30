import { KEYBOARD_NUDGE } from "@/constants/canvas";
import type { Offset } from "../types/homeCanvas.types";

export const ARROW_DELTAS: Record<string, Offset> = {
  ArrowUp: { x: 0, y: -KEYBOARD_NUDGE },
  ArrowDown: { x: 0, y: KEYBOARD_NUDGE },
  ArrowLeft: { x: -KEYBOARD_NUDGE, y: 0 },
  ArrowRight: { x: KEYBOARD_NUDGE, y: 0 },
};

export const TUTORIAL_STORAGE_KEY = "portfolio:tutorial-canvas-seen";

/** The folder that stays lit during stage 1 of the walkthrough. */
export const TUTORIAL_STAGE1_FOLDER_ID = "react";

export const TUTORIAL_STAGE_1 = {
  label: "Drag me around",
  ariaText:
    "Tutorial: the React folder can be dragged with a mouse, touch, or arrow keys.",
};

export const TUTORIAL_STAGE_2 = {
  label: "The whole canvas drags too",
  ariaText:
    "Tutorial: the canvas background can also be dragged to pan the view.",
};
