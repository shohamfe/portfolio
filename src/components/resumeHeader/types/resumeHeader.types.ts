import type { ROLE_LABELS } from "@/constants/site";

export interface ResumeHeaderProps {
  roleLabel: (typeof ROLE_LABELS)[keyof typeof ROLE_LABELS];
}

export interface DownloadCvButtonProps {
  roleLabel: (typeof ROLE_LABELS)[keyof typeof ROLE_LABELS];
  className?: string;
}

export interface DownloadProgressBarProps {
  /** null while total size is unknown - renders as an indeterminate pulse. */
  progress: number | null;
}
