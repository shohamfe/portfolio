import CaseStudyStage from "@/components/caseStudyStage/CaseStudyStage";
import MobileCaseStudy from "@/components/mobileCaseStudy/MobileCaseStudy";
import { buildPageGraph } from "@/components/structuredData/helpers/structuredData.helpers";
import StructuredData from "@/components/structuredData/StructuredData";
import ViewportSwitch from "@/components/viewportSwitch/ViewportSwitch";
import { CASE_STUDY_INDEX_HREF } from "@/constants/caseStudyPages";
import { resolveRoleLabel, ROLE_QUERY_PARAM, SITE } from "@/constants/site";
import { buildPageMetadata, CASE_STUDY_DESCRIPTION } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import { caseStudyPageRoot } from "./styles/caseStudyPage.variants";
import type { CaseStudyPageProps } from "./types/caseStudy.types";

const CASE_STUDY_TITLE = `Case Study - ${SITE.name}`;

export const metadata: Metadata = buildPageMetadata({
  path: CASE_STUDY_INDEX_HREF,
  title: CASE_STUDY_TITLE,
  description: CASE_STUDY_DESCRIPTION,
});

const graph = buildPageGraph({
  path: CASE_STUDY_INDEX_HREF,
  title: CASE_STUDY_TITLE,
  description: CASE_STUDY_DESCRIPTION,
});

const CaseStudyPage = async ({ searchParams }: CaseStudyPageProps) => {
  const params = await searchParams;
  const roleLabel = resolveRoleLabel(params[ROLE_QUERY_PARAM]);

  return (
    <>
      <StructuredData graph={graph} />

      <ViewportSwitch mobile={<MobileCaseStudy roleLabel={roleLabel} />}>
        <main id="case-study" className={caseStudyPageRoot}>
          <CaseStudyStage />
        </main>
      </ViewportSwitch>
    </>
  );
};

export default CaseStudyPage;
