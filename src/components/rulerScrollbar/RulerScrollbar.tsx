import { cn } from "@/lib/cn";
import { getActiveTickIndex, getTickDistanceBucket } from "./helpers/rulerScrollbar.helpers";
import { rulerRoot, rulerTickVariants } from "./components/rulerScrollbar.variants";
import type { RulerScrollbarProps } from "./types/rulerScrollbar.types";

/**
 * A vertical ruler of tick marks standing in for a scrollbar thumb. There is
 * no separate thumb element - instead every tick's width and colour are a
 * function of its distance (in tick count) from the tick nearest the current
 * scroll `progress`: distance 0 is the widest and darkest, width and colour
 * both step down at distance 1 and 2, and every tick from distance 3 outward
 * flattens to the same narrow, faint tick. That bulge of longer, darker
 * ticks is what reads as a thumb travelling down the ruler as `progress`
 * changes.
 *
 * Purely presentational: it renders off the `progress` prop alone and never
 * listens for scroll itself - the parent scroll container owns that state
 * and just passes the current position down.
 */
const RulerScrollbar: React.FC<RulerScrollbarProps> = ({ progress, tickCount = 48, className }) => {
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
