import Image from "next/image";
import ImageLightbox from "@/components/imageLightbox/ImageLightbox";
import { cn } from "@/lib/cn";
import ProjectPlaceholder from "./ProjectPlaceholder";
import {
  windowBadge,
  windowBar,
  windowCaption,
  windowDot,
  windowDots,
  windowImage,
  windowRoot,
  windowStage,
} from "./projectStage.variants";
import {
  WINDOW_DOTS,
  WINDOW_IMAGE_SIZES,
} from "../constants/projectStage.constants";
import type { ProjectWindowProps } from "../types/projectStage.types";

/** Desktop-window chrome around a screenshot, matching the card frame used on
 *  the Selected Work list. */
const ProjectWindow: React.FC<ProjectWindowProps> = ({
  caption,
  badge,
  image,
  imageAlt,
  placeholder,
  placeholderNote,
}) => {
  return (
    <div className={windowRoot}>
      <div className={windowBar}>
        <div className={windowDots}>
          {WINDOW_DOTS.map((dot) => (
            <span key={dot.id} className={cn(windowDot, dot.hoverClass)} />
          ))}
        </div>

        <div className="grow" />

        <span className={windowCaption}>{caption}</span>

        <div className="grow" />

        <span className={windowBadge}>{badge}</span>
      </div>

      <div className={cn(windowStage, "h-60 sm:h-80 lg:h-110")}>
        {image ? (
          <ImageLightbox src={image} alt={imageAlt}>
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes={WINDOW_IMAGE_SIZES}
              priority
              className={windowImage}
            />
          </ImageLightbox>
        ) : (
          <ProjectPlaceholder label={placeholder} note={placeholderNote} />
        )}
      </div>
    </div>
  );
};

export default ProjectWindow;
