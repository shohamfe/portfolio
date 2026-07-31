import type { Metadata } from "next";
import HomeCanvas from "@/components/homeCanvas/HomeCanvas";
import { canvasIntroMask } from "@/components/homeCanvas/components/homeCanvas.variants";
import HomeIntro from "@/components/homeIntro/HomeIntro";
import MobileHome from "@/components/mobileHome/MobileHome";
import ViewportSwitch from "@/components/viewportSwitch/ViewportSwitch";
import {
  getRoleTitle,
  getSiteDescription,
  resolveRoleLabel,
  ROLE_QUERY_PARAM,
  SITE,
} from "@/constants/site";
import {
  homeCanvasSlot,
  homeIntroSlot,
  homePageRoot,
} from "./styles/homePage.variants";

type HomePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

/** Overrides root metadata per request from `searchParams`. */
export const generateMetadata = async ({
  searchParams,
}: HomePageProps): Promise<Metadata> => {
  const params = await searchParams;
  const roleLabel = resolveRoleLabel(params[ROLE_QUERY_PARAM]);
  const description = getSiteDescription(roleLabel);
  const title = `${SITE.name} - ${getRoleTitle(roleLabel)}`;

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description },
  };
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  const params = await searchParams;
  const roleLabel = resolveRoleLabel(params[ROLE_QUERY_PARAM]);

  return (
    <ViewportSwitch mobile={<MobileHome roleLabel={roleLabel} />}>
      <main id="home" className={homePageRoot}>
        <HomeIntro className={homeIntroSlot} roleLabel={roleLabel} />

        <div id="home-intro-mask" aria-hidden className={canvasIntroMask} />

        <HomeCanvas className={homeCanvasSlot} />
      </main>
    </ViewportSwitch>
  );
};

export default HomePage;
