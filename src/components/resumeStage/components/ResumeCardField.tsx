"use client";

import StickyCard from "@/components/stickyCard/StickyCard";
import { RESUME_CARD_PLACEMENTS } from "@/constants/resume";
import { RESUME_CARDS } from "@/content/resume";
import { cn } from "@/lib/cn";
import { cardFieldItem, cardFieldRoot } from "./resumeStage.variants";
import type { ResumeCardFieldProps } from "../types/resumeStage.types";

const CARDS_BY_ID = new Map(RESUME_CARDS.map((card) => [card.id, card]));

const ResumeCardField: React.FC<ResumeCardFieldProps> = ({
  boundaryRef,
  className,
}) => {
  return (
    <aside
      id="resume-card-field"
      aria-label="Highlights"
      className={cn(cardFieldRoot, className)}
    >
      {RESUME_CARD_PLACEMENTS.map((placement) => {
        const card = CARDS_BY_ID.get(placement.id);
        if (!card) return null;

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
            />
          </div>
        );
      })}
    </aside>
  );
};

export default ResumeCardField;
