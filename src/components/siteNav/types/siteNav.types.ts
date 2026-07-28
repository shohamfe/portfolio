import type { ReactNode } from "react";

export interface SiteNavProps {
  /** Rendered as one more item at the end of the icon-button row - e.g. the
   *  Resume page's Download CV button, sitting right after the Figma icon
   *  rather than off on its own elsewhere in the header. */
  trailing?: ReactNode;
  className?: string;
}
