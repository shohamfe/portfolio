import MobileResume from "@/components/mobileResume/MobileResume";
import ResumeStage from "@/components/resumeStage/ResumeStage";
import ViewportSwitch from "@/components/viewportSwitch/ViewportSwitch";
import {
  getSiteDescription,
  resolveRoleLabel,
  ROLE_QUERY_PARAM,
  SITE,
} from "@/constants/site";
import type { Metadata } from "next";
import { resumePageRoot } from "./styles/resumePage.variants";
import { ResumePageProps } from "./types/resume.types";

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
        <ResumeStage />
      </main>
    </ViewportSwitch>
  );
};

export default ResumePage;
