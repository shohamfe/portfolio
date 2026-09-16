import { buildPageGraph } from "@/components/structuredData/helpers/structuredData.helpers";
import StructuredData from "@/components/structuredData/StructuredData";
import { SITE } from "@/constants/site";
import { buildPageMetadata, PORTFOLIO_DESCRIPTION } from "@/lib/pageMetadata";
import type { Metadata } from "next";

const PORTFOLIO_PATH = "/portfolio";
const PORTFOLIO_TITLE = `Portfolio - ${SITE.name}`;

export const metadata: Metadata = buildPageMetadata({
  path: PORTFOLIO_PATH,
  title: PORTFOLIO_TITLE,
  description: PORTFOLIO_DESCRIPTION,
});

const graph = buildPageGraph({
  path: PORTFOLIO_PATH,
  title: PORTFOLIO_TITLE,
  description: PORTFOLIO_DESCRIPTION,
});

/** Placeholder route. The Portfolio page is still to be designed, but the nav
 *  links to it, so it needs to resolve rather than 404. */
const PortfolioPage: React.FC = () => {
  return (
    <>
      <StructuredData graph={graph} />

      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-display text-h2 text-text-strong">Portfolio</h1>

        <p className="font-body text-body text-text-muted">In the works.</p>
      </main>
    </>
  );
};

export default PortfolioPage;
