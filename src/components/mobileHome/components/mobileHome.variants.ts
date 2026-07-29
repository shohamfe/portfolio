/** Full-screen column: a fixed header, a scrolling body, then the sheet and
 *  nav floating on top. Plain white, unlike the desktop pages' dotted
 *  backdrop - the mobile design puts the dot pattern on the sheet instead,
 *  per the Figma update. */
export const mobileRoot = "relative flex min-h-0 flex-1 flex-col overflow-hidden bg-white";

/** Name, role and tagline - stays put above the scrolling bio sections,
 *  mirroring desktop's introFixed/introScroll split. Top padding clears the
 *  status-bar safe area, since the page opts into viewport-fit=cover. */
export const heroFixed =
  "flex shrink-0 flex-col gap-3 px-5 pb-4 [padding-top:calc(env(safe-area-inset-top)+1.5rem)]";

export const heroHeader = "flex flex-col gap-1";

/** mobileHeading, inlined rather than imported: matches bioHeading below and
 *  bottomSheet's sheetTitle by shared design decision, not by a hierarchy
 *  between these files. */
export const heroName = "font-display text-[24px] font-extrabold leading-none text-black";

export const heroRole = "font-display text-[16px] leading-none text-text-strong";

export const heroTagline = "font-code text-[13px] text-text-muted";

export const heroDivider = "border-border-subtle";

/** The only scrolling region - just the bio sections, since the hero header
 *  lives outside it now. overflow-x-hidden is a backstop alongside sizing
 *  every heading for a 375px frame, matching the same pattern the desktop
 *  Resume stage already uses for its own scroller.
 *
 *  No top padding here deliberately - Home and Resume need different
 *  amounts (Home just a small gap below its own fixed header; Resume the
 *  full safe-area clearance, since it has no header of its own), and
 *  tailwind-merge does not reliably dedupe a `pt-*` utility against an
 *  arbitrary `[padding-top:...]` bracket value layered on top of it - both
 *  landed in the class list and the plain utility won the cascade regardless
 *  of source order. Each page supplies its own instead. */
export const mobileScroll = "flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto overflow-x-hidden px-5";

export const bioSections = "flex flex-col gap-4";

export const bioSection = "flex flex-col gap-2";

export const bioHeader = "flex flex-col items-start gap-1";

export const bioHeading = "font-display text-[24px] font-extrabold text-black";

export const bioList = "list-disc pl-5 font-ui text-small text-text-strong marker:text-default-400";

export const bioParagraph = "font-ui text-small text-text-muted";
