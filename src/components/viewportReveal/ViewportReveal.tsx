"use client";

import { useLayoutEffect } from "react";

/** Undoes the pre-hydration hide in the root layout. It lives here, rendered
 *  after every page, rather than inside ViewportSwitch - pages without a mobile
 *  variant never mount one and would stay hidden forever at mobile widths. */
const ViewportReveal: React.FC = () => {
  useLayoutEffect(() => {
    document.documentElement.style.visibility = "";
  }, []);

  return null;
};

export default ViewportReveal;
