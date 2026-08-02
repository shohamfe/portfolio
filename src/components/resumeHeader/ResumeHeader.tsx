"use client";

import { getCvUrl, SITE } from "@/constants/site";
import { AnimatePresence } from "motion/react";
import { PiDownloadSimple } from "react-icons/pi";
import Magnetic from "../magnetic/Magnetic";
import SiteNav from "../siteNav/SiteNav";
import DownloadProgressBar from "./components/DownloadProgressBar";
import { useCvDownload } from "./hooks/resumeHeader.hooks";
import {
  downloadButton,
  resumeHeaderName,
  resumeHeaderRoot,
} from "./styles/resumeHeader.variants";
import type { ResumeHeaderProps } from "./types/resumeHeader.types";
import { cn } from "@/lib/cn";

const ResumeHeader: React.FC<ResumeHeaderProps> = ({ roleLabel }) => {
  const { isDownloading, progress, download } = useCvDownload();

  return (
    <header id="resume-header" className={resumeHeaderRoot}>
      <h1 className={resumeHeaderName}>{SITE.name}</h1>

      <SiteNav
        className="pointer-events-auto w-fit"
        trailing={
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
                isDownloading && "w-full animate-pulse",
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
        }
      />
    </header>
  );
};

export default ResumeHeader;
