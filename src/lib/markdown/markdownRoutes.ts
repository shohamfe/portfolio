import { SITE_PAGES } from "@/constants/site";
import {
  MARKDOWN_EXTENSION,
  MARKDOWN_ROUTE_PREFIX,
  ROOT_MARKDOWN_SLUG,
} from "@/lib/markdown/constants";

export type SitePageHref = (typeof SITE_PAGES)[number]["href"];

const HOME_HREF = "/";

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
export const resolveSitePageHref = (
  slugSegments: readonly string[],
): SitePageHref | null => {
  const joined = slugSegments.join("/");

  if (joined.length === 0 || joined === ROOT_MARKDOWN_SLUG) return HOME_HREF;

  const href = `/${joined}`;

  return isSitePageHref(href) ? href : null;
};
