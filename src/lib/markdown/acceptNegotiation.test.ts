import { describe, expect, it } from "vitest";
import {
  explicitlyRejects,
  namesMediaType,
  mergeVaryWithAccept,
  negotiateMediaType,
  parseAcceptHeader,
} from "@/lib/markdown/acceptNegotiation";
import {
  HTML_MEDIA_TYPE,
  MARKDOWN_MEDIA_TYPE,
  MARKDOWN_ONLY_MEDIA_TYPES,
  RSC_MEDIA_TYPE,
} from "@/lib/markdown/constants";

/** The published conformance vectors from acceptmarkdown.com, verbatim. */
const CONFORMANCE_VECTORS: ReadonlyArray<{
  accept: string | null;
  produces: readonly string[];
  expected: string | null;
  description: string;
}> = [
  {
    accept: "text/markdown",
    produces: [HTML_MEDIA_TYPE, MARKDOWN_MEDIA_TYPE],
    expected: MARKDOWN_MEDIA_TYPE,
    description: "an exact markdown request is served markdown",
  },
  {
    accept: "text/markdown, text/html;q=0.8",
    produces: [HTML_MEDIA_TYPE, MARKDOWN_MEDIA_TYPE],
    expected: MARKDOWN_MEDIA_TYPE,
    description: "markdown outranks a lower-q html",
  },
  {
    accept: "text/html",
    produces: [HTML_MEDIA_TYPE, MARKDOWN_MEDIA_TYPE],
    expected: HTML_MEDIA_TYPE,
    description: "an exact html request is served html",
  },
  {
    accept: "text/markdown;q=0, text/html",
    produces: [HTML_MEDIA_TYPE, MARKDOWN_MEDIA_TYPE],
    expected: HTML_MEDIA_TYPE,
    description: "markdown rejected by q=0 falls back to html",
  },
  {
    accept: "text/html;q=0, */*",
    produces: [HTML_MEDIA_TYPE, MARKDOWN_MEDIA_TYPE],
    expected: MARKDOWN_MEDIA_TYPE,
    description: "a specific q=0 beats the wildcard that would revive html",
  },
  {
    accept: null,
    produces: [HTML_MEDIA_TYPE, MARKDOWN_MEDIA_TYPE],
    expected: HTML_MEDIA_TYPE,
    description: "a missing Accept header gets the default",
  },
  {
    accept: "*/*",
    produces: [HTML_MEDIA_TYPE, MARKDOWN_MEDIA_TYPE],
    expected: HTML_MEDIA_TYPE,
    description: "a catch-all wildcard gets the default",
  },
  {
    accept: "text/markdown;q=0",
    produces: MARKDOWN_ONLY_MEDIA_TYPES,
    expected: null,
    description: "rejecting the only representation is a 406",
  },
];

describe("negotiateMediaType", () => {
  it.each(CONFORMANCE_VECTORS)(
    "$description (Accept: $accept)",
    ({ accept, produces, expected }) => {
      expect(negotiateMediaType(accept, produces)).toBe(expected);
    },
  );

  it("never 406s a real Chrome Accept header", () => {
    const chromeAccept =
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8";

    expect(
      negotiateMediaType(chromeAccept, [HTML_MEDIA_TYPE, MARKDOWN_MEDIA_TYPE]),
    ).toBe(HTML_MEDIA_TYPE);
  });

  it("serves markdown for a text/* wildcard only when it outranks html", () => {
    expect(
      negotiateMediaType("text/*", [HTML_MEDIA_TYPE, MARKDOWN_MEDIA_TYPE]),
    ).toBe(HTML_MEDIA_TYPE);
  });

  it("returns null when the client accepts nothing this site produces", () => {
    expect(
      negotiateMediaType("application/pdf", [
        HTML_MEDIA_TYPE,
        MARKDOWN_MEDIA_TYPE,
      ]),
    ).toBeNull();
  });

  it("treats an empty header as no constraint rather than a rejection", () => {
    expect(
      negotiateMediaType("   ", [HTML_MEDIA_TYPE, MARKDOWN_MEDIA_TYPE]),
    ).toBe(HTML_MEDIA_TYPE);
  });

  it("serves markdown to a markdown-only URL that sends no Accept header", () => {
    expect(negotiateMediaType(null, MARKDOWN_ONLY_MEDIA_TYPES)).toBe(
      MARKDOWN_MEDIA_TYPE,
    );
  });

  it("serves markdown to a markdown-only URL asking for the wildcard", () => {
    expect(negotiateMediaType("*/*", MARKDOWN_ONLY_MEDIA_TYPES)).toBe(
      MARKDOWN_MEDIA_TYPE,
    );
  });

  it("does not substring-match a type that merely contains markdown", () => {
    expect(
      negotiateMediaType("application/markdown", [
        HTML_MEDIA_TYPE,
        MARKDOWN_MEDIA_TYPE,
      ]),
    ).toBeNull();
  });
});

