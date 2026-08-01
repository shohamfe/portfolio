import Button from "@/components/button/Button";
import Folder from "@/components/folder/Folder";
import Magnetic from "@/components/magnetic/Magnetic";
import Typewriter from "@/components/typewriter/Typewriter";
import { SITE } from "@/constants/site";
import { ERROR_MESSAGES } from "@/content/error";
import { ERROR_FOLDER } from "../constants/errorScreen.constants";
import {
  desktopCard,
  desktopHeroTitle,
  desktopMessage,
  desktopName,
  desktopRole,
  desktopTagline,
} from "./errorScreen.variants";

const DesktopErrorCard: React.FC = () => {
  return (
    <Magnetic actionArea="global" range={300}>
      <div id="card" className={desktopCard}>
        <Magnetic range={200}>
          <div className={desktopHeroTitle}>
            <div className="flex flex-col items-center">
              <p className={desktopName}>{SITE.name}</p>
              <p className={desktopRole}>{SITE.role}</p>
            </div>

            <p className={desktopTagline}>{SITE.tagline}</p>
          </div>
        </Magnetic>

        <Magnetic>
          <Folder folder={ERROR_FOLDER} />
        </Magnetic>

        <Magnetic range={200}>
          <h1 className={desktopMessage}>
            <Typewriter words={ERROR_MESSAGES} />
          </h1>
        </Magnetic>

        <Button href="/">Back to home</Button>
      </div>
    </Magnetic>
  );
};

export default DesktopErrorCard;
