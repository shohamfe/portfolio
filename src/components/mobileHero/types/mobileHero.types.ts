import type { ROLE_LABELS } from "@/constants/site";

export interface MobileHeroProps {
  roleLabel: (typeof ROLE_LABELS)[keyof typeof ROLE_LABELS];
}
