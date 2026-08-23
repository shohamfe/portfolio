import Link from "next/link";
import { PiArrowRight } from "react-icons/pi";
import { cn } from "@/lib/cn";
import {
  nextLabel,
  nextRoot,
  nextRow,
  nextTitle,
  sectionBleed,
  sectionInner,
} from "./projectStage.variants";
import { CASE_STUDY_ROUTE } from "../constants/projectStage.constants";
import type { ProjectNextProps } from "../types/projectStage.types";

const ProjectNext: React.FC<ProjectNextProps> = ({ project }) => {
  return (
    <div className={cn(nextRoot, sectionBleed)}>
      <div className={cn(sectionInner, nextRow)}>
        <div className="flex flex-col gap-1">
          <span className={nextLabel}>Next</span>

          <Link
            href={`${CASE_STUDY_ROUTE}/${project.id}`}
            className={nextTitle}
          >
            {project.title}
          </Link>
        </div>

        <div className="grow" />

        <PiArrowRight aria-hidden className="text-text-strong text-2xl" />
      </div>
    </div>
  );
};

export default ProjectNext;
