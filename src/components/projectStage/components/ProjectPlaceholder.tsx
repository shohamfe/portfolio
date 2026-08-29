import {
  placeholderBox,
  placeholderLabel,
  placeholderNote,
} from "./projectStage.variants";
import type { ProjectPlaceholderProps } from "../types/projectStage.types";

const ProjectPlaceholder: React.FC<ProjectPlaceholderProps> = ({
  label,
  note,
}) => {
  return (
    <div className={placeholderBox}>
      <span className={placeholderLabel}>{label}</span>
      {note && <span className={placeholderNote}>{note}</span>}
    </div>
  );
};

export default ProjectPlaceholder;
