import {
  getBreadcrumbId,
  getPageLabel,
  getWebPageId,
  HOME_BREADCRUMB_LABEL,
  SCHEMA_CONTEXT,
  SCHEMA_IDS,
  SCHEMA_LANGUAGE,
} from "@/constants/structuredData";
import {
  CONTACT,
  LINKS,
  LOCATION,
  SITE,
  SITE_KEYWORDS,
} from "@/constants/site";
import { TECH_FOLDERS } from "@/constants/tech";
import { canonicalUrl } from "@/lib/pageMetadata";
import type {
  BreadcrumbListNode,
  PageGraphInput,
  PersonNode,
  StructuredDataGraph,
  WebPageNode,
  WebSiteNode,
} from "@/components/structuredData/types/structuredData.types";

const HOME_PATH = "/";

export const getKnowsAbout = (): string[] => {
  const keywordTopics = SITE_KEYWORDS.filter(
    (keyword) => keyword !== SITE.name,
  );
  const technologies = TECH_FOLDERS.map((folder) => folder.label);

  return Array.from(new Set([...keywordTopics, ...technologies]));
};

/** Locality and country only - a street address must never reach the page. */
export const buildPersonNode = (): PersonNode => ({
  "@type": "Person",
  "@id": SCHEMA_IDS.person,
  name: SITE.name,
  url: canonicalUrl(HOME_PATH),
  jobTitle: SITE.role,
  description: SITE.description,
  email: CONTACT.email,
  telephone: LINKS.phone.replace("tel:", ""),
  knowsAbout: getKnowsAbout(),
  sameAs: [LINKS.linkedin, LINKS.github],
  address: {
    "@type": "PostalAddress",
    addressLocality: LOCATION.locality,
    addressCountry: LOCATION.country,
  },
});

export const buildWebSiteNode = (): WebSiteNode => ({
  "@type": "WebSite",
  "@id": SCHEMA_IDS.webSite,
  name: SITE.name,
  url: canonicalUrl(HOME_PATH),
  description: SITE.description,
  inLanguage: SCHEMA_LANGUAGE,
  author: { "@id": SCHEMA_IDS.person },
  publisher: { "@id": SCHEMA_IDS.person },
});

export const buildWebPageNode = ({
  path,
  title,
  description,
}: PageGraphInput): WebPageNode => {
  const isHome = path === HOME_PATH;

  const node: WebPageNode = {
    "@type": isHome ? "ProfilePage" : "WebPage",
    "@id": getWebPageId(path),
    url: canonicalUrl(path),
    name: title,
    description,
    inLanguage: SCHEMA_LANGUAGE,
    isPartOf: { "@id": SCHEMA_IDS.webSite },
    about: { "@id": SCHEMA_IDS.person },
  };

  if (isHome) {
    return { ...node, mainEntity: { "@id": SCHEMA_IDS.person } };
  }

  return { ...node, breadcrumb: { "@id": getBreadcrumbId(path) } };
};

export const buildBreadcrumbListNode = (
  path: string,
  label: string,
): BreadcrumbListNode => ({
  "@type": "BreadcrumbList",
  "@id": getBreadcrumbId(path),
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: HOME_BREADCRUMB_LABEL,
      item: canonicalUrl(HOME_PATH),
    },
    {
      "@type": "ListItem",
      position: 2,
      name: label,
      item: canonicalUrl(path),
    },
  ],
});

export const buildPageGraph = ({
  path,
  title,
  description,
}: PageGraphInput): StructuredDataGraph => {
  const webPage = buildWebPageNode({ path, title, description });
  const isHome = path === HOME_PATH;

  return {
    "@context": SCHEMA_CONTEXT,
    "@graph": isHome
      ? [buildPersonNode(), buildWebSiteNode(), webPage]
      : [
          buildPersonNode(),
          buildWebSiteNode(),
          webPage,
          buildBreadcrumbListNode(path, getPageLabel(path)),
        ],
  };
};

/** `<` is escaped so a stray HTML tag in any field cannot close the script tag. */
export const serializeStructuredData = (graph: StructuredDataGraph): string =>
  JSON.stringify(graph).replace(/</g, "\\u003c");
