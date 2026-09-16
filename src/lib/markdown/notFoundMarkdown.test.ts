import { describe, expect, it } from "vitest";
import { CASE_STUDY_PAGES } from "@/constants/caseStudyPages";
import { ALL_INDEXABLE_PAGES } from "@/constants/pages";
import { absoluteUrl } from "@/constants/site";
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

    for (const page of ALL_INDEXABLE_PAGES) {
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

  it("lists the case study routes an agent could have guessed at", () => {
    const markdown = buildNotFoundMarkdown("/case-study/typo");

    for (const page of CASE_STUDY_PAGES) {
      expect(markdown).toContain(absoluteUrl(page.href));
    }
  });
});
