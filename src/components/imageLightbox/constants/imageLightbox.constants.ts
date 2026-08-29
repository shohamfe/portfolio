export const LIGHTBOX_TRANSITION = { duration: 0.25, ease: "easeOut" } as const;

/** The reference's "Default" glass preset - refraction, chromatic
 *  aberration, bubble clarity, edge glow and liquid flow all at 1.0. */
export const GLASS_UNIFORM_DEFAULTS = {
  refractionStrength: 1.0,
  chromaticAberration: 1.0,
  bubbleClarity: 1.0,
  edgeGlow: 1.0,
  liquidFlow: 1.0,
} as const;

/** How long a next/previous crossfade takes to sweep across the frame. */
export const GLASS_TRANSITION_DURATION_S = 1.1;
