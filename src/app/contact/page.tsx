import type { Metadata } from "next";
import ProsePage from "@/components/prosePage/ProsePage";
import { SITE } from "@/constants/site";
import { CONTACT_CONTENT } from "@/content/contact";
import { buildPageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/contact",
  title: `Contact - ${SITE.name}`,
  description:
    "How to reach Shoham Fellner, a frontend-oriented software developer in Tel Aviv: email, phone, LinkedIn and GitHub, plus what to include in a first message.",
});

const ContactPage: React.FC = () => {
  return <ProsePage {...CONTACT_CONTENT} />;
};

export default ContactPage;
