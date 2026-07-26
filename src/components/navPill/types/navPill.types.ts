import type { ReactNode } from "react";

export interface NavPillProps {
  href: string;
  active?: boolean;
  children: ReactNode;
  className?: string;
}
