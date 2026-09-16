import { PRESSABLE } from "@/lib/variants";

/** `visible` is load-bearing: the pre-hydration script in the root layout
 *  hides <html> on mobile widths, and only ViewportSwitch clears it - these
 *  pages have no mobile variant to switch to, so they opt back in via CSS. */
export const proseRoot = "visible min-h-0 flex-1 overflow-y-auto";

export const proseContainer =
  "mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 py-12 lg:px-10";

export const proseHeader = "flex flex-col gap-4";

export const proseBackLink = `${PRESSABLE} inline-flex w-fit items-center gap-2 font-ui text-small text-text-muted hover:text-accent`;

export const proseTitle =
  "font-display text-h2 font-extrabold text-text-strong lg:text-h1";

export const proseLede = "font-code text-code text-text-muted";

export const proseSections = "flex flex-col gap-10";

export const proseSection = "flex flex-col gap-3";

export const proseHeading = "font-display text-h5 text-text-strong";

export const proseParagraph = "font-body text-body text-text-muted";

export const proseList =
  "flex list-disc flex-col gap-2 pl-5 font-body text-body text-text-muted marker:text-default-400";

export const proseLinkList = "flex flex-col gap-2 font-body text-body";

export const proseLink = `${PRESSABLE} w-fit text-accent underline underline-offset-4 hover:text-primary-300`;

export const proseLinkDescription = "font-body text-small text-text-muted";

export const proseFootnote = "font-code text-small text-text-muted";
