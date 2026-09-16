import type { ROLE_LABELS } from "@/constants/site";
import type { ProjectStageProps } from "@/components/projectStage/types/projectStage.types";

export interface MobileProjectProps extends ProjectStageProps {
  roleLabel: (typeof ROLE_LABELS)[keyof typeof ROLE_LABELS];
}
