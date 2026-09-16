import SiteNav from "@/components/siteNav/SiteNav";
import { SITE } from "@/constants/site";
import type { StageHeaderProps } from "../types/scrollStage.types";
import { headerName, headerRoot } from "./scrollStage.variants";

const StageHeader: React.FC<StageHeaderProps> = ({ pageHasOwnHeading }) => {
  return (
    <header id="stage-header" className={headerRoot}>
      {pageHasOwnHeading ? (
        <p className={headerName}>{SITE.name}</p>
      ) : (
        <h1 className={headerName}>{SITE.name}</h1>
      )}

      <SiteNav className="pointer-events-auto w-fit" />
    </header>
  );
};

export default StageHeader;
