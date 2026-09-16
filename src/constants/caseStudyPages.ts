import { CASE_STUDY_PROJECTS } from "@/content/caseStudy";
import { PROJECT_DETAILS } from "@/content/projectDetail";

export const CASE_STUDY_INDEX_HREF = "/case-study";

export interface CaseStudyPage {
  slug: string;
  href: string;
  label: string;
  summary: string;
}

export const caseStudyHref = (slug: string): string =>
  `${CASE_STUDY_INDEX_HREF}/${slug}`;

/** Derived from the content rather than hand-listed, so a new project cannot be
 *  added without also reaching the sitemap, llms.txt and the markdown routes. */
export const CASE_STUDY_PAGES: readonly CaseStudyPage[] =
  CASE_STUDY_PROJECTS.filter((project) => project.id in PROJECT_DETAILS).map(
    (project) => ({
      slug: project.id,
      href: caseStudyHref(project.id),
      label: project.title,
      summary: project.blurb,
    }),
  );

export const findCaseStudyPage = (slug: string): CaseStudyPage | null =>
  CASE_STUDY_PAGES.find((page) => page.slug === slug) ?? null;
