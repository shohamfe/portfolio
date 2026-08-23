import { cn } from "@/lib/cn";
import type { CaseStudySectionIntroProps } from "../types/caseStudyStage.types";
import { introGroup, introLines, introTitle } from "./caseStudyStage.variants";

const CaseStudySectionIntro: React.FC<CaseStudySectionIntroProps> = ({
  title,
  lines,
  className,
}) => {
  return (
    <div className={cn(introGroup, className)}>
      <h2 className={introTitle}>{title}</h2>

      <div className={introLines}>
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default CaseStudySectionIntro;
