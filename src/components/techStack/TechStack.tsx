import { cn } from "@/lib/cn";
import { techStackRoot } from "./components/techStack.variants";
import { formatTechName } from "./helpers/techStack.helpers";
import type { TechStackProps } from "./types/techStack.types";

/** The bracketed stack line shared by the project card and the case study hero. */
const TechStack: React.FC<TechStackProps> = ({ tech, className }) => {
  return (
    <p className={cn(techStackRoot, className)}>
      {tech.map(formatTechName).join(" ")}
    </p>
  );
};

export default TechStack;
