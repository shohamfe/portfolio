import { findCaseStudyPage } from "@/constants/caseStudyPages";
import { SITE_PAGES } from "@/constants/site";
import {
  MARKDOWN_EXTENSION,
  MARKDOWN_ROUTE_PREFIX,
  ROOT_MARKDOWN_SLUG,
} from "@/lib/markdown/constants";

export type SitePageHref = (typeof SITE_PAGES)[number]["href"];

/** A site page and a case study resolve to different generators, so the route
 *  layer hands back which one it found rather than a bare href. */
export type MarkdownTarget =
  { kind: "page"; href: SitePageHref } | { kind: "caseStudy"; slug: string };

const HOME_HREF = "/";

const CASE_STUDY_SEGMENT = "case-study";

const isSitePageHref = (href: string): href is SitePageHref =>
  SITE_PAGES.some((page) => page.href === href);

/** `/` has no usable `.md` sibling, so the root's markdown lives at `/index.md`. */
export const markdownUrlPath = (href: string): string =>
  href === HOME_HREF
    ? `/${ROOT_MARKDOWN_SLUG}${MARKDOWN_EXTENSION}`
    : `${href}${MARKDOWN_EXTENSION}`;

export const markdownHandlerPath = (href: string): string =>
  href === HOME_HREF
    ? MARKDOWN_ROUTE_PREFIX
    : `${MARKDOWN_ROUTE_PREFIX}${href}`;

/** Strips the `.md` suffix from a sibling URL so one handler serves both it and
 *  the negotiated canonical URL. */
export const hrefFromMarkdownUrlPath = (pathname: string): string => {
  const withoutExtension = pathname.slice(0, -MARKDOWN_EXTENSION.length);

  return withoutExtension === `/${ROOT_MARKDOWN_SLUG}`
    ? HOME_HREF
    : withoutExtension;
};

/** Resolves the catch-all segments the route handler receives back to a site
 *  route, or `null` when nothing on this site answers to it. */
export const resolveMarkdownTarget = (
  slugSegments: readonly string[],
): MarkdownTarget | null => {
  const joined = slugSegments.join("/");

  if (joined.length === 0 || joined === ROOT_MARKDOWN_SLUG) {
    return { kind: "page", href: HOME_HREF };
  }

  if (slugSegments.length === 2 && slugSegments[0] === CASE_STUDY_SEGMENT) {
    const caseStudyPage = findCaseStudyPage(slugSegments[1]);

    return caseStudyPage
      ? { kind: "caseStudy", slug: caseStudyPage.slug }
      : null;
  }

  const href = `/${joined}`;

  return isSitePageHref(href) ? { kind: "page", href } : null;
};
