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
import { AnimatePresence, motion } from "motion/react";
import type { CanvasHintProps } from "../types/homeCanvas.types";

const HINT_DURATION_MS = 10000;

/** Cursor-following pill shown for the first 10 seconds after Home mounts, or
 *  until the user first touches the canvas — whichever comes first. Nothing
 *  else on the page signals that the folders (and the canvas itself) are
 *  draggable, so this nudges first-time visitors toward finding out.
 *
 *  Positioning and the grow/shrink animation are deliberately on two
 *  different elements. floating-ui writes its own `transform` into
 *  floatingStyles for positioning; Motion's `animate` also wants to own
 *  `transform` for scale. Putting both on the same element means one
 *  silently overwrites the other. The outer div (floating-ui's ref target)
 *  stays mounted for the component's whole lifetime so AnimatePresence can
 *  actually see the inner content leave and animate the shrink-out before
 *  removing it — conditionally rendering the outer too would unmount both
 *  in the same tick and skip the exit animation entirely. */
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

  return (
    <FloatingPortal>
      <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="pointer-events-none z-50 whitespace-nowrap rounded-full bg-accent px-3 py-1.5 font-ui text-small text-accent-foreground shadow-folder"
            >
              Try moving things around
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FloatingPortal>
  );
};

export default CanvasHint;
