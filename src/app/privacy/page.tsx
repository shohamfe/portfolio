import type { Metadata } from "next";
import ProsePage from "@/components/prosePage/ProsePage";
import { buildPageGraph } from "@/components/structuredData/helpers/structuredData.helpers";
import StructuredData from "@/components/structuredData/StructuredData";
import { SITE } from "@/constants/site";
import { PRIVACY_CONTENT } from "@/content/privacy";
import { buildPageMetadata } from "@/lib/pageMetadata";

const PRIVACY_PATH = "/privacy";
const PRIVACY_TITLE = `Privacy - ${SITE.name}`;
const PRIVACY_DESCRIPTION =
  "What this portfolio measures: Google Analytics 4, two custom click events, Vercel request logs and the CV download proxy - plus what it never collects and how to opt out.";

export const metadata: Metadata = buildPageMetadata({
  path: PRIVACY_PATH,
  title: PRIVACY_TITLE,
  description: PRIVACY_DESCRIPTION,
});

const graph = buildPageGraph({
  path: PRIVACY_PATH,
  title: PRIVACY_TITLE,
  description: PRIVACY_DESCRIPTION,
});

const PrivacyPage: React.FC = () => {
  return (
    <>
      <StructuredData graph={graph} />

      <ProsePage {...PRIVACY_CONTENT} />
    </>
  );
};

export default PrivacyPage;
