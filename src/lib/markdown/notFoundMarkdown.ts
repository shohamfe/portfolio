import { ALL_INDEXABLE_PAGES } from "@/constants/pages";
import { absoluteUrl, SITE } from "@/constants/site";
import {
  asDocument,
  heading,
  joinBlocks,
  linkListItem,
} from "@/lib/markdown/markdownFormat";
import { markdownUrlPath } from "@/lib/markdown/markdownRoutes";

const NOT_FOUND_TITLE = "404 - Page not found";
const PAGES_HEADING = "Every page on this site";
const SOURCES_HEADING = "Machine-readable sources";

const introFor = (requestedPath: string | null): string =>
  requestedPath
    ? `There is no page at \`${requestedPath}\` on ${SITE.name}'s site. Nothing was moved - this URL has never existed. The complete list of pages is below.`
    : `That page does not exist on ${SITE.name}'s site. The complete list of pages is below.`;

const pagesBlock = (): string =>
  joinBlocks([
    heading(2, PAGES_HEADING),
    ALL_INDEXABLE_PAGES.map((page) =>
      linkListItem(page.label, page.href, page.summary),
    ).join("\n"),
  ]);

const sourcesBlock = (): string =>
  joinBlocks([
    heading(2, SOURCES_HEADING),
    [
      linkListItem(
        "sitemap.xml",
        "/sitemap.xml",
        "Every indexable URL, with last-modified dates.",
      ),
      linkListItem(
        "llms.txt",
        "/llms.txt",
        "Site overview written for agents, with a description of each page.",
      ),
      linkListItem(
        "robots.txt",
        "/robots.txt",
        "Crawl rules and the sitemap pointer.",
      ),
    ].join("\n"),
    `Every page is also available as markdown: request it with \`Accept: text/markdown\`, or append \`.md\` to the path (the site root is ${absoluteUrl(markdownUrlPath("/"))}).`,
  ]);

export const buildNotFoundMarkdown = (
  requestedPath: string | null = null,
): string =>
  asDocument([
    heading(1, NOT_FOUND_TITLE),
    introFor(requestedPath),
    pagesBlock(),
    sourcesBlock(),
  ]);
