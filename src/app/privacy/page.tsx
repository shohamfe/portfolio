import type { Metadata } from "next";
import ProsePage from "@/components/prosePage/ProsePage";
import { SITE } from "@/constants/site";
import { PRIVACY_CONTENT } from "@/content/privacy";
import { buildPageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/privacy",
  title: `Privacy - ${SITE.name}`,
  description:
    "What this portfolio measures: Google Analytics 4, two custom click events, Vercel request logs and the CV download proxy - plus what it never collects and how to opt out.",
});

const PrivacyPage: React.FC = () => {
  return <ProsePage {...PRIVACY_CONTENT} />;
};

export default PrivacyPage;
