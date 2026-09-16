import type { MetadataRoute } from "next";
import { PAGE_CHANGE_FREQUENCY, PAGE_LAST_MODIFIED } from "@/constants/sitemap";
import { absoluteUrl, SITE_PAGES } from "@/constants/site";

const sitemap = (): MetadataRoute.Sitemap =>
  SITE_PAGES.map((page) => ({
    url: absoluteUrl(page.href),
    lastModified: PAGE_LAST_MODIFIED[page.href],
    changeFrequency: PAGE_CHANGE_FREQUENCY[page.href],
    priority: page.priority,
  }));

export default sitemap;
