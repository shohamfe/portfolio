"use client";

import { SITE } from "@/constants/site";
import SiteNav from "../siteNav/SiteNav";
import DownloadCvButton from "./components/DownloadCvButton";
import {
  resumeHeaderName,
  resumeHeaderRoot,
} from "./styles/resumeHeader.variants";
import type { ResumeHeaderProps } from "./types/resumeHeader.types";

const ResumeHeader: React.FC<ResumeHeaderProps> = ({ roleLabel }) => {
  return (
    <header id="resume-header" className={resumeHeaderRoot}>
      <h1 className={resumeHeaderName}>{SITE.name}</h1>

      <SiteNav
        className="pointer-events-auto w-fit"
        trailing={<DownloadCvButton roleLabel={roleLabel} />}
      />
    </header>
  );
};

export default ResumeHeader;
