import type { ROLE_LABELS } from "@/constants/site";

export interface HomeIntroProps {
  className?: string;
  roleLabel: (typeof ROLE_LABELS)[keyof typeof ROLE_LABELS];
}

export interface HomeIntroHeaderProps {
  roleLabel: (typeof ROLE_LABELS)[keyof typeof ROLE_LABELS];
}

export interface HomeIntroSectionProps {
  id: string;
  headingId: string;
  title: string;
  bullets: readonly string[];
}

export interface HomeIntroAboutSectionProps {
  roleLabel: (typeof ROLE_LABELS)[keyof typeof ROLE_LABELS];
  about: {
    title: string;
    paragraphs: readonly string[];
  };
}

export interface HomeIntroScrollProps {
  roleLabel: (typeof ROLE_LABELS)[keyof typeof ROLE_LABELS];
}
