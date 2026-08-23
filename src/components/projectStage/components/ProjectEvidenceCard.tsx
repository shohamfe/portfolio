import Image from "next/image";
import ProjectPlaceholder from "./ProjectPlaceholder";
import {
  evidenceCaption,
  evidenceCard,
  evidenceStage,
  windowImage,
} from "./projectStage.variants";
import { EVIDENCE_IMAGE_SIZES } from "../constants/projectStage.constants";
import type { ProjectEvidenceCardProps } from "../types/projectStage.types";

const ProjectEvidenceCard: React.FC<ProjectEvidenceCardProps> = ({ item }) => {
  return (
    <figure className={evidenceCard}>
      <div className={evidenceStage}>
        {item.image ? (
          <Image
            src={item.image}
            alt={item.caption}
            fill
            sizes={EVIDENCE_IMAGE_SIZES}
            className={windowImage}
          />
        ) : (
          <ProjectPlaceholder label={item.placeholder} />
        )}
      </div>

      <figcaption className={evidenceCaption}>{item.caption}</figcaption>
    </figure>
  );
};

export default ProjectEvidenceCard;
