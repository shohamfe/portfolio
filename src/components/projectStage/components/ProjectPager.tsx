import Link from "next/link";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";
import { cn } from "@/lib/cn";
import {
  pagerArrow,
  pagerBarRoot,
  pagerCardRoot,
  pagerDivider,
  pagerLabel,
  pagerRow,
  pagerTile,
  pagerTileNext,
  pagerTilePaddingBar,
  pagerTilePaddingCard,
  pagerTilePrevious,
  pagerTitle,
  sectionBleed,
  sectionInner,
} from "./projectStage.variants";
import { CASE_STUDY_ROUTE } from "../constants/projectStage.constants";
import type { ProjectPagerProps } from "../types/projectStage.types";

/** Loop navigation between case studies - every tile is a full-size link, not
 *  just the arrow or the title. Renders as a bordered card at the foot of a
 *  page, or as a slim, unfilled bar near the top - same component either way,
 *  so the two can't drift apart. */
const ProjectPager: React.FC<ProjectPagerProps> = ({
  previousProject,
  nextProject,
  variant,
}) => {
  if (!previousProject && !nextProject) return null;

  const tilePadding =
    variant === "card" ? pagerTilePaddingCard : pagerTilePaddingBar;

  return (
    <nav
      aria-label="Project navigation"
      className={cn(
        variant === "card" ? pagerCardRoot : pagerBarRoot,
        sectionBleed,
      )}
    >
      <div className={cn(sectionInner, pagerRow)}>
        {previousProject ? (
          <Link
            href={`${CASE_STUDY_ROUTE}/${previousProject.id}`}
            className={cn(pagerTile, tilePadding, pagerTilePrevious)}
          >
            <PiArrowLeft aria-hidden className={pagerArrow} />

            <span className="flex min-w-0 flex-col gap-1">
              <span className={pagerLabel}>Previous</span>
              <span className={pagerTitle}>{previousProject.title}</span>
            </span>
          </Link>
        ) : (
          <div className={pagerTile} />
        )}

        {previousProject && nextProject && <div className={pagerDivider} />}

        {nextProject ? (
          <Link
            href={`${CASE_STUDY_ROUTE}/${nextProject.id}`}
            className={cn(pagerTile, tilePadding, pagerTileNext)}
          >
            <span className="flex min-w-0 flex-col gap-1">
              <span className={pagerLabel}>Next</span>
              <span className={pagerTitle}>{nextProject.title}</span>
            </span>

            <PiArrowRight aria-hidden className={pagerArrow} />
          </Link>
        ) : (
          <div className={pagerTile} />
        )}
      </div>
    </nav>
  );
};

export default ProjectPager;
