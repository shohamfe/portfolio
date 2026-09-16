import { describe, expect, it } from "vitest";
import { buildLlmsTxt } from "@/lib/llmsTxt";
import { CASE_STUDY_PAGES } from "@/constants/caseStudyPages";
import { absoluteUrl, SITE, SITE_PAGES } from "@/constants/site";

const body = buildLlmsTxt();
const lines = body.split("\n");

describe("buildLlmsTxt", () => {
  it("starts with a single H1 carrying the site name", () => {
    expect(lines[0]).toBe(`# ${SITE.name}`);

    const headingOnes = lines.filter((line) => /^# /.test(line));

    expect(headingOnes).toHaveLength(1);
  });

  it("places a blockquote summary immediately after the H1", () => {
    expect(lines[1]).toBe("");
    expect(lines[2]?.startsWith("> ")).toBe(true);
  });

  it("has no headings between the blockquote and the first H2", () => {
    const blockquoteIndex = lines.findIndex((line) => line.startsWith("> "));
    const firstSectionIndex = lines.findIndex((line) => line.startsWith("## "));

    expect(firstSectionIndex).toBeGreaterThan(blockquoteIndex);

    const guidanceLines = lines.slice(blockquoteIndex + 1, firstSectionIndex);

    guidanceLines.forEach((line) => {
      expect(line.startsWith("#")).toBe(false);
    });

    expect(guidanceLines.some((line) => line.trim().length > 0)).toBe(true);
  });

  it("gives every H2 section at least one absolute markdown link", () => {
    const sections = body.split(/^## .*$/m).slice(1);

    expect(sections.length).toBeGreaterThan(0);

    sections.forEach((section) => {
      expect(section).toMatch(/- \[[^\]]+\]\(https?:\/\/[^)]+\)/);
    });
  });

  it("lists every site page exactly once as an absolute URL", () => {
    SITE_PAGES.forEach((page) => {
      const url = absoluteUrl(page.href);
      const occurrences = body.split(`(${url})`).length - 1;

      expect(occurrences).toBe(1);
    });
  });

  it("uses each page summary as the link note", () => {
    SITE_PAGES.forEach((page) => {
      expect(body).toContain(
        `- [${page.label}](${absoluteUrl(page.href)}): ${page.summary}`,
      );
    });
  });

  it("lists every case study with its blurb as the note", () => {
    expect(CASE_STUDY_PAGES.length).toBeGreaterThan(0);

    CASE_STUDY_PAGES.forEach((page) => {
      const url = absoluteUrl(page.href);

      expect(body.split(`(${url})`).length - 1).toBe(1);
      expect(body).toContain(`- [${page.label}](${url}): ${page.summary}`);
    });
  });
});
