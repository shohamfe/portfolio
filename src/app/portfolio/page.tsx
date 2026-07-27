import type { Metadata } from "next";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: `Portfolio - ${SITE.name}`,
};

/** Placeholder route. The Portfolio page is still to be designed, but the nav
 *  links to it, so it needs to resolve rather than 404. */
const PortfolioPage: React.FC = () => {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-display text-h2 text-text-strong">Portfolio</h1>

      <p className="font-body text-body text-text-muted">In the works.</p>
    </main>
  );
};

export default PortfolioPage;
