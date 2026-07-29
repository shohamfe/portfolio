"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValue } from "motion/react";
import { NAV_FOOTPRINT, SHEET_PEEK_GAP } from "@/constants/mobile";

/** A drag shorter than this is a tap, not a gesture - the handle is also a
 *  button, and settling on release would fight its own click handler. */
const TAP_SLOP = 4;

/** Past this much travel the direction alone decides, so a short flick opens
 *  the sheet without having to drag it more than halfway. */
const INTENT_TRAVEL = 40;

/** Numeric px value of env(safe-area-inset-bottom) on this device. There is
 *  no JS API for it, so it is read the standard way: apply it to a real CSS
 *  property on a throwaway probe element and let the browser resolve the
 *  calc, then read the resolved value back out - getComputedStyle resolves
 *  a real property like paddingBottom to pixels, unlike a custom property,
 *  which would come back as the raw unresolved env() string. */
const readSafeAreaBottom = (): number => {
  const probe = document.createElement("div");
  probe.style.cssText = "position:fixed;visibility:hidden;padding-bottom:env(safe-area-inset-bottom)";
  document.body.appendChild(probe);
  const value = parseFloat(getComputedStyle(probe).paddingBottom) || 0;
  probe.remove();
  return value;
};

/** Drag-to-snap state for the bottom sheet: collapsed (peeking just above
 *  the floating nav) or expanded (flush with the top of the sheet's box).
 *
 *  y is 0 when expanded and `collapsed.current` when collapsed, so the
 *  collapsed offset has to be measured from the rendered height - the sheet
 *  is sized from SHEET_EXPANDED, which no constant here can predict.
 *
 *  The gesture is handled by hand rather than with Motion's `drag`: Motion's
 *  drag takes ownership of the x/y motion values it is given, which is the
 *  same trap DraggableFolder documents from the other side. Pointer capture
 *  keeps the gesture alive if the finger leaves the grip bar mid-drag.
 *
 *  Releasing only sets y to the snap target - the glide there is a CSS
 *  transition applied while not dragging (again as DraggableFolder does with
 *  left/top), so the drag itself still tracks the finger 1:1 and reduced
 *  motion is handled by the global rule rather than by a second code path.
 *
 *  hasSettled gates that transition until the first release or tap: applied
 *  from the start, it would animate the initial measurement too and the sheet
 *  would visibly slide down into its resting position on load. */
export const useSheetDrag = () => {
  const ref = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const collapsed = useRef(0);
  const gesture = useRef({ pointerY: 0, startY: 0, active: false });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasSettled, setHasSettled] = useState(false);

  const settle = useCallback(
    (next: boolean) => {
      setIsExpanded(next);
      setHasSettled(true);
      y.set(next ? 0 : collapsed.current);
    },
    [y]
  );

  useEffect(() => {
    const measure = () => {
      const height = ref.current?.offsetHeight ?? 0;
      const peek = NAV_FOOTPRINT + SHEET_PEEK_GAP + readSafeAreaBottom();
      collapsed.current = Math.max(height - peek, 0);

      if (!isExpanded) y.set(collapsed.current);
    };

    measure();
    window.addEventListener("resize", measure);

    return () => window.removeEventListener("resize", measure);
  }, [isExpanded, y]);

  const onPointerDown = (event: React.PointerEvent<HTMLElement>) => {
    gesture.current = { pointerY: event.clientY, startY: y.get(), active: true };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!gesture.current.active) return;

    const next = gesture.current.startY + event.clientY - gesture.current.pointerY;
    y.set(Math.min(Math.max(next, 0), collapsed.current));
  };

  const onPointerUp = (event: React.PointerEvent<HTMLElement>) => {
    if (!gesture.current.active) return;

    // Guarded: the capture is gone already if the pointer was cancelled by
    // the browser, and releasing one that is not held throws.
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    gesture.current.active = false;
    setIsDragging(false);

    // Let the handle's own click toggle instead when nothing really moved.
    const travel = event.clientY - gesture.current.pointerY;
    if (Math.abs(travel) < TAP_SLOP) return;

    if (Math.abs(travel) > INTENT_TRAVEL) {
      settle(travel < 0);
      return;
    }

    settle(y.get() < collapsed.current / 2);
  };

  const toggle = () => settle(!isExpanded);

  return {
    ref,
    y,
    isExpanded,
    isSliding: hasSettled && !isDragging,
    toggle,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
};
