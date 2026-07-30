"use client";

import { useIsMobile } from "./hooks/viewportSwitch.hooks";
import type { ViewportSwitchProps } from "./types/viewportSwitch.types";

const ViewportSwitch: React.FC<ViewportSwitchProps> = ({
  mobile,
  children,
}) => {
  const isMobile = useIsMobile();

  return <>{isMobile ? mobile : children}</>;
};

export default ViewportSwitch;
