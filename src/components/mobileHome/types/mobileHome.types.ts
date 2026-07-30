import type { ROLE_LABELS } from "@/constants/site";

export interface MobileHomeProps {
  /** Resolved from `?role=frontend`, same as the desktop intro. */
  roleLabel: (typeof ROLE_LABELS)[keyof typeof ROLE_LABELS];
}
