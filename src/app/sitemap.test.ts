import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { absoluteUrl, SITE_PAGES } from "@/constants/site";

describe("sitemap", () => {
  it("includes every site page exactly once, as an absolute URL", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toEqual(SITE_PAGES.map((page) => absoluteUrl(page.href)));

    urls.forEach((url) => {
      expect(() => new URL(url)).not.toThrow();
      expect(url).toMatch(/^https?:\/\//);
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
