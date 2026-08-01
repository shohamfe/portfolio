import Button from "@/components/button/Button";
import Folder from "@/components/folder/Folder";
import Magnetic from "@/components/magnetic/Magnetic";
import Typewriter from "@/components/typewriter/Typewriter";
import { SITE } from "@/constants/site";
import { ERROR_MESSAGES } from "@/content/error";
import { ERROR_FOLDER } from "../constants/errorScreen.constants";
import {
  mobileCard,
  mobileHeroTitle,
  mobileMessage,
  mobileName,
  mobileRole,
  mobileTagline,
} from "./errorScreen.variants";

const MobileErrorCard: React.FC = () => {
  return (
    <Magnetic actionArea="global" range={300}>
      <div className={mobileCard}>
        <Magnetic>
          <div className={mobileHeroTitle}>
            <p className={mobileName}>{SITE.name}</p>
            <p className={mobileRole}>{SITE.role}</p>
            <p className={mobileTagline}>{SITE.tagline}</p>
          </div>
        </Magnetic>

        <Magnetic>
          <Folder folder={ERROR_FOLDER} />
        </Magnetic>

        <Magnetic>
          <h1 className={mobileMessage}>
            <Typewriter words={ERROR_MESSAGES} />
          </h1>
        </Magnetic>

        <Button href="/">Back to home</Button>
      </div>
    </Magnetic>
  );
};

export default MobileErrorCard;
