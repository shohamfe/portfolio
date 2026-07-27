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

/** min-h + justify-between: the title anchors to the top of the header box
 *  and the nav/download row anchors to the bottom, rather than everything
 *  centring together in a single row. */
const ResumePage: React.FC = () => {
  return (
    <main id="resume" className="dot-grid flex min-h-0 flex-1 flex-col overflow-hidden">
      <header
        id="resume-header"
        className="flex min-h-40 shrink-0 flex-col justify-between gap-4 px-10 pb-8 pt-12"
      >
        <h1 className="font-display text-h2 font-bold text-text-strong">{SITE.name}</h1>

        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <SiteNav />

          <a href={SITE.cvPath} download className={downloadButton}>
            <PiDownloadSimple aria-hidden />
            Download CV
          </a>
        </div>
      </header>

      <ResumeStage />
    </main>
  );
};

export default ResumePage;
