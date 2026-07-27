import type { Metadata } from "next";
import { PiDownloadSimple } from "react-icons/pi";
import ResumeStage from "@/components/resumeStage/ResumeStage";
import SiteNav from "@/components/siteNav/SiteNav";
import { SITE } from "@/constants/site";
import { ACCENT_SURFACE, PRESSABLE } from "@/lib/variants";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: `Resume - ${SITE.name}`,
  description: SITE.description,
};

const downloadButton = cn(
  "inline-flex items-center gap-2 rounded-full px-4 py-2 font-ui text-small",
  ACCENT_SURFACE,
  PRESSABLE
);

const ResumePage: React.FC = () => {
  return (
    <main id="resume" className="dot-grid flex min-h-0 flex-1 flex-col overflow-hidden">
      <header id="resume-header" className="flex shrink-0 flex-wrap items-center gap-x-8 gap-y-4 px-10 pb-8 pt-12">
        <h1 className="font-display text-h2 font-bold text-text-strong">{SITE.name}</h1>

        <SiteNav />

        <a href={SITE.cvPath} download className={downloadButton}>
          <PiDownloadSimple aria-hidden />
          Download CV
        </a>
      </header>

      <ResumeStage />
    </main>
  );
};

export default ResumePage;
