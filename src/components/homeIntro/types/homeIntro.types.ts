export interface HomeIntroProps {
  className?: string;
}

export interface HomeIntroSectionProps {
  id: string;
  headingId: string;
  title: string;
  bullets: readonly string[];
}

export interface HomeIntroAboutSectionProps {
  about: {
    title: string;
    paragraphs: readonly string[];
  };
}
