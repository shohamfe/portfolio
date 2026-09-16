import { describe, expect, it } from "vitest";
import { ROLE_LABELS, SITE_URL } from "@/constants/site";
import {
  buildPageMetadata,
  canonicalUrl,
  getResumeDescription,
  PORTFOLIO_DESCRIPTION,
} from "@/lib/pageMetadata";

describe("canonicalUrl", () => {
  it("returns an absolute URL", () => {
    expect(canonicalUrl("/resume")).toBe(`${SITE_URL}/resume`);
  });

  it("drops the query string and hash so role variants do not compete", () => {
    expect(canonicalUrl("/?role=frontend")).toBe(`${SITE_URL}/`);
    expect(canonicalUrl("/resume?role=frontend#top")).toBe(
      `${SITE_URL}/resume`,
    );
  });
});

describe("buildPageMetadata", () => {
  const metadata = buildPageMetadata({
    path: "/resume?role=frontend",
    title: "Resume title",
    description: "Resume description",
  });

  it("emits a canonical URL without a query string", () => {
    expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/resume`);
  });

  it("re-supplies the full openGraph shape on every route", () => {
    expect(metadata.openGraph).toMatchObject({
      type: "website",
      title: "Resume title",
      description: "Resume description",
      siteName: "Shoham Fellner",
      url: `${SITE_URL}/resume`,
    });
  });

  it("points both social images at absolute URLs", () => {
    expect(metadata.openGraph?.images).toEqual([
      {
        url: `${SITE_URL}/opengraph-image.jpg`,
        width: 1200,
        height: 1200,
        alt: "Shoham Fellner - Software Developer++",
      },
    ]);
    expect(metadata.twitter?.images).toEqual([`${SITE_URL}/twitter-image.jpg`]);
  });

  it("keeps the twitter card in sync with openGraph", () => {
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Resume title",
      description: "Resume description",
    });
  });
});

describe("page descriptions", () => {
  it("swaps the role wording on the resume description", () => {
    expect(getResumeDescription(ROLE_LABELS.default)).toContain(
      "Software Developer (Frontend Oriented)",
    );
    expect(getResumeDescription(ROLE_LABELS.frontend)).toContain(
      "Frontend Developer",
    );
    expect(getResumeDescription(ROLE_LABELS.frontend)).not.toContain(
      "Frontend Oriented",
    );
  });

  it("gives the portfolio a description of its own", () => {
    expect(PORTFOLIO_DESCRIPTION).not.toBe(
      getResumeDescription(ROLE_LABELS.default),
    );
  });
});
