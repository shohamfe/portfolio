import { absoluteUrl, SITE_PAGES } from "@/constants/site";
import {
  asDocument,
  heading,
  joinBlocks,
  linkListItem,
} from "@/lib/markdown/markdownFormat";
import { markdownUrlPath } from "@/lib/markdown/markdownRoutes";

const OTHER_PAGES_HEADING = "Elsewhere on this site";
const SOURCES_HEADING = "Machine-readable sources";

const summaryFor = (href: string): string | null =>
  SITE_PAGES.find((page) => page.href === href)?.summary ?? null;

const otherPagesBlock = (currentHref: string): string => {
  const links = SITE_PAGES.filter((page) => page.href !== currentHref).map(
    (page) => linkListItem(page.label, page.href, page.summary),
  );

  return joinBlocks([heading(2, OTHER_PAGES_HEADING), links.join("\n")]);
};

const sourcesBlock = (currentHref: string): string => {
  const sources = [
    linkListItem(
      "This page as HTML",
      currentHref,
      "The same content rendered for browsers.",
    ),
    linkListItem(
      "This page as markdown",
      markdownUrlPath(currentHref),
      "Stable markdown URL, served regardless of the Accept header.",
    ),
    linkListItem(
      "llms.txt",
      "/llms.txt",
      "Site overview and the full list of pages.",
    ),
    linkListItem("sitemap.xml", "/sitemap.xml", "Every indexable URL."),
  ];

  return joinBlocks([heading(2, SOURCES_HEADING), sources.join("\n")]);
};

/** Wraps a page's own blocks in the H1, its sitemap summary, and the navigation
 *  footer every markdown representation shares. */
export const buildMarkdownDocument = ({
  href,
  title,
  lede,
  blocks,
}: {
  href: string;
  title: string;
  lede?: string | null;
  blocks: readonly (string | null)[];
}): string =>
  asDocument([
    heading(1, title),
    lede ? `_${lede}_` : null,
    summaryFor(href),
    ...blocks,
    otherPagesBlock(href),
    sourcesBlock(href),
    "---",
    `Canonical HTML: ${absoluteUrl(href)}`,
  ]);
