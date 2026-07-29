import BottomSheet from "@/components/bottomSheet/BottomSheet";
import MobileNav from "@/components/mobileNav/MobileNav";
import { mobileRoot, mobileScroll } from "@/components/mobileHome/components/mobileHome.variants";
import { RESUME_SHEET_PEEK } from "@/constants/mobile";
import MobileNoteCanvas from "./components/MobileNoteCanvas";
import MobileTimeline from "./components/MobileTimeline";

/** Resume below the lg breakpoint: the timeline as one scrolling column with
 *  the sticky notes moved into a pull-up sheet.
 *
 *  The shell classes are shared with MobileHome rather than duplicated - both
 *  pages are the same three layers (scroll region, sheet, nav) and only their
 *  contents differ. */
const MobileResume: React.FC = () => {
  return (
    <main id="resume" className={mobileRoot}>
      <div
        id="mobile-resume-scroll"
        className={mobileScroll}
        style={{ paddingBottom: RESUME_SHEET_PEEK }}
      >
        <MobileTimeline />
      </div>

      <BottomSheet peekHeight={RESUME_SHEET_PEEK} title="Notes">
        <MobileNoteCanvas />
      </BottomSheet>

      <MobileNav />
    </main>
  );
};

export default MobileResume;
