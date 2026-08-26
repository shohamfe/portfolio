"use client";

import {
  stickyCardPerspective,
  stickyCardVariants,
} from "@/components/stickyCard/components/stickyCard.variants";
import { useStickyCardTilt } from "@/components/stickyCard/hooks/stickyCard.hooks";
import { cn } from "@/lib/cn";
import { motion } from "motion/react";
import { THREAD_NOTE_TILT_DEPTH } from "../constants/caseStudyStage.constants";
import type { ThreadNoteProps } from "../types/caseStudyStage.types";
import {
  threadNoteBody,
  threadNoteCard,
  threadNoteOverrides,
  threadNoteTitle,
} from "./caseStudyStage.variants";

const ThreadNote: React.FC<ThreadNoteProps> = ({ thread }) => {
  const { rotateX, rotateY } = useStickyCardTilt(THREAD_NOTE_TILT_DEPTH);

  return (
    <div className={cn(stickyCardPerspective, threadNoteOverrides)}>
      <motion.div
        className={cn(
          stickyCardVariants({ color: thread.accent }),
          threadNoteCard,
        )}
        style={{ rotateX, rotateY }}
      >
        <p className={threadNoteTitle}>{thread.title}</p>
        <p className={threadNoteBody}>{thread.body}</p>
      </motion.div>
    </div>
  );
};

export default ThreadNote;
