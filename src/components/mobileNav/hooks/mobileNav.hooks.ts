"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { COPY_FEEDBACK_MS } from "../constants/mobileNav.constants";

export const useCopyToClipboard = () => {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  const copy = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }

    setCopiedValue(value);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(
      () => setCopiedValue(null),
      COPY_FEEDBACK_MS,
    );
  }, []);

  return { copiedValue, copy };
};
