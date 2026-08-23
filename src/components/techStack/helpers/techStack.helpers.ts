const NON_BREAKING_SPACE = "\u00A0";

/** Keeps a two-word name from wrapping across its brackets. */
export const formatTechName = (technology: string): string =>
  `[${technology.replaceAll(" ", NON_BREAKING_SPACE)}]`;
