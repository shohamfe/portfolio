import { cn } from "@/lib/cn";
import {
  getActiveTickIndex,
  getTickDistanceBucket,
} from "./helpers/rulerScrollbar.helpers";
import {
  rulerRoot,
  rulerTickVariants,
} from "./components/rulerScrollbar.variants";
import type { RulerScrollbarProps } from "./types/rulerScrollbar.types";

const RulerScrollbar: React.FC<RulerScrollbarProps> = ({
  progress,
  tickCount = 48,
  className,
}) => {
  const activeIndex = getActiveTickIndex(progress, tickCount);

  return (
    <div id="ruler-scrollbar" aria-hidden className={cn(rulerRoot, className)}>
      {Array.from({ length: tickCount }, (_, index) => {
        const distance = Math.abs(index - activeIndex);
        const bucket = getTickDistanceBucket(distance);

        return (
          <div
            key={index}
            id={`ruler-tick-${index}`}
            className={rulerTickVariants({ distance: bucket })}
          />
        );
      })}
    </div>
  );
};

export default RulerScrollbar;
