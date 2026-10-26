import { describe, expect, it } from "vitest";
import { JOB_TITLE, SITE_URL } from "@/constants/site";
import { CASE_STUDY_PROJECTS } from "@/content/caseStudy";
import {
  buildPageMetadata,
  CASE_STUDY_DESCRIPTION,
  canonicalUrl,
  getProjectDescription,
  RESUME_DESCRIPTION,
} from "@/lib/pageMetadata";

describe("canonicalUrl", () => {
  it("returns an absolute URL", () => {
    expect(canonicalUrl("/resume")).toBe(`${SITE_URL}/resume`);
  });

  it("drops the query string and hash so URL variants do not compete", () => {
    expect(canonicalUrl("/?tab=1")).toBe(`${SITE_URL}/`);
    expect(canonicalUrl("/resume?tab=1#top")).toBe(`${SITE_URL}/resume`);
  });
});

describe("buildPageMetadata", () => {
  const metadata = buildPageMetadata({
    path: "/resume?tab=1",
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
        alt: "Shoham Fellner - Product Engineer++",
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
  it("names the job title on the resume description", () => {
    expect(RESUME_DESCRIPTION).toContain(JOB_TITLE);
  });

  it("gives the case study index a description of its own", () => {
    expect(CASE_STUDY_DESCRIPTION).not.toBe(RESUME_DESCRIPTION);

    CASE_STUDY_PROJECTS.forEach((project) => {
      expect(CASE_STUDY_DESCRIPTION).toContain(project.title);
    });
  });

  it("describes each project from its own copy", () => {
    CASE_STUDY_PROJECTS.forEach((project) => {
      const description = getProjectDescription(project);

      expect(description).toContain(project.title);
      expect(description).toContain(project.blurb);
      expect(description).toContain(project.role);
    });
  });
});
