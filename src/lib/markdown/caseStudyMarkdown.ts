import {
  CASE_STUDY_INDEX_HREF,
  findCaseStudyPage,
} from "@/constants/caseStudyPages";
import { SITE } from "@/constants/site";
import {
  CASE_STUDY_INTRO,
  CASE_STUDY_PROJECTS,
  CASE_STUDY_THREADS,
  COMMON_THREAD_INTRO,
  type CaseStudyProject,
} from "@/content/caseStudy";
import { buildMarkdownDocument } from "@/lib/markdown/documentFrame";
import {
  bulletList,
  definition,
  heading,
  joinBlocks,
  linkListItem,
} from "@/lib/markdown/markdownFormat";
import { projectFactsList } from "@/lib/markdown/projectMarkdown";

const FULL_CASE_STUDY_LABEL = "Full case study";
const FULL_CASE_STUDY_NOTE =
  "The stakes, the decisions behind it, their trade-offs, and what I would change.";

const introSection = (): string =>
  joinBlocks([
    heading(2, CASE_STUDY_INTRO.title),
    CASE_STUDY_INTRO.lines.join(" "),
  ]);

const projectSection = (project: CaseStudyProject): string => {
  const caseStudyPage = findCaseStudyPage(project.id);

  const facts = caseStudyPage
    ? [
        projectFactsList(project),
        linkListItem(
          FULL_CASE_STUDY_LABEL,
          caseStudyPage.href,
          FULL_CASE_STUDY_NOTE,
        ),
      ].join("\n")
    : projectFactsList(project);

  return joinBlocks([heading(2, project.title), project.blurb, facts]);
};

const threadsSection = (): string =>
  joinBlocks([
    heading(2, COMMON_THREAD_INTRO.title),
    COMMON_THREAD_INTRO.body,
    bulletList(
      CASE_STUDY_THREADS.map((thread) => definition(thread.title, thread.body)),
    ),
  ]);

export const buildCaseStudyMarkdown = (): string =>
  buildMarkdownDocument({
    href: CASE_STUDY_INDEX_HREF,
    title: `Case Study - ${SITE.name}`,
    blocks: [
      introSection(),
      ...CASE_STUDY_PROJECTS.map(projectSection),
      threadsSection(),
    ],
  });
