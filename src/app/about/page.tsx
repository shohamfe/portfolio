import type { Metadata } from "next";
import ProsePage from "@/components/prosePage/ProsePage";
import { buildPageGraph } from "@/components/structuredData/helpers/structuredData.helpers";
import StructuredData from "@/components/structuredData/StructuredData";
import { SITE } from "@/constants/site";
import { ABOUT_CONTENT } from "@/content/about";
import { buildPageMetadata } from "@/lib/pageMetadata";

const ABOUT_PATH = "/about";
const ABOUT_TITLE = `About - ${SITE.name}`;
const ABOUT_DESCRIPTION =
  "Longer-form background on Shoham Fellner: the data-heavy React systems I build, owning a feature from Figma through to production, and working with AI-assisted engineering and autonomous agents.";

export const metadata: Metadata = buildPageMetadata({
  path: ABOUT_PATH,
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
});

const graph = buildPageGraph({
  path: ABOUT_PATH,
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
});

const AboutPage: React.FC = () => {
  return (
    <>
      <StructuredData graph={graph} />

      <ProsePage {...ABOUT_CONTENT} />
    </>
  );
};

export default AboutPage;
