import { SITE } from "@/constants/site";
import { buildMarkdownDocument } from "@/lib/markdown/documentFrame";
import {
  heading,
  joinBlocks,
  linkListItem,
} from "@/lib/markdown/markdownFormat";
import { PORTFOLIO_DESCRIPTION } from "@/lib/pageMetadata";

const PORTFOLIO_HREF = "/portfolio";
const STATUS_HEADING = "Status";
const STATUS_PARAGRAPH =
  "The case studies are still being written. Until they land, this page holds no project write-ups, and the resume is the complete record of the work.";

const WHERE_TO_LOOK_HEADING = "Where the projects are described instead";

const whereToLookSection = (): string =>
  joinBlocks([
    heading(2, WHERE_TO_LOOK_HEADING),
    [
      linkListItem(
        "Resume",
        "/resume",
        "Every role and project, with the systems and stack behind each one.",
      ),
      linkListItem(
        "About",
        "/about",
        "The kinds of problems these projects have in common.",
      ),
    ].join("\n"),
  ]);

export const buildPortfolioMarkdown = (): string =>
  buildMarkdownDocument({
    href: PORTFOLIO_HREF,
    title: `Portfolio - ${SITE.name}`,
    blocks: [
      PORTFOLIO_DESCRIPTION,
      joinBlocks([heading(2, STATUS_HEADING), STATUS_PARAGRAPH]),
      whereToLookSection(),
    ],
  });
