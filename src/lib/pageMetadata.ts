import type { Metadata } from "next";
import { absoluteUrl, SITE } from "@/constants/site";
import {
  CASE_STUDY_PROJECTS,
  type CaseStudyProject,
} from "@/content/caseStudy";
import { markdownUrlPath } from "@/lib/markdown/markdownRoutes";

export interface RoleLabel {
  primary: string;
  secondary: string | null;
}

const OG_IMAGE_PATH = "/opengraph-image.jpg";
const TWITTER_IMAGE_PATH = "/twitter-image.jpg";

/** Both share the square source in src/app. */
const SOCIAL_IMAGE_SIZE = 1200;

export interface PageMetadataInput {
  path: string;
  title: string;
  description: string;
}

/** Canonical URLs point at the bare path: `/` and `/?role=frontend` serve the
 *  same page, so they must not compete as two URLs. */
export const canonicalUrl = (path: string): string => {
  const url = new URL(absoluteUrl(path));
  url.search = "";
  url.hash = "";

  return url.toString();
};

const formatRole = (roleLabel: RoleLabel): string =>
  roleLabel.secondary
    ? `${roleLabel.primary} (${roleLabel.secondary})`
    : roleLabel.primary;

export const getResumeDescription = (roleLabel: RoleLabel): string =>
  `Resume of ${SITE.name}, ${formatRole(roleLabel)}: lead frontend and UX/UI work on a mission-critical IDF procurement system, real-time drone awareness dashboards at Nando, the OctSeven.com memorial site, and a B.Sc. in Computer Science - plus a downloadable CV.`;

export const CASE_STUDY_DESCRIPTION = `Case studies by ${SITE.name}: ${CASE_STUDY_PROJECTS.map((project) => project.title).join(", ")} - the stakes behind each one, the decisions taken, their trade-offs, and what I would change.`;

export const getProjectDescription = (project: CaseStudyProject): string =>
  `${project.title} - ${project.meta}. ${project.blurb} Role: ${project.role}. Built with ${project.tech.join(", ")}.`;

/** Every route re-declares the full OpenGraph object because metadata from
 *  nested segments replaces the parent's rather than merging into it. */
export const buildPageMetadata = ({
  path,
  title,
  description,
}: PageMetadataInput): Metadata => {
  const url = canonicalUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      types: { "text/markdown": canonicalUrl(markdownUrlPath(path)) },
    },
    openGraph: {
      type: "website",
      title,
      description,
      siteName: SITE.name,
      url,
      images: [
        {
          url: canonicalUrl(OG_IMAGE_PATH),
          width: SOCIAL_IMAGE_SIZE,
          height: SOCIAL_IMAGE_SIZE,
          alt: `${SITE.name} - ${SITE.role}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [canonicalUrl(TWITTER_IMAGE_PATH)],
    },
  };
};
