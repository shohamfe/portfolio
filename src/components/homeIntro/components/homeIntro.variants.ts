/* The page's own padding moved here so the canvas can go edge to edge without
 * shifting the intro's visual position — main used to pad both children
 * uniformly, now each side carries its own inset. */
export const introRoot = "flex w-full flex-col gap-8 px-10 pb-12 pt-12 lg:max-w-lg lg:shrink-0";

export const introHeader = "flex flex-col gap-3";

export const introName = "font-display text-h1 font-bold text-text-strong";

export const introRole = "font-display text-h5 text-text-strong";

export const introTagline = "font-code text-code text-text-muted";

export const introDivider = "border-border-subtle";

export const introSection = "flex flex-col gap-2";

export const introSectionWide = "flex flex-col gap-3";

export const introHeading = "font-display text-h2 font-extrabold text-text-strong";

export const introList = "list-disc pl-5 font-body text-body text-text-muted marker:text-default-400";

export const introParagraph = "font-body text-body text-text-muted";
