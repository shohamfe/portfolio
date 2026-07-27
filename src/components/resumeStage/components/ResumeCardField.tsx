"use client";

import { useRef } from "react";
import StickyCard from "@/components/stickyCard/StickyCard";
import { RESUME_CARD_PLACEMENTS } from "@/constants/resume";
import { RESUME_CARDS } from "@/content/resume";
import { cn } from "@/lib/cn";
import { cardFieldItem, cardFieldRoot } from "./resumeStage.variants";
import type { ResumeCardFieldProps } from "../types/resumeStage.types";

const CARDS_BY_ID = new Map(RESUME_CARDS.map((card) => [card.id, card]));

/** The scattered sticky notes beside the timeline. Placement comes from
 *  RESUME_CARD_PLACEMENTS; a placement naming a card that no longer exists is
 *  skipped rather than crashing the page.
 *
 *  Each card's drag is bounded to this field's own box, so a card can never
 *  be pulled outside the page and force a scrollbar in either direction.
 *
 *  Labelled rather than aria-hidden: only the scattering is decorative. Each
 *  note carries a claim that appears nowhere else on the page, so hiding the
 *  field would drop that content from assistive tech entirely. */
const ResumeCardField: React.FC<ResumeCardFieldProps> = ({ className }) => {
  const fieldRef = useRef<HTMLElement>(null);

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

        return (
          <div
            key={placement.id}
            className={cardFieldItem}
            style={{ top: placement.top, left: placement.left }}
          >
            <StickyCard
              card={card}
              rotation={placement.rotation}
              parallaxDepth={placement.depth}
              boundaryRef={fieldRef}
            />
          </div>
        );
      })}
    </aside>
  );
};

export default ResumeCardField;
