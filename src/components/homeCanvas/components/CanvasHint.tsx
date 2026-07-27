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
import type { CanvasHintProps } from "../types/homeCanvas.types";

const HINT_DURATION_MS = 5000;

/** Cursor-following pill shown for the first 5 seconds after Home mounts, or
 *  until the user first touches the canvas — whichever comes first. Nothing
 *  else on the page signals that the folders (and the canvas itself) are
 *  draggable, so this nudges first-time visitors toward finding out. */
const CanvasHint: React.FC<CanvasHintProps> = ({ boundaryRef, dismissed }) => {
  const [timeElapsed, setTimeElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTimeElapsed(true), HINT_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  const open = !timeElapsed && !dismissed;

  const { refs, floatingStyles, context } = useFloating({
    open,
    middleware: [offsetMiddleware(20)],
  });

  const clientPoint = useClientPoint(context, { enabled: open });
  const role = useRole(context, { role: "tooltip" });
  const { getFloatingProps } = useInteractions([clientPoint, role]);

  useEffect(() => {
    refs.setReference(boundaryRef.current);
  }, [refs, boundaryRef]);

  if (!open) return null;

  return (
    <FloatingPortal>
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        {...getFloatingProps()}
        className="pointer-events-none z-50 whitespace-nowrap rounded-full bg-accent px-3 py-1.5 font-ui text-small text-accent-foreground shadow-folder"
      >
        Try moving things around
      </div>
    </FloatingPortal>
  );
};

export default CanvasHint;
