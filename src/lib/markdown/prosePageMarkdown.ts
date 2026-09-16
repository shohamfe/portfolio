import type {
  ProseLink,
  ProsePageProps,
  ProseSectionContent,
} from "@/components/prosePage/types/prosePage.types";
import { buildMarkdownDocument } from "@/lib/markdown/documentFrame";
import {
  bulletList,
  heading,
  joinBlocks,
  linkListItem,
} from "@/lib/markdown/markdownFormat";

const linkBlock = (links: readonly ProseLink[]): string =>
  links
    .map((proseLink) =>
      linkListItem(proseLink.label, proseLink.href, proseLink.description),
    )
    .join("\n");

const sectionBlock = (section: ProseSectionContent): string =>
  joinBlocks([
    heading(2, section.title),
    ...(section.paragraphs ?? []),
    section.bullets ? bulletList(section.bullets) : null,
    section.links ? linkBlock(section.links) : null,
  ]);

/** About, Contact and Privacy all render from the same prose shape, so they all
 *  produce their markdown here. */
export const buildProsePageMarkdown = (
  href: string,
  content: ProsePageProps,
  title: string,
): string =>
  buildMarkdownDocument({
    href,
    title,
    lede: content.lede,
    blocks: [
      ...content.sections.map(sectionBlock),
      content.footnote ? `_${content.footnote}_` : null,
    ],
  });
