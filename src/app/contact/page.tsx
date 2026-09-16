import type { Metadata } from "next";
import ProsePage from "@/components/prosePage/ProsePage";
import { buildPageGraph } from "@/components/structuredData/helpers/structuredData.helpers";
import StructuredData from "@/components/structuredData/StructuredData";
import { SITE } from "@/constants/site";
import { CONTACT_CONTENT } from "@/content/contact";
import { buildPageMetadata } from "@/lib/pageMetadata";

const CONTACT_PATH = "/contact";
const CONTACT_TITLE = `Contact - ${SITE.name}`;
const CONTACT_DESCRIPTION =
  "How to reach Shoham Fellner, a frontend-oriented software developer in Tel Aviv: email, phone, LinkedIn and GitHub, plus what to include in a first message.";

export const metadata: Metadata = buildPageMetadata({
  path: CONTACT_PATH,
  title: CONTACT_TITLE,
  description: CONTACT_DESCRIPTION,
});

const graph = buildPageGraph({
  path: CONTACT_PATH,
  title: CONTACT_TITLE,
  description: CONTACT_DESCRIPTION,
});

const ContactPage: React.FC = () => {
  return (
    <>
      <StructuredData graph={graph} />

      <ProsePage {...CONTACT_CONTENT} />
    </>
  );
};

export default ContactPage;
