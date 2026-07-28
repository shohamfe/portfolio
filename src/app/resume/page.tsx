import type { Metadata } from "next";
import { PiDownloadSimple } from "react-icons/pi";
import ResumeStage from "@/components/resumeStage/ResumeStage";
import { stageHeaderBlur } from "@/components/resumeStage/components/resumeStage.variants";
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

/** The header overlays the stage rather than sitting above it in normal
 *  flow, so the timeline and cards genuinely scroll behind it - the same
 *  overlay treatment Home uses for its intro over the canvas.
 *
 *  The blur is a separate layer underneath the header, not a background on
 *  it: it extends lower and fades out, so the effect tapers off instead of
 *  ending on a hard edge, and the header's own text stays fully opaque
 *  because no mask is applied to it.
 *
 *  min-h + justify-between: the title anchors to the top of the header box
 *  and the nav/download row anchors to the bottom, rather than everything
 *  centring together in a single row. */
const ResumePage: React.FC = () => {
  return (
    <main id="resume" className="dot-grid relative flex min-h-0 flex-1 flex-col overflow-hidden">
      <div id="resume-header-blur" aria-hidden className={stageHeaderBlur} />

      <header
        id="resume-header"
        className="absolute inset-x-0 top-0 z-20 flex min-h-40 flex-col justify-between gap-4 px-10 pb-8 pt-12"
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
