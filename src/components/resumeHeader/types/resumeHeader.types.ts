export interface DownloadCvButtonProps {
  className?: string;
}

export interface DownloadProgressBarProps {
  /** null while total size is unknown - renders as an indeterminate pulse. */
  progress: number | null;
}
