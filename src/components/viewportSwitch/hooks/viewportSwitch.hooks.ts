"use client";

import { MOBILE_QUERY } from "@/constants/mobile";
import { useLayoutEffect, useState } from "react";

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const sync = () => setIsMobile(mql.matches);

    sync();
    mql.addEventListener("change", sync);

    return () => mql.removeEventListener("change", sync);
  }, []);

  return isMobile;
};
