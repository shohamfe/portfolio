import type { Metadata } from "next";
import ProsePage from "@/components/prosePage/ProsePage";
import { SITE } from "@/constants/site";
import { ABOUT_CONTENT } from "@/content/about";
import { buildPageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/about",
  title: `About - ${SITE.name}`,
  description:
    "Longer-form background on Shoham Fellner: the data-heavy React systems I build, owning a feature from Figma through to production, and working with AI-assisted engineering and autonomous agents.",
});

const AboutPage: React.FC = () => {
  return <ProsePage {...ABOUT_CONTENT} />;
};

export default AboutPage;
