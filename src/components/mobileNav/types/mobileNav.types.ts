export interface MobileNavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  /** Outbound links open in a new tab and never read as the active tab. */
  external?: boolean;
}
