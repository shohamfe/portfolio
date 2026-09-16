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
  "/case-study": "2026-09-16",
  "/privacy": "2026-09-16",
};

export const PAGE_CHANGE_FREQUENCY: Record<SitePageHref, ChangeFrequency> = {
  "/": "monthly",
  "/resume": "monthly",
  "/about": "yearly",
  "/contact": "yearly",
  "/case-study": "monthly",
  "/privacy": "yearly",
};

/** The detail routes are derived from the project list, so they cannot be keyed
 *  by a literal href union the way the fixed pages are. They ship as one set and
 *  share a single hand-maintained date, which keeps the build clock out of it
 *  while still making a new project impossible to miss. */
export const CASE_STUDY_LAST_MODIFIED = "2026-09-16";

export const CASE_STUDY_CHANGE_FREQUENCY: ChangeFrequency = "monthly";

export const CASE_STUDY_PRIORITY = 0.8;
