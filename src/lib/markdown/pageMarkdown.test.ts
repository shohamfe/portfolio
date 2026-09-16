import { describe, expect, it } from "vitest";
import { CASE_STUDY_PAGES } from "@/constants/caseStudyPages";
import {
  getCvUrl,
  ROLE_LABELS,
  ROLE_QUERY_VALUE,
  SITE_PAGES,
  absoluteUrl,
} from "@/constants/site";
import { buildPageMarkdown } from "@/lib/markdown/pageMarkdown";
import { buildProjectMarkdown } from "@/lib/markdown/projectMarkdown";
import {
  hrefFromMarkdownUrlPath,
  markdownUrlPath,
  resolveMarkdownTarget,
} from "@/lib/markdown/markdownRoutes";

const headingLines = (markdown: string): string[] =>
  markdown.split("\n").filter((line) => line.startsWith("# "));

describe("buildPageMarkdown", () => {
  it.each(SITE_PAGES.map((page) => page.href))(
    "%s produces markdown under a single H1",
    (href) => {
      const markdown = buildPageMarkdown(href, undefined);

      expect(markdown.length).toBeGreaterThan(0);
      expect(markdown.startsWith("# ")).toBe(true);
      expect(headingLines(markdown)).toHaveLength(1);
      expect(markdown.endsWith("\n")).toBe(true);
    },
  );

  it.each(SITE_PAGES.map((page) => page.href))(
    "%s is pure - the same input yields identical output",
    (href) => {
      expect(buildPageMarkdown(href, undefined)).toBe(
        buildPageMarkdown(href, undefined),
      );
    },
  );

  it.each(SITE_PAGES.map((page) => page.href))(
    "%s links back to its own canonical HTML URL",
    (href) => {
      expect(buildPageMarkdown(href, undefined)).toContain(absoluteUrl(href));
    },
  );

  it("swaps the role copy on the pages that support it", () => {
    const defaultHome = buildPageMarkdown("/", undefined);
    const frontendHome = buildPageMarkdown("/", ROLE_QUERY_VALUE);

    expect(defaultHome).toContain("Software Developer++");
    expect(frontendHome).toContain("Frontend Developer++");
    expect(frontendHome).not.toBe(defaultHome);
  });

  it("ignores an unrecognised role value", () => {
    expect(buildPageMarkdown("/resume", "cobol")).toBe(
      buildPageMarkdown("/resume", undefined),
    );
  });

  it("carries the resume's real content, not a stub", () => {
    const markdown = buildPageMarkdown("/resume", undefined);

    expect(markdown).toContain("Lead Frontend Developer & UX/UI Designer");
    expect(markdown).toContain("OctSeven.com");
    expect(markdown).toContain("B.Sc. Computer Science");
  });

  it("renders prose page links as absolute markdown links", () => {
    expect(buildPageMarkdown("/about", undefined)).toContain(
      `[Resume](${absoluteUrl("/resume")})`,
    );
  });

  it("renders the case study index from the project list", () => {
    const markdown = buildPageMarkdown("/case-study", undefined);

    CASE_STUDY_PAGES.forEach((page) => {
      expect(markdown).toContain(page.label);
      expect(markdown).toContain(page.summary);
      expect(markdown).toContain(absoluteUrl(page.href));
    });
  });
});

describe("buildProjectMarkdown", () => {
  it.each(CASE_STUDY_PAGES.map((page) => page.slug))(
    "%s produces markdown under a single H1",
    (slug) => {
      const markdown = buildProjectMarkdown(slug);

      expect(markdown).not.toBeNull();
      expect(markdown?.startsWith("# ")).toBe(true);
      expect(headingLines(markdown as string)).toHaveLength(1);
      expect(markdown?.endsWith("\n")).toBe(true);
    },
  );

  it.each(CASE_STUDY_PAGES.map((page) => page.slug))(
    "%s links back to its own canonical HTML URL",
    (slug) => {
      expect(buildProjectMarkdown(slug)).toContain(
        absoluteUrl(`/case-study/${slug}`),
      );
    },
  );

  it("carries the project's real sections, not a stub", () => {
    const markdown = buildProjectMarkdown("octseven") as string;

    expect(markdown).toContain("## The Stakes");
    expect(markdown).toContain("## Decisions");
    expect(markdown).toContain("## Evidence");
    expect(markdown).toContain("## What I'd Change");
    expect(markdown).toContain("octseven.com");
  });

  it("returns null for a slug that has no case study", () => {
    expect(buildProjectMarkdown("not-a-real-project")).toBeNull();
  });
});

describe("markdown route mapping", () => {
  it("gives the root an index.md sibling and every other page a .md sibling", () => {
    expect(markdownUrlPath("/")).toBe("/index.md");
    expect(markdownUrlPath("/resume")).toBe("/resume.md");
  });

  it("round-trips every site page through its .md sibling", () => {
    for (const page of SITE_PAGES) {
      expect(hrefFromMarkdownUrlPath(markdownUrlPath(page.href))).toBe(
        page.href,
      );
    }
  });

  it("resolves handler slugs back to site routes", () => {
    expect(resolveMarkdownTarget([])).toEqual({ kind: "page", href: "/" });
    expect(resolveMarkdownTarget(["index"])).toEqual({
      kind: "page",
      href: "/",
    });
    expect(resolveMarkdownTarget(["resume"])).toEqual({
      kind: "page",
      href: "/resume",
    });
    expect(resolveMarkdownTarget(["nope"])).toBeNull();
    expect(resolveMarkdownTarget(["resume", "extra"])).toBeNull();
  });

  it("resolves every case study detail route, and nothing else under it", () => {
    CASE_STUDY_PAGES.forEach((page) => {
      expect(markdownUrlPath(page.href)).toBe(`${page.href}.md`);
      expect(hrefFromMarkdownUrlPath(`${page.href}.md`)).toBe(page.href);
      expect(resolveMarkdownTarget(["case-study", page.slug])).toEqual({
        kind: "caseStudy",
        slug: page.slug,
      });
    });

    expect(
      resolveMarkdownTarget(["case-study", "not-a-real-project"]),
    ).toBeNull();
    expect(
      resolveMarkdownTarget(["case-study", "octseven", "extra"]),
    ).toBeNull();
  });
});

describe("resume CV link", () => {
  it("downloads the CV the rendered page would, for each role", () => {
    const defaultMarkdown = buildPageMarkdown("/resume", undefined);
    const frontendMarkdown = buildPageMarkdown("/resume", ROLE_QUERY_VALUE);

    expect(defaultMarkdown).toContain(getCvUrl(ROLE_LABELS.default));
    expect(frontendMarkdown).toContain(getCvUrl(ROLE_LABELS.frontend));
    expect(getCvUrl(ROLE_LABELS.frontend)).not.toBe(
      getCvUrl(ROLE_LABELS.default),
    );
  });
});
