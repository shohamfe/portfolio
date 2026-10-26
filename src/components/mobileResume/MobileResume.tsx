"use client";

import { motion } from "motion/react";
import BottomSheet from "@/components/bottomSheet/BottomSheet";
import { useSheetDrag } from "@/components/bottomSheet/hooks/bottomSheet.hooks";
import {
  mobileRoot,
  mobileScroll,
} from "@/components/mobileHome/components/mobileHome.variants";
import MobileHero from "@/components/mobileHero/MobileHero";
import MobileNav from "@/components/mobileNav/MobileNav";
import DownloadCvButton from "@/components/resumeHeader/components/DownloadCvButton";
import MobileNoteCanvas from "./components/MobileNoteCanvas";
import MobileTimeline from "./components/MobileTimeline";
import { downloadRow } from "./components/mobileResume.variants";

const MobileResume: React.FC = () => {
  const sheet = useSheetDrag();

  return (
    <main id="resume" className={mobileRoot}>
      <MobileHero />

      <div className={downloadRow}>
        <DownloadCvButton className="min-h-12 justify-center" />
      </div>

      <motion.div
        id="mobile-resume-scroll"
        className={mobileScroll}
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
