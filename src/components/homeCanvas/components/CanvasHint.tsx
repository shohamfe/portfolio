"use client";

import { useEffect, useState } from "react";
import {
  FloatingPortal,
  offset as offsetMiddleware,
  useClientPoint,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { cn } from "@/lib/cn";
import type { CanvasHintProps } from "../types/homeCanvas.types";

const HINT_DURATION_MS = 10000;

/** Cursor-following pill shown for the first 10 seconds after Home mounts, or
 *  until the user first touches the canvas — whichever comes first. Nothing
 *  else on the page signals that the folders (and the canvas itself) are
 *  draggable, so this nudges first-time visitors toward finding out.
 *
 *  Plain CSS transition, deliberately not Motion. Two different Motion
 *  approaches were tried here (AnimatePresence mount/unmount, then a
 *  persistent element with an animate target flip) and both ended up frozen
 *  on screen after the timeout, only recovering once a click forced an
 *  unrelated re-render elsewhere. Whatever the exact cause, a plain CSS
 *  transition toggled by a class has no dependency on Motion's internal
 *  state machine at all, so there is nothing left for that to interfere
 *  with.
 *
 *  Position is a flat CSS translate rather than floating-ui's offset
 *  middleware: useClientPoint tracks a zero-size virtual point, and
 *  crossAxis alignment (meant to shift along the side of a real, sized
 *  reference) has no reliable meaning against a point with no size to
 *  offset from. mainAxis offset still supplies the vertical gap below the
 *  cursor; translate-x-3 supplies the rightward one directly. */
const CanvasHint: React.FC<CanvasHintProps> = ({ boundaryRef, dismissed }) => {
  const [timeElapsed, setTimeElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTimeElapsed(true), HINT_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  const open = !timeElapsed && !dismissed;

  const { refs, floatingStyles, context } = useFloating({
    open,
    placement: "bottom",
    middleware: [offsetMiddleware(16)],
  });

  const clientPoint = useClientPoint(context, { enabled: open });
  const role = useRole(context, { role: "tooltip" });
  const { getFloatingProps } = useInteractions([clientPoint, role]);

  useEffect(() => {
    refs.setReference(boundaryRef.current);
  }, [refs, boundaryRef]);

  return (
    <FloatingPortal>
      <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
        <div
          className={cn(
            "pointer-events-none z-50 translate-x-3 origin-top-left scale-50 whitespace-nowrap rounded-full bg-accent px-3 py-1.5 font-ui text-small text-accent-foreground opacity-0 shadow-folder transition-[opacity,transform] duration-300 ease-out",
            open && "scale-100 opacity-100"
          )}
        >
          Try moving things around
        </div>
      </div>
    </FloatingPortal>
  );
};

export default CanvasHint;
