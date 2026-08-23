import CaseStudyStage from "@/components/caseStudyStage/CaseStudyStage";
import MobileCaseStudy from "@/components/mobileCaseStudy/MobileCaseStudy";
import ViewportSwitch from "@/components/viewportSwitch/ViewportSwitch";
import { resolveRoleLabel, ROLE_QUERY_PARAM, SITE } from "@/constants/site";
import type { Metadata } from "next";
import { caseStudyPageRoot } from "./styles/caseStudyPage.variants";
import type { CaseStudyPageProps } from "./types/caseStudy.types";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: `Case Study - ${SITE.name}`,
    description: SITE.description,
  };
};

const CaseStudyPage = async ({ searchParams }: CaseStudyPageProps) => {
  const params = await searchParams;
  const roleLabel = resolveRoleLabel(params[ROLE_QUERY_PARAM]);

  return (
    <ViewportSwitch mobile={<MobileCaseStudy roleLabel={roleLabel} />}>
      <main id="case-study" className={caseStudyPageRoot}>
        <CaseStudyStage />
      </main>
    </ViewportSwitch>
  );
};

export default CaseStudyPage;
