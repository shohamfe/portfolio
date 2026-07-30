import SiteNav from "@/components/siteNav/SiteNav";
import { getRoleTitle, SITE } from "@/constants/site";
import type { HomeIntroHeaderProps } from "../types/homeIntro.types";
import {
  introDivider,
  introFixed,
  introHeader,
  introName,
  introRole,
  introTagline,
} from "./homeIntro.variants";

const HomeIntroHeader: React.FC<HomeIntroHeaderProps> = ({ roleLabel }) => {
  return (
    <div id="home-intro-fixed" className={introFixed}>
      <header id="home-intro-header" className={introHeader}>
        <h1 id="home-intro-name" className={introName}>
          {SITE.name}
        </h1>

        <p id="home-intro-role" className={introRole}>
          {getRoleTitle(roleLabel)}
        </p>

        <p id="home-intro-tagline" className={introTagline}>
          {SITE.tagline}
        </p>

        <SiteNav className="mt-2" />
      </header>

      <hr className={introDivider} />
    </div>
  );
};

export default HomeIntroHeader;
