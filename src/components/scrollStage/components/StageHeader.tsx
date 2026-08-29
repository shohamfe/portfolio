import SiteNav from "@/components/siteNav/SiteNav";
import { SITE } from "@/constants/site";
import { headerName, headerRoot } from "./scrollStage.variants";

const StageHeader: React.FC = () => {
  return (
    <header id="stage-header" className={headerRoot}>
      <h1 className={headerName}>{SITE.name}</h1>

      <SiteNav className="pointer-events-auto w-fit" />
    </header>
  );
};

export default StageHeader;
