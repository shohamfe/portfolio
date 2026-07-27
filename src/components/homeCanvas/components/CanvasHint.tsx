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
import { useAnimationFrameTimeout } from "../hooks/homeCanvas.hooks";
import type { CanvasHintProps, HintPhase } from "../types/homeCanvas.types";

const HINT_DURATION_MS = 10000;
const FADE_MS = 300;

/** Cursor-following pill shown for the first 10 seconds after Home mounts, or
 *  until the user first touches the canvas — whichever comes first. Nothing
 *  else on the page signals that the folders (and the canvas itself) are
 *  draggable, so this nudges first-time visitors toward finding out.
 *
 *  Runs on a three-phase machine (visible → leaving → gone) so the pill is
 *  genuinely removed from the DOM once it has faded, rather than lingering
 *  as an invisible element.
 *
 *  Both phase changes are timed with requestAnimationFrame rather than
 *  setTimeout. This is the actual fix for a bug where the pill would sit
 *  frozen on screen past its timeout and only vanish — instantly, with no
 *  fade — once the user clicked something. React had already applied the
 *  hidden state; the browser simply had not repainted, and the click forced
 *  the repaint that revealed it. setTimeout has no relationship to the paint
 *  cycle, so nothing guaranteed a frame would follow it. rAF only runs as
 *  part of producing a frame, so a state change scheduled from it is painted
 *  by construction. (Two earlier attempts blamed Motion — AnimatePresence,
 *  then an animate-target flip — and swapping both out for a plain CSS
 *  transition changed nothing, which is what ruled Motion out entirely.)
 *
 *  bottom-start, not bottom: plain "bottom" centres the pill horizontally on
 *  the cursor point, which is what kept it looking centred no matter how the
 *  offset was tuned. "-start" aligns the pill's left edge to the point, so it
 *  extends down and to the right. translate-x-3 then adds a small diagonal
 *  gap, and origin-top-left makes it grow out of the corner nearest the
 *  cursor rather than from its own middle. */
const CanvasHint: React.FC<CanvasHintProps> = ({ boundaryRef, dismissed }) => {
  const [phase, setPhase] = useState<HintPhase>("visible");

  // Whichever comes first: the timeout elapsing, or the user touching the
  // canvas. Once leaving, the timeout is disabled so it cannot re-trigger.
  useAnimationFrameTimeout(
    () => setPhase("leaving"),
    phase === "visible" ? HINT_DURATION_MS : null
  );

  useEffect(() => {
    if (dismissed) setPhase((current) => (current === "visible" ? "leaving" : current));
  }, [dismissed]);

  useAnimationFrameTimeout(() => setPhase("gone"), phase === "leaving" ? FADE_MS : null);

  const isOpen = phase === "visible";

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    placement: "bottom-start",
    middleware: [offsetMiddleware(16)],
  });

  const clientPoint = useClientPoint(context, { enabled: isOpen });
  const role = useRole(context, { role: "tooltip" });
  const { getFloatingProps } = useInteractions([clientPoint, role]);

  useEffect(() => {
    refs.setReference(boundaryRef.current);
  }, [refs, boundaryRef]);

  if (phase === "gone") return null;

  return (
    <FloatingPortal>
      <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
        <div
          className={cn(
            "pointer-events-none z-50 origin-top-left translate-x-3 scale-50 whitespace-nowrap rounded-full bg-accent px-3 py-1.5 font-ui text-small text-accent-foreground opacity-0 shadow-folder transition-[opacity,transform] duration-300 ease-out",
            isOpen && "scale-100 opacity-100"
          )}
        >
          Try moving things around
        </div>
      </div>
    </FloatingPortal>
  );
};

export default CanvasHint;
