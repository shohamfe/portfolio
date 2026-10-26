import { cn } from "@/lib/cn";
import HomeIntroHeader from "./components/HomeIntroHeader";
import HomeIntroScroll from "./components/HomeIntroScroll";
import { introRoot } from "./components/homeIntro.variants";
import type { HomeIntroProps } from "./types/homeIntro.types";

const HomeIntro: React.FC<HomeIntroProps> = ({ className }) => {
  return (
    <div id="home-intro" className={cn(introRoot, className)}>
      <HomeIntroHeader />

      <HomeIntroScroll />
    </div>
  );
};

export default HomeIntro;
