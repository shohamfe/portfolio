import { stickyCardVariants } from "@/components/stickyCard/components/stickyCard.variants";
import { cn } from "@/lib/cn";
import type { ThreadNoteProps } from "../types/caseStudyStage.types";
import {
  threadNoteBody,
  threadNoteOverrides,
  threadNoteTitle,
} from "./caseStudyStage.variants";

const ThreadNote: React.FC<ThreadNoteProps> = ({ thread }) => {
  return (
    <div
      className={cn(
        stickyCardVariants({ color: thread.accent }),
        threadNoteOverrides,
      )}
    >
      <p className={threadNoteTitle}>{thread.title}</p>
      <p className={threadNoteBody}>{thread.body}</p>
    </div>
  );
};

export default ThreadNote;
