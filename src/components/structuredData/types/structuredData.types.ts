export interface SchemaReference {
  "@id": string;
}

export interface PostalAddressNode {
  "@type": "PostalAddress";
  addressLocality: string;
  addressCountry: string;
}

export interface PersonNode {
  "@type": "Person";
  "@id": string;
  name: string;
  url: string;
  jobTitle: string;
  description: string;
  email: string;
  telephone: string;
  knowsAbout: string[];
  sameAs: string[];
  address: PostalAddressNode;
}

export interface WebSiteNode {
  "@type": "WebSite";
  "@id": string;
  name: string;
  url: string;
  description: string;
  inLanguage: string;
  author: SchemaReference;
  publisher: SchemaReference;
}

export interface WebPageNode {
  "@type": "ProfilePage" | "WebPage";
  "@id": string;
  url: string;
  name: string;
  description: string;
  inLanguage: string;
  isPartOf: SchemaReference;
  about: SchemaReference;
  mainEntity?: SchemaReference;
  breadcrumb?: SchemaReference;
}

export interface BreadcrumbItemNode {
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
}

export interface BreadcrumbListNode {
  "@type": "BreadcrumbList";
  "@id": string;
  itemListElement: BreadcrumbItemNode[];
}

export type StructuredDataNode =
  PersonNode | WebSiteNode | WebPageNode | BreadcrumbListNode;

export interface StructuredDataGraph {
  "@context": string;
  "@graph": StructuredDataNode[];
}

export interface PageGraphInput {
  path: string;
  title: string;
  description: string;
}

export interface StructuredDataProps {
  graph: StructuredDataGraph;
}
