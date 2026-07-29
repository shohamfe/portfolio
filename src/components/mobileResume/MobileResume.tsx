import BottomSheet from "@/components/bottomSheet/BottomSheet";
import MobileNav from "@/components/mobileNav/MobileNav";
import { mobileRoot, mobileScroll } from "@/components/mobileHome/components/mobileHome.variants";
import { SCROLL_BOTTOM_CLEARANCE } from "@/constants/mobile";
import { cn } from "@/lib/cn";
import MobileNoteCanvas from "./components/MobileNoteCanvas";
import { resumeScrollTop } from "./components/mobileResume.variants";
import MobileTimeline from "./components/MobileTimeline";

/** Resume below the lg breakpoint: the timeline as one scrolling column with
 *  the sticky notes moved into a pull-up sheet.
 *
 *  The shell classes are shared with MobileHome rather than duplicated - both
 *  pages are the same three layers (scroll region, sheet, nav) and only their
 *  contents differ. Unlike Home, there is no fixed header here, so the
 *  scroll region needs its own top safe-area clearance (resumeScrollTop). */
const MobileResume: React.FC = () => {
  return (
    <main id="resume" className={mobileRoot}>
      <div
        id="mobile-resume-scroll"
        className={cn(mobileScroll, resumeScrollTop)}
        style={{ paddingBottom: SCROLL_BOTTOM_CLEARANCE }}
      >
        <MobileTimeline />
      </div>

      <BottomSheet title="Notes">
        <MobileNoteCanvas />
      </BottomSheet>

      <MobileNav />
    </main>
  );
};

export default MobileResume;
