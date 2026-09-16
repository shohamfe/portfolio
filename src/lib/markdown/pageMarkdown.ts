import { resolveRoleLabel, SITE } from "@/constants/site";
import { ABOUT_CONTENT } from "@/content/about";
import { CONTACT_CONTENT } from "@/content/contact";
import { PRIVACY_CONTENT } from "@/content/privacy";
import { buildCaseStudyMarkdown } from "@/lib/markdown/caseStudyMarkdown";
import { buildHomeMarkdown } from "@/lib/markdown/homeMarkdown";
import type {
  MarkdownTarget,
  SitePageHref,
} from "@/lib/markdown/markdownRoutes";
import { buildProjectMarkdown } from "@/lib/markdown/projectMarkdown";
import { buildProsePageMarkdown } from "@/lib/markdown/prosePageMarkdown";
import { buildResumeMarkdown } from "@/lib/markdown/resumeMarkdown";

/** The role query param swaps the same copy between "Software Developer
 *  (Frontend Oriented)" and "Frontend Developer", exactly as the HTML pages do. */
export const buildPageMarkdown = (
  href: SitePageHref,
  roleParam: string | undefined,
): string => {
  const roleLabel = resolveRoleLabel(roleParam);

  switch (href) {
    case "/":
      return buildHomeMarkdown(roleLabel);
    case "/resume":
      return buildResumeMarkdown(roleLabel);
    case "/about":
      return buildProsePageMarkdown(
        href,
        ABOUT_CONTENT,
        `About - ${SITE.name}`,
      );
    case "/contact":
      return buildProsePageMarkdown(
        href,
        CONTACT_CONTENT,
        `Contact - ${SITE.name}`,
      );
    case "/privacy":
      return buildProsePageMarkdown(
        href,
        PRIVACY_CONTENT,
        `Privacy - ${SITE.name}`,
      );
    case "/case-study":
      return buildCaseStudyMarkdown();
  }
};

export const buildMarkdownForTarget = (
  target: MarkdownTarget,
  roleParam: string | undefined,
): string | null =>
  target.kind === "page"
    ? buildPageMarkdown(target.href, roleParam)
    : buildProjectMarkdown(target.slug);
