import HomeCanvas from "@/components/homeCanvas/HomeCanvas";
import { canvasIntroMask } from "@/components/homeCanvas/components/homeCanvas.variants";
import HomeIntro from "@/components/homeIntro/HomeIntro";

/** Below lg, this is a plain stacked flow: intro, then canvas. At lg, the
 *  canvas becomes a full-bleed absolute layer spanning the whole page —
 *  including the area behind the intro — with an intro-shaped blurred mask
 *  between them so folders panning underneath read as glass, not clutter.
 *  Intro stays first in the DOM regardless of breakpoint, since z-index (not
 *  source order) controls the desktop stacking, and a screen reader should
 *  reach the real content before the decorative canvas either way. */
const HomePage: React.FC = () => {
  return (
    <main
      id="home"
      className="dot-grid relative flex flex-1 flex-col gap-16 overflow-hidden lg:block"
    >
      <HomeIntro className="lg:relative lg:z-20" />

      <div id="home-intro-mask" aria-hidden className={canvasIntroMask} />

      <HomeCanvas className="lg:absolute lg:inset-0 lg:z-0" />
    </main>
  );
};

export default HomePage;
