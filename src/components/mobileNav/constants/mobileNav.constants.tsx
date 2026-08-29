import {
  PiFileMagnifyingGlass,
  PiFileMagnifyingGlassFill,
  PiHouse,
  PiHouseFill,
  PiReadCvLogo,
  PiReadCvLogoFill,
} from "react-icons/pi";
import type { MobileNavItem } from "../types/mobileNav.types";

export const NAV_ITEMS: readonly MobileNavItem[] = [
  {
    href: "/",
    label: "Home",
    icon: <PiHouse />,
    activeIcon: <PiHouseFill />,
  },
  {
    href: "/case-study",
    label: "Case Study",
    icon: <PiFileMagnifyingGlass />,
    activeIcon: <PiFileMagnifyingGlassFill />,
  },
  {
    href: "/resume",
    label: "Resume",
    icon: <PiReadCvLogo />,
    activeIcon: <PiReadCvLogoFill />,
  },
];

export const CONNECT_LABEL = "Connect";

export const COPIED_MESSAGE = "Copied to clipboard";

export const COPY_FEEDBACK_MS = 1600;

/** Clears the nav card, whose top edge sits 8px above the Connect button. */
export const PANEL_OFFSET = 20;

export const PANEL_EDGE_PADDING = 16;

export const PANEL_TRANSITION = { duration: 0.18, ease: "easeOut" } as const;
