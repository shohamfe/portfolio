import { KEYBOARD_NUDGE } from "@/constants/canvas";

export const TILT_RANGE_DEG = 26;

export const TILT_SPRING = { stiffness: 150, damping: 22, mass: 0.4 };

/** Keyboard equivalent for the card's mouse/touch drag gesture. */
export const ARROW_KEY_DELTAS: Record<string, { x: number; y: number }> = {
  ArrowUp: { x: 0, y: -KEYBOARD_NUDGE },
  ArrowDown: { x: 0, y: KEYBOARD_NUDGE },
  ArrowLeft: { x: -KEYBOARD_NUDGE, y: 0 },
  ArrowRight: { x: KEYBOARD_NUDGE, y: 0 },
};
