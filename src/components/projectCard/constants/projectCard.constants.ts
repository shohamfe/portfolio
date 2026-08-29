export const PROJECT_CARD_IMAGE_SIZES =
  "(max-width: 1023px) 100vw, (max-width: 1535px) 55vw, 660px";

/** Colour of the cursor glow, per card accent. */
export const PROJECT_CARD_GLOW_COLORS = {
  blue: "var(--color-primary-300)",
  purple: "var(--color-secondary-300)",
  pink: "var(--color-danger-300)",
  yellow: "var(--color-warning-300)",
  green: "var(--color-success-300)",
} as const;
