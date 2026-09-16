import { describe, expect, it } from "vitest";
import { SITE_PAGES, absoluteUrl } from "@/constants/site";
import { buildNotFoundMarkdown } from "@/lib/markdown/notFoundMarkdown";

describe("buildNotFoundMarkdown", () => {
  it("points an agent at the sitemap and llms.txt", () => {
    const markdown = buildNotFoundMarkdown("/missing");

    expect(markdown).toContain(absoluteUrl("/sitemap.xml"));
    expect(markdown).toContain(absoluteUrl("/llms.txt"));
  });

  it("opens with a single H1 that says what happened", () => {
    const markdown = buildNotFoundMarkdown("/missing");

    expect(markdown.startsWith("# 404 - Page not found")).toBe(true);
    expect(
      markdown.split("\n").filter((line) => line.startsWith("# ")),
    ).toHaveLength(1);
  });

  it("lists every page on the site so the agent can recover", () => {
    const markdown = buildNotFoundMarkdown("/missing");

    for (const page of SITE_PAGES) {
      expect(markdown).toContain(absoluteUrl(page.href));
    }
  });

  it("names the path that was requested", () => {
    expect(buildNotFoundMarkdown("/typo")).toContain("`/typo`");
  });

  it("still renders without a requested path", () => {
    expect(buildNotFoundMarkdown().length).toBeGreaterThan(0);
  });

  it("explains how to get markdown for any page", () => {
    expect(buildNotFoundMarkdown("/missing")).toContain(
      "Accept: text/markdown",
    );
  });
});
