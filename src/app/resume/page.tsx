import type { Metadata } from "next";
import { PiDownloadSimple } from "react-icons/pi";
import MobileResume from "@/components/mobileResume/MobileResume";
import ResumeStage from "@/components/resumeStage/ResumeStage";
import { stageHeaderBlur } from "@/components/resumeStage/components/resumeStage.variants";
import SiteNav from "@/components/siteNav/SiteNav";
import ViewportSwitch from "@/components/viewportSwitch/ViewportSwitch";
import {
  getSiteDescription,
  resolveRoleLabel,
  ROLE_QUERY_PARAM,
  SITE,
} from "@/constants/site";
import { ACCENT_SURFACE, PRESSABLE } from "@/lib/variants";
import { cn } from "@/lib/cn";

type ResumePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

/** See the matching generateMetadata in @/app/page.tsx - same `?role=frontend`
 *  swap, kept in sync so a shared link behaves the same on either page. */
export const generateMetadata = async ({
  searchParams,
}: ResumePageProps): Promise<Metadata> => {
  const params = await searchParams;
  const description = getSiteDescription(
    resolveRoleLabel(params[ROLE_QUERY_PARAM]),
  );

  return { title: `Resume - ${SITE.name}`, description };
};

const downloadButton = cn(
  "inline-flex items-center gap-2 rounded-full px-4 py-2 font-ui text-small",
  ACCENT_SURFACE,
  PRESSABLE,
);

const ResumePage: React.FC = () => {
  return (
    <ViewportSwitch mobile={<MobileResume />}>
      <main
        id="resume"
        className="dot-grid relative flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <div id="resume-header-blur" aria-hidden className={stageHeaderBlur} />

        <header
          id="resume-header"
          className="pointer-events-none absolute inset-x-0 top-0 z-20 flex min-h-40 flex-col justify-between gap-4 px-10 pb-8 pt-12"
        >
          <h1 className="pointer-events-auto w-fit font-display text-h2 font-bold text-text-strong">
            {SITE.name}
          </h1>

          <SiteNav
            className="pointer-events-auto w-fit"
            trailing={
              <a href={SITE.cvPath} download className={downloadButton}>
                <PiDownloadSimple aria-hidden />
                Download CV
              </a>
            }
          />
        </header>

        <ResumeStage />
      </main>
    </ViewportSwitch>
  );
};

export default ResumePage;
