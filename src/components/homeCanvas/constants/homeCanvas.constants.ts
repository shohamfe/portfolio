import { KEYBOARD_NUDGE } from "@/constants/canvas";
import type { Offset } from "../types/homeCanvas.types";

export const ARROW_DELTAS: Record<string, Offset> = {
  ArrowUp: { x: 0, y: -KEYBOARD_NUDGE },
  ArrowDown: { x: 0, y: KEYBOARD_NUDGE },
  ArrowLeft: { x: -KEYBOARD_NUDGE, y: 0 },
  ArrowRight: { x: KEYBOARD_NUDGE, y: 0 },
};

export const HINT_DURATION_MS = 10000;
export const FADE_MS = 300;