describe("parseAcceptHeader", () => {
  it("reads q-values, defaults, casing and specificity", () => {
    expect(parseAcceptHeader("TEXT/Markdown, text/*;Q=0.5, */*;q=0")).toEqual([
      { mediaType: "text/markdown", quality: 1, specificity: 2, position: 0 },
      { mediaType: "text/*", quality: 0.5, specificity: 1, position: 1 },
      { mediaType: "*/*", quality: 0, specificity: 0, position: 2 },
    ]);
  });

  it("clamps out-of-range q-values", () => {
    expect(parseAcceptHeader("text/html;q=5")[0].quality).toBe(1);
    expect(parseAcceptHeader("text/html;q=-2")[0].quality).toBe(0);
  });

  it("ignores non-q parameters", () => {
    expect(parseAcceptHeader("text/markdown;charset=utf-8")[0].quality).toBe(1);
  });
});

describe("mergeVaryWithAccept", () => {
  it("preserves the vary values Next sets on App Router responses", () => {
    const nextVary =
      "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch";

    expect(mergeVaryWithAccept(nextVary)).toBe(`${nextVary}, Accept`);
  });

  it("sets Accept alone when nothing varies yet", () => {
    expect(mergeVaryWithAccept(null)).toBe("Accept");
    expect(mergeVaryWithAccept("")).toBe("Accept");
  });

  it("appends Accept exactly once", () => {
    const merged = mergeVaryWithAccept("rsc");

    expect(mergeVaryWithAccept(merged)).toBe(merged);
    expect(merged.match(/accept/gi)).toHaveLength(1);
  });

  it("recognises an already-present Accept regardless of case or spacing", () => {
    expect(mergeVaryWithAccept("rsc,  ACCEPT")).toBe("rsc,  ACCEPT");
    expect(mergeVaryWithAccept("accept")).toBe("accept");
    expect(mergeVaryWithAccept("Accept, rsc")).toBe("Accept, rsc");
  });
});

describe("explicitlyRejects", () => {
  it("treats a header that never mentions markdown as no constraint", () => {
    expect(explicitlyRejects("text/html", MARKDOWN_MEDIA_TYPE)).toBe(false);
    expect(explicitlyRejects(null, MARKDOWN_MEDIA_TYPE)).toBe(false);
    expect(explicitlyRejects("*/*", MARKDOWN_MEDIA_TYPE)).toBe(false);
  });

  it("reports a rejection only when markdown is named with q=0", () => {
    expect(explicitlyRejects("text/markdown;q=0", MARKDOWN_MEDIA_TYPE)).toBe(
      true,
    );
    expect(
      explicitlyRejects("text/markdown;q=0, text/html", MARKDOWN_MEDIA_TYPE),
    ).toBe(true);
  });

  it("lets a wildcard q=0 reject, and a specific range override it", () => {
    expect(explicitlyRejects("*/*;q=0", MARKDOWN_MEDIA_TYPE)).toBe(true);
    expect(
      explicitlyRejects("*/*;q=0, text/markdown", MARKDOWN_MEDIA_TYPE),
    ).toBe(false);
  });
});

describe("namesMediaType", () => {
  it("matches whatever spelling the client used", () => {
    expect(namesMediaType("text/x-component", RSC_MEDIA_TYPE)).toBe(true);
    expect(namesMediaType("Text/X-Component", RSC_MEDIA_TYPE)).toBe(true);
    expect(namesMediaType("TEXT/X-COMPONENT, */*", RSC_MEDIA_TYPE)).toBe(true);
    expect(namesMediaType("text/x-component;q=0.9", RSC_MEDIA_TYPE)).toBe(true);
  });

  it("does not count a wildcard as naming the type", () => {
    expect(namesMediaType("*/*", RSC_MEDIA_TYPE)).toBe(false);
    expect(namesMediaType("text/*", RSC_MEDIA_TYPE)).toBe(false);
    expect(namesMediaType("text/html", RSC_MEDIA_TYPE)).toBe(false);
    expect(namesMediaType(null, RSC_MEDIA_TYPE)).toBe(false);
  });
});
