"use client";

import { useRef, useState } from "react";
import StickyCard from "@/components/stickyCard/StickyCard";
import TutorialSpotlight from "@/components/tutorialSpotlight/TutorialSpotlight";
import {
  RESUME_CARD_PLACEMENTS,
  TUTORIAL_NOTES_STAGE1_CARD_ID,
  TUTORIAL_NOTES_STAGE_1,
  TUTORIAL_NOTES_STORAGE_KEY,
} from "@/constants/resume";
import { RESUME_CARDS } from "@/content/resume";
import { cn } from "@/lib/cn";
import { cardFieldItem, cardFieldRoot } from "./resumeStage.variants";
import type { ResumeCardFieldProps } from "../types/resumeStage.types";

const CARDS_BY_ID = new Map(RESUME_CARDS.map((card) => [card.id, card]));

const ResumeCardField: React.FC<ResumeCardFieldProps> = ({
  boundaryRef,
  className,
}) => {
  const fieldRef = useRef<HTMLElement>(null);
  const stage1TargetRef = useRef<HTMLDivElement>(null);
  const [stage1Complete, setStage1Complete] = useState(false);

  return (
    <aside
      id="resume-card-field"
      ref={fieldRef}
      aria-label="Highlights"
      className={cn(cardFieldRoot, className)}
    >
      {RESUME_CARD_PLACEMENTS.map((placement) => {
        const card = CARDS_BY_ID.get(placement.id);
        if (!card) return null;

        const isTutorialTarget = placement.id === TUTORIAL_NOTES_STAGE1_CARD_ID;

        return (
          <div
            key={placement.id}
            className={cardFieldItem}
            style={{ top: `${placement.topPercent}%`, left: placement.left }}
          >
            <StickyCard
              card={card}
              rotation={placement.rotation}
              parallaxDepth={placement.depth}
              boundaryRef={boundaryRef}
              cardRef={isTutorialTarget ? stage1TargetRef : undefined}
              onDragCommit={
                isTutorialTarget ? () => setStage1Complete(true) : undefined
              }
            />
          </div>
        );
      })}

      <TutorialSpotlight
        containerRef={fieldRef}
        stage1TargetRef={stage1TargetRef}
        storageKey={TUTORIAL_NOTES_STORAGE_KEY}
        stage1={TUTORIAL_NOTES_STAGE_1}
        stage1Complete={stage1Complete}
      />
    </aside>
  );
};

export default ResumeCardField;
