import {
  LLMS_TXT_ELSEWHERE_HEADING,
  LLMS_TXT_ELSEWHERE_LINKS,
  LLMS_TXT_INTRO_PARAGRAPHS,
  LLMS_TXT_PAGES_HEADING,
} from "@/constants/llmsTxt";
import { absoluteUrl, SITE, SITE_PAGES } from "@/constants/site";

const linkLine = (label: string, url: string, note: string): string =>
  `- [${label}](${url}): ${note}`;

/** Follows the llms.txt v2 grammar (https://llmstxt.org): H1, summary blockquote,
 *  headingless guidance, then H2 sections that hold nothing but link lists. */
export const buildLlmsTxt = (): string => {
  const heading = `# ${SITE.name}`;

  const summary = `> ${SITE.description}`;

  const pageLinks = SITE_PAGES.map((page) =>
    linkLine(page.label, absoluteUrl(page.href), page.summary),
  );

  const elsewhereLinks = LLMS_TXT_ELSEWHERE_LINKS.map((link) =>
    linkLine(link.label, link.url, link.note),
  );

  const blocks = [
    heading,
    summary,
    ...LLMS_TXT_INTRO_PARAGRAPHS,
    `## ${LLMS_TXT_PAGES_HEADING}\n${pageLinks.join("\n")}`,
    `## ${LLMS_TXT_ELSEWHERE_HEADING}\n${elsewhereLinks.join("\n")}`,
  ];

  return `${blocks.join("\n\n")}\n`;
};
