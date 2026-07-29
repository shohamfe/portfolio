import type { ROLE_LABELS } from "@/constants/site";

export interface HomeIntroProps {
  className?: string;
  roleLabel: (typeof ROLE_LABELS)[keyof typeof ROLE_LABELS];
}
