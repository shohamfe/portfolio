import type { ReactNode } from "react";

export interface MobileNavItem {
  href: string;
  label: string;
  icon: ReactNode;
  /** Rendered instead of `icon` on the current route - same glyph, filled weight. */
  activeIcon: ReactNode;
}

export interface MobileNavItemProps {
  item: MobileNavItem;
  active: boolean;
}
