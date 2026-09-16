import MobileResume from "@/components/mobileResume/MobileResume";
import ResumeStage from "@/components/resumeStage/ResumeStage";
import { buildPageGraph } from "@/components/structuredData/helpers/structuredData.helpers";
import StructuredData from "@/components/structuredData/StructuredData";
import ViewportSwitch from "@/components/viewportSwitch/ViewportSwitch";
import { resolveRoleLabel, ROLE_QUERY_PARAM, SITE } from "@/constants/site";
import { buildPageMetadata, getResumeDescription } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import { resumePageRoot } from "./styles/resumePage.variants";
import { ResumePageProps } from "./types/resume.types";

const RESUME_PATH = "/resume";
const RESUME_TITLE = `Resume - ${SITE.name}`;

/** See the matching generateMetadata in @/app/page.tsx - same `?role=frontend`
 *  swap, kept in sync so a shared link behaves the same on either page. */
export const generateMetadata = async ({
  searchParams,
}: ResumePageProps): Promise<Metadata> => {
  const params = await searchParams;
  const description = getResumeDescription(
    resolveRoleLabel(params[ROLE_QUERY_PARAM]),
  );

  return buildPageMetadata({
    path: RESUME_PATH,
    title: RESUME_TITLE,
    description,
  });
};

const ResumePage = async ({ searchParams }: ResumePageProps) => {
  const params = await searchParams;
  const roleLabel = resolveRoleLabel(params[ROLE_QUERY_PARAM]);

  const graph = buildPageGraph({
    path: RESUME_PATH,
    title: RESUME_TITLE,
    description: getResumeDescription(roleLabel),
  });

  return (
    <>
      <StructuredData graph={graph} />

      <ViewportSwitch mobile={<MobileResume roleLabel={roleLabel} />}>
        <main id="resume" className={resumePageRoot}>
          <ResumeStage roleLabel={roleLabel} />
        </main>
      </ViewportSwitch>
    </>
  );
};

export default ResumePage;
