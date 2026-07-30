import MobileResume from "@/components/mobileResume/MobileResume";
import ResumeHeader from "@/components/resumeHeader/ResumeHeader";
import ResumeStage from "@/components/resumeStage/ResumeStage";
import { stageHeaderBlur } from "@/components/resumeStage/components/resumeStage.variants";
import ViewportSwitch from "@/components/viewportSwitch/ViewportSwitch";
import {
  getSiteDescription,
  resolveRoleLabel,
  ROLE_QUERY_PARAM,
  SITE,
} from "@/constants/site";
import type { Metadata } from "next";
import { resumePageRoot } from "./styles/resumePage.variants";

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

const ResumePage = async ({ searchParams }: ResumePageProps) => {
  const params = await searchParams;
  const roleLabel = resolveRoleLabel(params[ROLE_QUERY_PARAM]);

  return (
    <ViewportSwitch mobile={<MobileResume roleLabel={roleLabel} />}>
      <main id="resume" className={resumePageRoot}>
        <div id="resume-header-blur" aria-hidden className={stageHeaderBlur} />

        <ResumeHeader />

        <ResumeStage />
      </main>
    </ViewportSwitch>
  );
};

export default ResumePage;
