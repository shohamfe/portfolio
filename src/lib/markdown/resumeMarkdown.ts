import { CONTACT, getRoleTitle, LINKS, LOCATION, SITE } from "@/constants/site";
import type { ResumeEntry, ResumeSection } from "@/content/resume";
import { RESUME_CARDS, RESUME_SECTIONS } from "@/content/resume";
import type { RoleLabel } from "@/lib/pageMetadata";
import { buildMarkdownDocument } from "@/lib/markdown/documentFrame";
import {
  bulletList,
  definition,
  heading,
  joinBlocks,
  link,
} from "@/lib/markdown/markdownFormat";
import { getResumeDescription } from "@/lib/pageMetadata";

const RESUME_HREF = "/resume";
const CONTACT_HEADING = "Contact";
const CV_HEADING = "Download the CV";
const STRENGTHS_HEADING = "What I optimise for";
const CV_PATH = "/api/cv";

/** The "Present" placeholder cycles through joke company names in the UI. Only
 *  the first reads as a statement of availability, so that is the one an agent
 *  gets. */
const subtitleOf = (entry: ResumeEntry): string | null =>
  entry.subtitleWords?.[0] ?? entry.subtitle ?? null;

const entryHeading = (entry: ResumeEntry): string => {
  const title = entry.href ? link(entry.title, entry.href) : entry.title;

  return heading(3, entry.year ? `${entry.year} - ${title}` : title);
};

const entryBlock = (entry: ResumeEntry): string => {
  const subtitle = subtitleOf(entry);

  return joinBlocks([
    entryHeading(entry),
    subtitle ? `_${subtitle}_` : null,
    entry.bullets.length > 0 ? bulletList(entry.bullets) : null,
  ]);
};

const sectionBlock = (section: ResumeSection): string =>
  joinBlocks([heading(2, section.title), ...section.entries.map(entryBlock)]);

const contactSection = (): string =>
  joinBlocks([
    heading(2, CONTACT_HEADING),
    bulletList([
      definition("Email", link(CONTACT.email, LINKS.email)),
      definition("Phone", link(CONTACT.phone, LINKS.phone)),
      definition("LinkedIn", link("shoham-fe", LINKS.linkedin)),
      definition("GitHub", link("ShohamFe", LINKS.github)),
      definition("Based in", `${LOCATION.locality}, ${LOCATION.country}`),
    ]),
  ]);

/** The CV is streamed through this site's own route rather than linked straight
 *  to Drive, which 403s on fetch(). */
const cvSection = (): string =>
  joinBlocks([
    heading(2, CV_HEADING),
    `${link("Download the CV as PDF", CV_PATH)} - served from this domain.`,
  ]);

const strengthsSection = (): string =>
  joinBlocks([
    heading(2, STRENGTHS_HEADING),
    bulletList(
      RESUME_CARDS.map((card) =>
        definition(`${card.chip} - ${card.title}`, card.body),
      ),
    ),
  ]);

export const buildResumeMarkdown = (roleLabel: RoleLabel): string =>
  buildMarkdownDocument({
    href: RESUME_HREF,
    title: `Resume - ${SITE.name}, ${getRoleTitle(roleLabel)}`,
    lede: SITE.tagline,
    blocks: [
      getResumeDescription(roleLabel),
      contactSection(),
      cvSection(),
      ...RESUME_SECTIONS.map(sectionBlock),
      strengthsSection(),
    ],
  });
