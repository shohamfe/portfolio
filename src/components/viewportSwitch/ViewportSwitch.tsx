"use client";

import { useIsMobile } from "./hooks/viewportSwitch.hooks";
import type { ViewportSwitchProps } from "./types/viewportSwitch.types";

/** Picks one of two layouts by viewport width.
 *
 *  A JS switch rather than `hidden lg:block` on both trees: the two layouts
 *  are heavy (a 19-folder drag canvas each, Lenis, cursor tooltips), and a
 *  CSS-only switch would still build and run the desktop one on a phone.
 *  Both branches are passed in already rendered by a server component, so
 *  nothing here forces the pages themselves to become client components. */
const ViewportSwitch: React.FC<ViewportSwitchProps> = ({ mobile, children }) => {
  const isMobile = useIsMobile();

  return <>{isMobile ? mobile : children}</>;
};

export default ViewportSwitch;
