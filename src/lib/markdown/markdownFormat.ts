import { absoluteUrl } from "@/constants/site";

const BLOCK_SEPARATOR = "\n\n";

/** Site-relative hrefs become absolute so the markdown stays useful once an
 *  agent has copied it away from the URL it was fetched from. `mailto:` and
 *  `tel:` already carry their own scheme. */
export const resolveHref = (href: string): string =>
  href.startsWith("/") ? absoluteUrl(href) : href;

export const heading = (level: number, text: string): string =>
  `${"#".repeat(level)} ${text}`;

export const blockquote = (text: string): string => `> ${text}`;

export const bulletList = (items: readonly string[]): string =>
  items.map((item) => `- ${item}`).join("\n");

export const link = (label: string, href: string): string =>
  `[${label}](${resolveHref(href)})`;

export const linkListItem = (
  label: string,
  href: string,
  description?: string,
): string => {
  const anchor = `- ${link(label, href)}`;

  return description ? `${anchor}: ${description}` : anchor;
};

export const definition = (term: string, value: string): string =>
  `**${term}:** ${value}`;

export const joinBlocks = (blocks: readonly (string | null)[]): string =>
  blocks
    .filter((block): block is string => block !== null && block.length > 0)
    .join(BLOCK_SEPARATOR);

/** Every page's markdown ends in exactly one trailing newline. */
export const asDocument = (blocks: readonly (string | null)[]): string =>
  `${joinBlocks(blocks)}\n`;
