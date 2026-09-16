import {
  contentInset,
  scrollerFullBleed,
} from "@/components/scrollStage/components/scrollStage.variants";
import { cn } from "@/lib/cn";
import { PAGE_SURFACE } from "@/lib/variants";

export const stageScrollerOverrides = scrollerFullBleed;

/** Spans the stage edge to edge, covering the page's dot grid from the bottom
 *  of the hero down. The hero itself gets no surface, which is what leaves it
 *  on the dots. */
export const bodySurface = PAGE_SURFACE;

export const sectionBleed = cn("w-full px-5 lg:pr-10", contentInset);

export const sectionInner = "w-full max-w-[1200px]";

/** Label column plus prose column, matching the design's 200px / 48px grid. */
export const sectionGrid =
  "grid grid-cols-1 gap-8 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12";

// Grid items stretch to row height by default, so self-start constrains the sticky item.
export const sectionLabel =
  "flex flex-col gap-1.5 lg:sticky lg:top-8 lg:self-start";

export const sectionIndex = "font-code text-small text-accent";

export const sectionTitle =
  "font-display text-[26px] leading-[1.1] font-bold text-text-strong lg:text-h2";

export const sectionProse = "flex max-w-[760px] flex-col gap-5";

export const proseLead =
  "text-body leading-[1.6] text-pretty text-text-strong lg:text-[20px]";

export const proseStrong =
  "text-body leading-[1.6] text-pretty text-text-strong";

export const proseMuted = "text-body leading-[1.6] text-pretty text-text-muted";

export const calloutRoot = "rounded-[10px] bg-primary-50 px-6 py-5";

export const calloutText = "text-[16px] leading-[1.5] text-text-strong";

export const calloutTag = "font-code text-accent";

export const calloutNote =
  "text-[16px] leading-[1.5] text-pretty text-text-muted";

export const heroRoot = "w-full pb-8 lg:pb-10";

export const heroBack =
  "-ml-3 mb-8 lg:mb-10 inline-flex w-fit items-center gap-2 rounded-full px-3 py-2 font-code text-small text-text-muted transition-colors hover:bg-accent/5 hover:text-accent";

export const heroHead = "flex max-w-[900px] flex-col gap-5";

export const heroEyebrow =
  "font-code text-tiny tracking-[0.12em] uppercase text-accent";

export const heroTitle =
  "font-display text-[36px] leading-[1.02] tracking-[-0.01em] font-bold text-text-strong sm:text-[44px] lg:text-h1";

export const heroMeta = "text-body text-text-muted";

export const heroHook =
  "mt-3 max-w-[760px] text-[20px] leading-[1.35] text-pretty text-text-strong lg:text-[28px]";

export const heroFacts =
  "mt-10 flex flex-wrap items-center gap-8 border-t border-solid border-border-subtle pt-7";

export const heroFactGroup = "flex flex-col gap-1.5";

export const heroFactLabel =
  "font-code text-tiny tracking-[0.08em] uppercase text-accent";

export const heroFactValue = "text-body text-text-strong";

export const heroFactCode = "font-code text-[16px] text-text-strong";

export const heroFactDivider =
  "hidden w-px self-stretch bg-border-subtle sm:block";

export const heroFactSpacer = "grow";

/** Shared by the hero window and the evidence cards, so a screenshot always
 *  lifts the same way whether it's the one big image or one of several. */
const hoverLift =
  "transition duration-300 ease-out hover:scale-[1.015] hover:shadow-logo-card";

export const windowRoot = `group overflow-hidden rounded-[14px] border border-solid border-border-subtle bg-surface-raised shadow-folder ${hoverLift}`;

export const windowBar =
  "flex items-center gap-2.5 border-b border-solid border-border-subtle bg-surface-page px-4 py-3";

export const windowDots = "flex gap-1.5";

export const windowDot =
  "size-2.5 rounded-full bg-default-300 transition-colors duration-300";

export const windowCaption = "font-code text-tiny text-text-muted";

export const windowBadge =
  "rounded-full border border-solid border-border-subtle px-2.5 py-1 font-code text-[11px] text-text-muted";

export const windowStage =
  "dot-grid relative flex items-center justify-center bg-surface-raised";

export const windowImage = "object-cover object-top";

export const placeholderBox =
  "flex flex-col items-center gap-2.5 rounded-[10px] border border-dashed border-border-subtle bg-surface-raised px-8 py-6 text-center";

export const placeholderLabel = "font-code text-[13px] text-text-muted";

export const placeholderNote = "text-small text-text-muted";

export const visualNote = "mt-3 text-small text-text-muted";

export const decisionList = "flex flex-col gap-5";

export const decisionCard =
  "rounded-xl border border-solid border-border-subtle bg-surface-raised p-6 lg:p-8";

export const decisionTitle =
  "mb-6 font-display text-[20px] leading-[1.2] font-semibold text-text-strong lg:text-[24px]";

export const decisionGrid =
  "grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-[130px_minmax(0,1fr)]";

export const decisionTerm =
  "pt-1 font-code text-tiny tracking-[0.08em] uppercase text-text-muted";

export const decisionTermAccent =
  "pt-1 font-code text-tiny tracking-[0.08em] uppercase text-accent";

export const decisionValue = "text-body leading-[1.6] text-text-strong";

export const decisionTradeOff = "text-body leading-[1.6] text-text-muted";

export const evidenceColumn = "flex flex-col gap-6";

export const evidenceIntro =
  "max-w-[760px] text-body leading-[1.6] text-pretty text-text-muted";

export const evidenceGrid = "grid grid-cols-1 gap-6 md:grid-cols-2";

export const evidenceCard = `group overflow-hidden rounded-xl border border-solid border-border-subtle bg-surface-raised ${hoverLift}`;

export const evidenceStage =
  "dot-grid relative flex h-65 items-center justify-center bg-surface-raised";

export const evidenceCaption =
  "border-t border-solid border-border-subtle px-5 py-4 text-small text-text-muted";

export const pagerCardRoot =
  "mt-24 w-full border-t border-solid border-border-subtle bg-surface-raised";

export const pagerBarRoot = "w-full border-b border-solid border-border-subtle";

export const pagerRow = "flex items-stretch";

export const pagerTile =
  "group flex min-w-0 flex-1 items-center gap-4 bg-transparent transition-colors duration-150 hover:bg-primary-50 active:bg-primary-300/40 focus-visible:bg-primary-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent";

export const pagerTilePaddingCard = "py-8 lg:py-10";

export const pagerTilePaddingBar = "py-4";

export const pagerTilePrevious = "justify-start pr-4";

export const pagerTileNext = "justify-end pl-4 text-right";

export const pagerDivider = "w-px shrink-0 self-stretch bg-border-subtle";

export const pagerArrow =
  "shrink-0 text-2xl text-text-muted transition-colors group-hover:text-accent";

export const pagerLabel =
  "font-code text-tiny tracking-[0.08em] uppercase text-text-muted";

export const pagerTitle =
  "min-w-0 truncate font-display text-[20px] font-semibold text-text-strong transition-colors group-hover:text-accent lg:text-[24px]";
