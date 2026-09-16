import type { MetadataRoute } from "next";
import { CASE_STUDY_PAGES } from "@/constants/caseStudyPages";
import {
  CASE_STUDY_CHANGE_FREQUENCY,
  CASE_STUDY_LAST_MODIFIED,
  CASE_STUDY_PRIORITY,
  PAGE_CHANGE_FREQUENCY,
  PAGE_LAST_MODIFIED,
} from "@/constants/sitemap";
import { absoluteUrl, SITE_PAGES } from "@/constants/site";

const sitemap = (): MetadataRoute.Sitemap => {
  const pageEntries = SITE_PAGES.map((page) => ({
    url: absoluteUrl(page.href),
    lastModified: PAGE_LAST_MODIFIED[page.href],
    changeFrequency: PAGE_CHANGE_FREQUENCY[page.href],
    priority: page.priority,
  }));

  const caseStudyEntries = CASE_STUDY_PAGES.map((page) => ({
    url: absoluteUrl(page.href),
    lastModified: CASE_STUDY_LAST_MODIFIED,
    changeFrequency: CASE_STUDY_CHANGE_FREQUENCY,
    priority: CASE_STUDY_PRIORITY,
  }));

  return [...pageEntries, ...caseStudyEntries];
};

export default sitemap;
