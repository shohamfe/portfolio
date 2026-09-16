import {
  CONTACT,
  getRoleTitle,
  getSiteDescription,
  LINKS,
  LOCATION,
  SITE,
} from "@/constants/site";
import { TECH_FOLDERS } from "@/constants/tech";
import { HOME_CONTENT } from "@/content/home";
import type { RoleLabel } from "@/lib/pageMetadata";
import { buildMarkdownDocument } from "@/lib/markdown/documentFrame";
import {
  bulletList,
  definition,
  heading,
  joinBlocks,
  link,
} from "@/lib/markdown/markdownFormat";

const HOME_HREF = "/";
const TECH_HEADING = "Tech I work with";
const CONTACT_HEADING = "Contact";

const bulletSection = (title: string, bullets: readonly string[]): string =>
  joinBlocks([heading(2, title), bulletList(bullets)]);

const paragraphSection = (
  title: string,
  paragraphs: readonly string[],
): string => joinBlocks([heading(2, title), ...paragraphs]);

const techSection = (): string =>
  joinBlocks([
    heading(2, TECH_HEADING),
    TECH_FOLDERS.map((folder) => folder.label).join(", ") + ".",
  ]);

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

export const buildHomeMarkdown = (roleLabel: RoleLabel): string =>
  buildMarkdownDocument({
    href: HOME_HREF,
    title: `${SITE.name} - ${getRoleTitle(roleLabel)}`,
    lede: SITE.tagline,
    blocks: [
      getSiteDescription(roleLabel),
      bulletSection(HOME_CONTENT.passion.title, HOME_CONTENT.passion.bullets),
      bulletSection(HOME_CONTENT.howIWork.title, HOME_CONTENT.howIWork.bullets),
      paragraphSection(HOME_CONTENT.about.title, HOME_CONTENT.about.paragraphs),
      techSection(),
      contactSection(),
    ],
  });
