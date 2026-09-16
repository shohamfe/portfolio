import ScrollStage from "@/components/scrollStage/ScrollStage";
import CaseStudyContent from "./components/CaseStudyContent";
import {
  stageRootOverrides,
  stageScrollerOverrides,
} from "./components/caseStudyStage.variants";

const CaseStudyStage: React.FC = () => {
  return (
    <ScrollStage
      id="case-study"
      className={stageRootOverrides}
      scrollerClassName={stageScrollerOverrides}
    >
      <CaseStudyContent />
    </ScrollStage>
  );
};

export default CaseStudyStage;
