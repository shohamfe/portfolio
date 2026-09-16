import type { ROLE_LABELS } from "@/constants/site";

export interface MobileHeroProps {
  roleLabel: (typeof ROLE_LABELS)[keyof typeof ROLE_LABELS];
  /** The hero names the site, which is the page's heading only until the page
   *  supplies one of its own - two h1s leave agents and screen readers without
   *  a single subject for the page. */
  pageHasOwnHeading?: boolean;
}
