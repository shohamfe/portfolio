"use client";

import { motion } from "motion/react";
import BottomSheet from "@/components/bottomSheet/BottomSheet";
import { useSheetDrag } from "@/components/bottomSheet/hooks/bottomSheet.hooks";
import MobileNav from "@/components/mobileNav/MobileNav";
import { mobileRoot, mobileScroll } from "@/components/mobileHome/components/mobileHome.variants";
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
 *  scroll region needs its own top safe-area clearance (resumeScrollTop).
 *
 *  The scroll region's bottom padding tracks sheet.coverage - see MobileHome
 *  for why a static clearance sized for the collapsed peek is not enough. */
const MobileResume: React.FC = () => {
  const sheet = useSheetDrag();

  return (
    <main id="resume" className={mobileRoot}>
      <motion.div
        id="mobile-resume-scroll"
        className={cn(mobileScroll, resumeScrollTop)}
        style={{ paddingBottom: sheet.coverage }}
      >
        <MobileTimeline />
      </motion.div>

      <BottomSheet sheet={sheet} title="Notes">
        <MobileNoteCanvas />
      </BottomSheet>

      <MobileNav />
    </main>
  );
};

export default MobileResume;
