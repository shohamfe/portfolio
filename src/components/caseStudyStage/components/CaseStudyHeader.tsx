import SiteNav from "@/components/siteNav/SiteNav";
import { SITE } from "@/constants/site";
import { headerName, headerRoot } from "./caseStudyStage.variants";

const CaseStudyHeader: React.FC = () => {
  return (
    <header id="case-study-header" className={headerRoot}>
      <h1 className={headerName}>{SITE.name}</h1>

      <SiteNav className="pointer-events-auto w-fit" />
    </header>
  );
};

export default CaseStudyHeader;
