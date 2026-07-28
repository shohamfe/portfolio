"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";

/** Tracks every button/link click and every folder/sticky-card interaction
 *  with one delegated listener instead of instrumenting each component -
 *  draggable folders and cards both carry `data-grabbable`, so a single
 *  selector catches "clicks on any folder/card" GA4-side, summed by event
 *  name across every instance. */
const GAClickTracker: React.FC = () => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const card = target.closest<HTMLElement>("[data-grabbable]");
      if (card) {
        sendGAEvent("event", "card_click", { label: card.id });
        return;
      }

      const button = target.closest<HTMLElement>("button, a");
      if (button) {
        sendGAEvent("event", "button_click", {
          label: button.getAttribute("aria-label") ?? button.textContent?.trim() ?? button.id,
        });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
};

export default GAClickTracker;
