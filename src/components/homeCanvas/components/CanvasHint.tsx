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
import { motion } from "motion/react";
import type { CanvasHintProps } from "../types/homeCanvas.types";

const HINT_DURATION_MS = 10000;

/** Cursor-following pill shown for the first 10 seconds after Home mounts, or
 *  until the user first touches the canvas — whichever comes first. Nothing
 *  else on the page signals that the folders (and the canvas itself) are
 *  draggable, so this nudges first-time visitors toward finding out.
 *
 *  Sits below and to the right of the cursor: the offset middleware's
 *  crossAxis value pushes it sideways from the default bottom placement.
 *
 *  Positioning and the grow/shrink animation are deliberately on two
 *  different elements. floating-ui writes its own `transform` into
 *  floatingStyles for positioning; Motion's `animate` also wants to own
 *  `transform` for scale — same element, same property, one wins silently.
 *
 *  The pill is always mounted; only its opacity/scale target changes. An
 *  AnimatePresence-based mount/unmount was tried first and would freeze on
 *  screen after the timeout instead of shrinking away, only recovering once
 *  a click forced an unrelated re-render — conditionally mounting depends on
 *  AnimatePresence correctly noticing the child disappear, and something
 *  about this tree wasn't triggering that reliably. Flipping a persistent
 *  element's `animate` target has no such dependency: Motion re-runs the
 *  transition whenever the target values differ from before, mount state
 *  aside, so there's nothing to fail to notice. */
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
    middleware: [offsetMiddleware({ mainAxis: 16, crossAxis: 16 })],
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
        <motion.div
          animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.4 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="pointer-events-none z-50 whitespace-nowrap rounded-full bg-accent px-3 py-1.5 font-ui text-small text-accent-foreground shadow-folder"
        >
          Try moving things around
        </motion.div>
      </div>
    </FloatingPortal>
  );
};

export default CanvasHint;
