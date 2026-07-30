"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValue } from "motion/react";
import { NAV_FOOTPRINT, SHEET_PEEK_GAP } from "@/constants/mobile";

const TAP_SLOP = 4;

const INTENT_TRAVEL = 40;

const readSafeAreaBottom = (): number => {
  const probe = document.createElement("div");
  probe.style.cssText =
    "position:fixed;visibility:hidden;padding-bottom:env(safe-area-inset-bottom)";
  document.body.appendChild(probe);
  const value = parseFloat(getComputedStyle(probe).paddingBottom) || 0;
  probe.remove();
  return value;
};

export const useSheetDrag = () => {
  const ref = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const coverage = useMotionValue(0);
  const collapsed = useRef(0);
  const total = useRef(0);
  const gesture = useRef({ pointerY: 0, startY: 0, active: false });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasSettled, setHasSettled] = useState(false);

  const syncCoverage = useCallback(() => {
    coverage.set(total.current - y.get());
  }, [coverage, y]);

  const settle = useCallback(
    (next: boolean) => {
      setIsExpanded(next);
      setHasSettled(true);
      y.set(next ? 0 : collapsed.current);
      syncCoverage();
    },
    [y, syncCoverage],
  );

  useEffect(() => {
    const measure = () => {
      const height = ref.current?.offsetHeight ?? 0;
      total.current = height;
      const peek = NAV_FOOTPRINT + SHEET_PEEK_GAP + readSafeAreaBottom();
      collapsed.current = Math.max(height - peek, 0);

      if (!isExpanded) y.set(collapsed.current);
      syncCoverage();
    };

    measure();
    window.addEventListener("resize", measure);

    return () => window.removeEventListener("resize", measure);
  }, [isExpanded, y, syncCoverage]);

  const onPointerDown = (event: React.PointerEvent<HTMLElement>) => {
    gesture.current = {
      pointerY: event.clientY,
      startY: y.get(),
      active: true,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!gesture.current.active) return;

    const next =
      gesture.current.startY + event.clientY - gesture.current.pointerY;
    y.set(Math.min(Math.max(next, 0), collapsed.current));
    syncCoverage();
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
    coverage,
    isExpanded,
    isSliding: hasSettled && !isDragging,
    toggle,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
};

export type SheetDragState = ReturnType<typeof useSheetDrag>;
