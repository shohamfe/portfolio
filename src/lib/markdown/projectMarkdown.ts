import { CASE_STUDY_PAGES, caseStudyHref } from "@/constants/caseStudyPages";
import { SITE } from "@/constants/site";
import type { CaseStudyProject } from "@/content/caseStudy";
import {
  getProject,
  PROJECT_DETAILS,
  type ProjectDecision,
  type ProjectDetail,
  type ProjectEvidenceItem,
  type ProjectProseSection,
} from "@/content/projectDetail";
import { buildMarkdownDocument } from "@/lib/markdown/documentFrame";
import {
  bulletList,
  definition,
  heading,
  joinBlocks,
  link,
  linkListItem,
} from "@/lib/markdown/markdownFormat";

/** The project list uses "#" for a link that does not exist yet. */
const PLACEHOLDER_HREF = "#";

const DECISIONS_HEADING_LEVEL = 3;
const OTHER_CASE_STUDIES_HEADING = "Other case studies";

export const projectFactsList = (project: CaseStudyProject): string =>
  bulletList([
    definition("Context", project.meta),
    definition("Role", project.role),
    definition("Tech", project.tech.join(", ")),
    ...(project.link.href === PLACEHOLDER_HREF
      ? []
      : [definition("Link", link(project.link.label, project.link.href))]),
  ]);

const proseSection = (section: ProjectProseSection): string =>
  joinBlocks([
    heading(2, section.title),
    ...section.paragraphs,
    section.note ?? null,
  ]);

const decisionBlock = (decision: ProjectDecision): string =>
  joinBlocks([
    heading(DECISIONS_HEADING_LEVEL, decision.title),
    bulletList([
      definition("Constraint", decision.constraint),
      definition("Decision", decision.decision),
      definition("Trade-off", decision.tradeOff),
    ]),
  ]);

const decisionsSection = (detail: ProjectDetail): string =>
  joinBlocks([
    heading(2, detail.decisions.title),
    ...detail.decisions.items.map(decisionBlock),
  ]);

const evidenceItem = (item: ProjectEvidenceItem): string => {
  const source = item.video ?? item.image;

  return source ? linkListItem(item.caption, source) : `- ${item.caption}`;
};

const evidenceSection = (detail: ProjectDetail): string =>
  joinBlocks([
    heading(2, detail.evidence.title),
    detail.evidence.intro,
    detail.evidence.items.map(evidenceItem).join("\n"),
  ]);

const otherCaseStudiesSection = (slug: string): string =>
  joinBlocks([
    heading(2, OTHER_CASE_STUDIES_HEADING),
    CASE_STUDY_PAGES.filter((page) => page.slug !== slug)
      .map((page) => linkListItem(page.label, page.href, page.summary))
      .join("\n"),
  ]);

export const buildProjectMarkdown = (slug: string): string | null => {
  const project = getProject(slug);
  const detail = PROJECT_DETAILS[slug];

  if (!project || !detail) return null;

  return buildMarkdownDocument({
    href: caseStudyHref(slug),
    title: `${project.title} - ${SITE.name}`,
    lede: detail.eyebrow,
    blocks: [
      project.blurb,
      projectFactsList(project),
      `_${detail.visual.note}_`,
      proseSection(detail.stakes),
      proseSection(detail.role),
      proseSection(detail.problem),
      decisionsSection(detail),
      evidenceSection(detail),
      proseSection(detail.outcome),
      proseSection(detail.whatIdChange),
      otherCaseStudiesSection(slug),
    ],
  });
};
