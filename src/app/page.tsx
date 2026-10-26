import HomeCanvas from "@/components/homeCanvas/HomeCanvas";
import HomeIntro from "@/components/homeIntro/HomeIntro";
import MobileHome from "@/components/mobileHome/MobileHome";
import { buildPageGraph } from "@/components/structuredData/helpers/structuredData.helpers";
import StructuredData from "@/components/structuredData/StructuredData";
import ViewportSwitch from "@/components/viewportSwitch/ViewportSwitch";
import { SITE } from "@/constants/site";
import { buildPageMetadata } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import {
  homeCanvasSlot,
  homeIntroSlot,
  homePageRoot,
} from "./styles/homePage.variants";

const HOME_PATH = "/";

const HOME_TITLE = `${SITE.name} - ${SITE.role}`;

export const metadata: Metadata = buildPageMetadata({
  path: HOME_PATH,
  title: HOME_TITLE,
  description: SITE.description,
});

const graph = buildPageGraph({
  path: HOME_PATH,
  title: HOME_TITLE,
  description: SITE.description,
});

const HomePage = () => {
  return (
    <>
      <StructuredData graph={graph} />

      <ViewportSwitch mobile={<MobileHome />}>
        <main id="home" className={homePageRoot}>
          <HomeIntro className={homeIntroSlot} />

          <HomeCanvas className={homeCanvasSlot} />
        </main>
      </ViewportSwitch>
    </>
  );
};

export default HomePage;
