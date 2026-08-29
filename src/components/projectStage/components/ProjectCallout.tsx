import { calloutRoot, calloutTag, calloutText } from "./projectStage.variants";
import { TODO_TAG } from "../constants/projectStage.constants";
import type { ProjectCalloutProps } from "../types/projectStage.types";

/** Marks copy that still has to come from Shoham, so an unfinished section is
 *  impossible to miss rather than quietly reading as finished. */
const ProjectCallout: React.FC<ProjectCalloutProps> = ({ text }) => {
  return (
    <div className={calloutRoot}>
      <p className={calloutText}>
        <span className={calloutTag}>{TODO_TAG}</span> {text}
      </p>
    </div>
  );
};

export default ProjectCallout;
