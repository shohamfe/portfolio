"use client";

import { motion } from "motion/react";
import BottomSheet from "@/components/bottomSheet/BottomSheet";
import { useSheetDrag } from "@/components/bottomSheet/hooks/bottomSheet.hooks";
import MobileNav from "@/components/mobileNav/MobileNav";
import {
  mobileRoot,
  mobileScroll,
} from "@/components/mobileHome/components/mobileHome.variants";
import { cn } from "@/lib/cn";
import MobileNoteCanvas from "./components/MobileNoteCanvas";
import { resumeScrollTop } from "./components/mobileResume.variants";
import MobileTimeline from "./components/MobileTimeline";

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
        <MobileNoteCanvas isExpanded={sheet.isExpanded} />
      </BottomSheet>

      <MobileNav />
    </main>
  );
};

export default MobileResume;
