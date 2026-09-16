import { describe, expect, it } from "vitest";
import { ROLE_QUERY_VALUE, SITE_PAGES, absoluteUrl } from "@/constants/site";
import { buildPageMarkdown } from "@/lib/markdown/pageMarkdown";
import {
  hrefFromMarkdownUrlPath,
  markdownUrlPath,
  resolveSitePageHref,
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
    expect(resolveSitePageHref([])).toBe("/");
    expect(resolveSitePageHref(["index"])).toBe("/");
    expect(resolveSitePageHref(["resume"])).toBe("/resume");
    expect(resolveSitePageHref(["nope"])).toBeNull();
    expect(resolveSitePageHref(["resume", "extra"])).toBeNull();
  });
});
