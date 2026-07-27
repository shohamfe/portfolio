/** A blinking cursor. animate-pulse is a fade blink rather than a true hard
 *  on/off blink, but it is a built-in Tailwind keyframe, so it is already
 *  correctly paused under prefers-reduced-motion by the global media rule
 *  with no extra work here. */
export const typewriterCursor = "animate-pulse";

/** sr-only: screen readers get the first word once, as plain static text,
 *  instead of the animated span re-announcing on every keystroke. */
export const typewriterSrOnly = "sr-only";
