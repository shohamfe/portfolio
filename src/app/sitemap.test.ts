import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { CASE_STUDY_PAGES } from "@/constants/caseStudyPages";
import { absoluteUrl, SITE_PAGES, SITE_URL } from "@/constants/site";

describe("sitemap", () => {
  it("includes every site page exactly once, as an absolute URL", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toEqual([
      ...SITE_PAGES.map((page) => absoluteUrl(page.href)),
      ...CASE_STUDY_PAGES.map((page) => absoluteUrl(page.href)),
    ]);

    urls.forEach((url) => {
      expect(() => new URL(url)).not.toThrow();
      expect(url).toMatch(/^https?:\/\//);
    });
  });

  it("lists every case study detail route exactly once, as an absolute URL", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(CASE_STUDY_PAGES.length).toBeGreaterThan(0);

    CASE_STUDY_PAGES.forEach((page) => {
      const url = absoluteUrl(page.href);

      expect(url).toBe(`${SITE_URL}${page.href}`);
      expect(urls.filter((entry) => entry === url)).toHaveLength(1);
    });
  });

  it("gives every entry a priority within the 0-1 range", () => {
    sitemap().forEach((entry) => {
      expect(entry.priority).toBeTypeOf("number");
      expect(entry.priority).toBeGreaterThanOrEqual(0);
      expect(entry.priority).toBeLessThanOrEqual(1);
    });
  });

  it("declares a valid lastModified date for every entry", () => {
    sitemap().forEach((entry) => {
      const lastModified = entry.lastModified;

      expect(typeof lastModified).toBe("string");
      expect(Number.isNaN(new Date(lastModified as string).getTime())).toBe(
        false,
      );
    });
  });

  it("keeps lastModified stable across calls rather than generating it at build time", () => {
    const firstCall = sitemap().map((entry) => entry.lastModified);
    const secondCall = sitemap().map((entry) => entry.lastModified);

    expect(secondCall).toEqual(firstCall);
  });

  it("declares a changeFrequency for every entry", () => {
    sitemap().forEach((entry) => {
      expect(entry.changeFrequency).toBeTruthy();
    });
  });
});
