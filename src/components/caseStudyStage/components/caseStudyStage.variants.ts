import {
  contentInset,
  scrollerFullBleed,
} from "@/components/scrollStage/components/scrollStage.variants";
import { cn } from "@/lib/cn";
import { PAGE_SURFACE } from "@/lib/variants";

/** Only what differs from the shared ScrollStage shell: the list page keeps
 *  a right-hand gutter so the dot grid stays visible beside the cards. */
export const stageRootOverrides = cn(
  PAGE_SURFACE,
  "lg:mr-[400px] 2xl:mr-[600px]",
);

export const stageScrollerOverrides = cn(scrollerFullBleed, "pr-10 pb-8");

export const contentRoot = cn(
  "flex w-full flex-col items-start gap-8",
  contentInset,
);

export const introGroup = "flex w-full flex-col items-start gap-2";

export const introGroupSpaced = "pt-8";

export const introTitle =
  "font-display text-[24px] font-extrabold text-text-strong lg:text-h2";

export const introLines =
  "flex flex-col font-display text-[24px] leading-normal font-bold text-text-strong lg:text-[32px]";

export const projectGrid = "grid w-full grid-cols-2 gap-4";

export const threadRow = "flex w-full items-stretch gap-4";

export const threadNoteOverrides = "w-full flex-1";

export const threadNoteCard = "h-full w-full";

export const threadNoteTitle = "font-body text-base font-bold text-text-strong";

export const threadNoteBody = "font-ui text-small text-text-muted";
