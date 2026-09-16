import type { ROLE_LABELS } from "@/constants/site";

export interface MobileHeroProps {
  roleLabel: (typeof ROLE_LABELS)[keyof typeof ROLE_LABELS];
  /** Steps the site name down from h1, for pages that bring their own. */
  pageHasOwnHeading?: boolean;
}
