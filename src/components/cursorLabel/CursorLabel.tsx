"use client";

import { useState } from "react";
import {
  FloatingPortal,
  offset,
  useClientPoint,
  useFloating,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { cn } from "@/lib/cn";
import type { CursorLabelProps } from "./types/cursorLabel.types";

/** Tooltip pill that follows the cursor while hovering `children`. The only
 *  JS-driven cursor element on the site - the arrow/hand/grab cursors are
 *  plain CSS, set in globals.css. Positioning and ARIA wiring come from
 *  @floating-ui/react rather than a hand-rolled mousemove listener. */
const CursorLabel: React.FC<CursorLabelProps> = ({ label, children, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(16)],
  });

  const hover = useHover(context);
  const clientPoint = useClientPoint(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, clientPoint, role]);

  return (
    <>
      <span ref={refs.setReference} {...getReferenceProps()} className="contents">
        {children}
      </span>

      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className={cn(
              "pointer-events-none rounded-full bg-accent px-3 py-1 text-small text-accent-foreground",
              className
            )}
            {...getFloatingProps()}
          >
            {label}
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default CursorLabel;
