import HomeCanvas from "@/components/homeCanvas/HomeCanvas";
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
import type { Metadata } from "next";
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

        <HomeCanvas className={homeCanvasSlot} />
      </main>
    </ViewportSwitch>
  );
};

export default HomePage;
