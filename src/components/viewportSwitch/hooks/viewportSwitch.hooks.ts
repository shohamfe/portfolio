"use client";

import { useEffect, useState } from "react";
import { MOBILE_QUERY } from "@/constants/mobile";

/** True below the lg breakpoint. Starts false so server and first client
 *  render agree (there is no viewport to measure during SSR), then corrects
 *  on mount - a phone paints the desktop tree for a frame before swapping,
 *  which is the same trade the old /mobile redirect made.
 *
 *  Listens for changes rather than only measuring once, so rotating a tablet
 *  or resizing a window crosses the boundary live in either direction. */
export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const sync = () => setIsMobile(mql.matches);

    sync();
    mql.addEventListener("change", sync);

    return () => mql.removeEventListener("change", sync);
  }, []);

  return isMobile;
};
