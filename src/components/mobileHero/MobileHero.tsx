import { getRoleTitle, SITE } from "@/constants/site";
import type { MobileHeroProps } from "./types/mobileHero.types";
import {
  heroDivider,
  heroFixed,
  heroHeader,
  heroName,
  heroRole,
  heroTagline,
} from "./components/mobileHero.variants";

/** Fixed name/role/tagline header shared by Home and Resume, with the
 *  divider marking the start of the scrolling content below it. */
const MobileHero: React.FC<MobileHeroProps> = ({
  roleLabel,
  pageHasOwnHeading,
}) => {
  return (
    <div className={heroFixed}>
      <header className={heroHeader}>
        {pageHasOwnHeading ? (
          <p className={heroName}>{SITE.name}</p>
        ) : (
          <h1 className={heroName}>{SITE.name}</h1>
        )}

        <p className={heroRole}>{getRoleTitle(roleLabel)}</p>

        <p className={heroTagline}>{SITE.tagline}</p>
      </header>

      <hr className={heroDivider} />
    </div>
  );
};

export default MobileHero;
