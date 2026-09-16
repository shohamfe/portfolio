export interface ProseLink {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
}

export interface ProseSectionContent {
  id: string;
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  links?: readonly ProseLink[];
}

export interface ProseSectionProps {
  section: ProseSectionContent;
}

export interface ProsePageProps {
  title: string;
  lede?: string;
  sections: readonly ProseSectionContent[];
  footnote?: string;
}
