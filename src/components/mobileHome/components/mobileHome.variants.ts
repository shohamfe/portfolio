/** Full-screen column: a fixed header, a scrolling body, then the sheet and
 *  nav floating on top. Plain white, unlike the desktop pages' dotted
 *  backdrop - the mobile design puts the dot pattern on the sheet instead,
 *  per the Figma update.
 *
 *  The bottom padding is what keeps content clear of the collapsed sheet,
 *  and it lives HERE, on the non-scrolling parent, rather than on the scroll
 *  region itself. Padding on a `flex-col` + `overflow-y-auto` box is not
 *  counted in its scroll extent on iOS Safari: scrollHeight equals
 *  clientHeight, so the page cannot scroll at all, and whatever content runs
 *  past the sheet's top edge is simply unreachable. Shortening the parent's
 *  content box instead means the flex-1 scroll region ends exactly at the
 *  collapsed sheet's top edge, so overflow is real, scrolling works, and
 *  nothing ever sits behind the sheet.
 *
 *  160px is the sheet's own collapsed peek - NAV_FOOTPRINT (104) +
 *  SHEET_PEEK_GAP (40) from constants/mobile - plus 16px of reading gap, so
 *  the last line of copy stops short of the sheet's top border rather than
 *  ending flush against it. Hardcoded because a Tailwind class has to be a
 *  static string; keep the 144 in sync with those two constants if either
 *  changes. The safe-area inset is added on top, matching how useSheetDrag
 *  computes the same peek. */
export const mobileRoot =
  "relative flex min-h-0 flex-1 flex-col overflow-hidden bg-white [padding-bottom:calc(env(safe-area-inset-bottom)+160px)]";

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
