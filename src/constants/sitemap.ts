import type { MetadataRoute } from "next";
import { SITE_PAGES } from "@/constants/site";

type SitePageHref = (typeof SITE_PAGES)[number]["href"];

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

/** Declared per page and bumped by hand when that page's content actually changes.
 *  A build-time `new Date()` would mark every URL as freshly modified on every deploy. */
export const PAGE_LAST_MODIFIED: Record<SitePageHref, string> = {
  "/": "2026-09-16",
  "/resume": "2026-09-16",
  "/about": "2026-09-16",
  "/contact": "2026-09-16",
  "/portfolio": "2026-09-16",
  "/privacy": "2026-09-16",
};

export const PAGE_CHANGE_FREQUENCY: Record<SitePageHref, ChangeFrequency> = {
  "/": "monthly",
  "/resume": "monthly",
  "/about": "yearly",
  "/contact": "yearly",
  "/portfolio": "monthly",
  "/privacy": "yearly",
};
