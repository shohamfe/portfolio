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

/** Cursor-following brief hint shown until the user interacts with the canvas. */
const CanvasHint: React.FC<CanvasHintProps> = ({ boundaryRef, dismissed }) => {
  const [phase, setPhase] = useState<HintPhase>("visible");

  useAnimationFrameTimeout(
    () => setPhase("leaving"),
    phase === "visible" ? HINT_DURATION_MS : null,
  );

  useEffect(() => {
    if (dismissed)
      setPhase((current) => (current === "visible" ? "leaving" : current));
  }, [dismissed]);

  useAnimationFrameTimeout(
    () => setPhase("gone"),
    phase === "leaving" ? FADE_MS : null,
  );

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
      <div
        ref={refs?.setFloating}
        style={floatingStyles}
        {...getFloatingProps()}
        className="pointer-events-none z-50"
      >
        <div
          className={cn(
            "pointer-events-none origin-top-left translate-x-3 scale-50 whitespace-nowrap rounded-full bg-accent px-3 py-1.5 font-ui text-small text-accent-foreground opacity-0 shadow-folder transition-[opacity,scale] duration-300 ease-out",
            isOpen && "scale-100 opacity-100",
          )}
        >
          Try moving things around
        </div>
      </div>
    </FloatingPortal>
  );
};

export default CanvasHint;
