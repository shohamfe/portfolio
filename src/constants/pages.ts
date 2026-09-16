import { CASE_STUDY_PAGES } from "@/constants/caseStudyPages";
import { SITE_PAGES } from "@/constants/site";

export interface IndexablePage {
  href: string;
  label: string;
  summary: string;
}

/** SITE_PAGES plus the case study routes it excludes to stay a closed key set. */
export const ALL_INDEXABLE_PAGES: readonly IndexablePage[] = [
  ...SITE_PAGES.map(({ href, label, summary }) => ({ href, label, summary })),
  ...CASE_STUDY_PAGES.map(({ href, label, summary }) => ({
    href,
    label,
    summary,
  })),
];
