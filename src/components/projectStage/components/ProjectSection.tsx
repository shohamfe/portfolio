import {
  sectionBleed,
  sectionGrid,
  sectionIndex,
  sectionInner,
  sectionLabel,
  sectionTitle,
} from "./projectStage.variants";
import { cn } from "@/lib/cn";
import type { ProjectSectionProps } from "../types/projectStage.types";

/** Numbered spine section: label column on the left, content on the right. */
const ProjectSection: React.FC<ProjectSectionProps> = ({
  index,
  title,
  children,
}) => {
  return (
    <section className={cn(sectionBleed, "pt-14 lg:pt-22")}>
      <div className={cn(sectionInner, sectionGrid)}>
        <div className={sectionLabel}>
          <span className={sectionIndex}>{String(index).padStart(2, "0")}</span>
          <h2 className={sectionTitle}>{title}</h2>
        </div>

        {children}
      </div>
    </section>
  );
};

export default ProjectSection;
