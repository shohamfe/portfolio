import type { Metadata } from "next";
import { PiDownloadSimple } from "react-icons/pi";
import MobileResume from "@/components/mobileResume/MobileResume";
import ResumeStage from "@/components/resumeStage/ResumeStage";
import { stageHeaderBlur } from "@/components/resumeStage/components/resumeStage.variants";
import SiteNav from "@/components/siteNav/SiteNav";
import ViewportSwitch from "@/components/viewportSwitch/ViewportSwitch";
import { getSiteDescription, resolveRoleLabel, ROLE_QUERY_PARAM, SITE } from "@/constants/site";
import { ACCENT_SURFACE, PRESSABLE } from "@/lib/variants";
import { cn } from "@/lib/cn";

type ResumePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

/** See the matching generateMetadata in @/app/page.tsx - same `?role=frontend`
 *  swap, kept in sync so a shared link behaves the same on either page. */
export const generateMetadata = async ({ searchParams }: ResumePageProps): Promise<Metadata> => {
  const params = await searchParams;
  const description = getSiteDescription(resolveRoleLabel(params[ROLE_QUERY_PARAM]));

  return { title: `Resume - ${SITE.name}`, description };
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
 *  and the nav row anchors to the bottom. Download CV rides inside SiteNav's
 *  own icon row via its trailing slot, right after the Figma icon, rather
 *  than sitting off on its own at the row's far end.
 *
 *  pointer-events-none on the header, with -auto and w-fit back on each of
 *  its two children: the header is a full-width absolute overlay, so
 *  everything it covers - including the sticky cards off to the right - was
 *  unclickable, and a card dragged up under it could not be picked back up.
 *  The -auto alone is not enough, since both children are block-level in a
 *  stretch-aligned flex column and would still span the full width; w-fit
 *  shrinks each to its own content so only the title and the nav row itself
 *  actually take the cursor. */
const ResumePage: React.FC = () => {
  return (
    <ViewportSwitch mobile={<MobileResume />}>
      <main id="resume" className="dot-grid relative flex min-h-0 flex-1 flex-col overflow-hidden">
        <div id="resume-header-blur" aria-hidden className={stageHeaderBlur} />

        <header
          id="resume-header"
          className="pointer-events-none absolute inset-x-0 top-0 z-20 flex min-h-40 flex-col justify-between gap-4 px-10 pb-8 pt-12"
        >
          <h1 className="pointer-events-auto w-fit font-display text-h2 font-bold text-text-strong">{SITE.name}</h1>

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
