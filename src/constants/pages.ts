import { CASE_STUDY_PAGES } from "@/constants/caseStudyPages";
import { SITE_PAGES } from "@/constants/site";

export interface IndexablePage {
  href: string;
  label: string;
  summary: string;
}

/** Everything a guessed URL can be recovered to. SITE_PAGES alone is not that
 *  set: the case study routes are kept out of it so the records keyed on it
 *  stay exhaustive, but they are indexable and belong in both 404s. */
export const ALL_INDEXABLE_PAGES: readonly IndexablePage[] = [
  ...SITE_PAGES.map(({ href, label, summary }) => ({ href, label, summary })),
  ...CASE_STUDY_PAGES.map(({ href, label, summary }) => ({
    href,
    label,
    summary,
  })),
];
