import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { downloadProgressFill } from "../styles/resumeHeader.variants";
import type { DownloadProgressBarProps } from "../types/resumeHeader.types";

const DownloadProgressBar: React.FC<DownloadProgressBarProps> = ({
  progress,
}) => {
  return (
    <motion.span
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(downloadProgressFill)}
      style={progress === null ? undefined : { width: `${progress * 100}%` }}
    />
  );
};

export default DownloadProgressBar;
