import type { Metadata } from "next";
import HomeCanvas from "@/components/homeCanvas/HomeCanvas";
import { canvasIntroMask } from "@/components/homeCanvas/components/homeCanvas.variants";
import HomeIntro from "@/components/homeIntro/HomeIntro";
import { getRoleTitle, getSiteDescription, resolveRoleLabel, ROLE_QUERY_PARAM, SITE } from "@/constants/site";

type HomePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

/** `?role=frontend` on this link swaps the role copy site-wide - see
 *  resolveRoleLabel in @/constants/site. searchParams only reaches page.js
 *  segments, not layout.js, so the root layout's static metadata is the
 *  fallback and this page overrides it per-request. */
export const generateMetadata = async ({ searchParams }: HomePageProps): Promise<Metadata> => {
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

/** Below lg, this is a plain stacked flow: intro, then canvas. At lg, the
 *  canvas becomes a full-bleed absolute layer spanning the whole page -
 *  including the area behind the intro - with an intro-shaped blurred mask
 *  between them so folders panning underneath read as glass, not clutter.
 *  Intro stays first in the DOM regardless of breakpoint, since z-index (not
 *  source order) controls the desktop stacking, and a screen reader should
 *  reach the real content before the decorative canvas either way. */
const HomePage = async ({ searchParams }: HomePageProps) => {
  const params = await searchParams;
  const roleLabel = resolveRoleLabel(params[ROLE_QUERY_PARAM]);

  return (
    <main
      id="home"
      className="relative flex min-h-0 flex-1 flex-col gap-16 overflow-hidden lg:block"
    >
      <HomeIntro className="lg:relative lg:z-20" roleLabel={roleLabel} />

      <div id="home-intro-mask" aria-hidden className={canvasIntroMask} />

      <HomeCanvas className="lg:absolute lg:inset-0 lg:z-0" />
    </main>
  );
};

export default HomePage;
