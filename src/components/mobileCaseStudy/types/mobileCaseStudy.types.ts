import type { ROLE_LABELS } from "@/constants/site";

export interface MobileCaseStudyProps {
  roleLabel: (typeof ROLE_LABELS)[keyof typeof ROLE_LABELS];
}
