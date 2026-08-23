"use client";

import { getCvUrl, SITE } from "@/constants/site";
import { cn } from "@/lib/cn";
import { AnimatePresence } from "motion/react";
import { PiDownloadSimple } from "react-icons/pi";
import Magnetic from "../../magnetic/Magnetic";
import { useCvDownload } from "../hooks/resumeHeader.hooks";
import { downloadButton } from "../styles/resumeHeader.variants";
import type { DownloadCvButtonProps } from "../types/resumeHeader.types";
import DownloadProgressBar from "./DownloadProgressBar";

const DownloadCvButton: React.FC<DownloadCvButtonProps> = ({
  roleLabel,
  className,
}) => {
  const { isDownloading, progress, download } = useCvDownload();

  return (
    <Magnetic>
      <button
        type="button"
        disabled={isDownloading}
        onClick={() =>
          download(
            getCvUrl(roleLabel),
            `${SITE.name} - ${roleLabel.primary} CV.pdf`,
          )
        }
        className={cn(
          downloadButton,
          isDownloading && "animate-pulse",
          className,
        )}
      >
        <Magnetic>
          <span className="flex items-center gap-2">
            <PiDownloadSimple aria-hidden />

            {isDownloading ? "Downloading..." : "Download CV"}
          </span>
        </Magnetic>

        <AnimatePresence>
          <DownloadProgressBar progress={progress} />
        </AnimatePresence>
      </button>
    </Magnetic>
  );
};

export default DownloadCvButton;
