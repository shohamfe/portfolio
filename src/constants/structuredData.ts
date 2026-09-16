import { absoluteUrl, SITE, SITE_PAGES } from "@/constants/site";

export const SCHEMA_CONTEXT = "https://schema.org";

export const SCHEMA_LANGUAGE = "en";

/** Matches what the contact page promises about correspondence. */
export const SCHEMA_KNOWN_LANGUAGES = ["en", "he"] as const;

/** Stable node identifiers so every page can reference the same Person and
 *  WebSite instead of repeating them. */
export const SCHEMA_IDS = {
  person: absoluteUrl("/#person"),
  webSite: absoluteUrl("/#website"),
} as const;

export const getWebPageId = (path: string) =>
  `${absoluteUrl(path)}#${path === "/" ? "profilepage" : "webpage"}`;

export const getBreadcrumbId = (path: string) =>
  `${absoluteUrl(path)}#breadcrumb`;

export const HOME_BREADCRUMB_LABEL = "Home";

export const getPageLabel = (path: string): string =>
  SITE_PAGES.find((page) => page.href === path)?.label ?? SITE.name;
