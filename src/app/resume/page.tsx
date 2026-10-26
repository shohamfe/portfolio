import MobileResume from "@/components/mobileResume/MobileResume";
import ResumeStage from "@/components/resumeStage/ResumeStage";
import { buildPageGraph } from "@/components/structuredData/helpers/structuredData.helpers";
import StructuredData from "@/components/structuredData/StructuredData";
import ViewportSwitch from "@/components/viewportSwitch/ViewportSwitch";
import { SITE } from "@/constants/site";
import { buildPageMetadata, RESUME_DESCRIPTION } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import { resumePageRoot } from "./styles/resumePage.variants";

const RESUME_PATH = "/resume";
const RESUME_TITLE = `Resume - ${SITE.name}`;

export const metadata: Metadata = buildPageMetadata({
  path: RESUME_PATH,
  title: RESUME_TITLE,
  description: RESUME_DESCRIPTION,
});

const graph = buildPageGraph({
  path: RESUME_PATH,
  title: RESUME_TITLE,
  description: RESUME_DESCRIPTION,
});

const ResumePage = () => {
  return (
    <>
      <StructuredData graph={graph} />

      <ViewportSwitch mobile={<MobileResume />}>
        <main id="resume" className={resumePageRoot}>
          <ResumeStage />
        </main>
      </ViewportSwitch>
    </>
  );
};

export default ResumePage;
