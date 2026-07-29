"use client";

import { LINKS } from "@/constants/site";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import {
  PiFigmaLogo,
  PiGithubLogo,
  PiHouse,
  PiReadCvLogo,
} from "react-icons/pi";
import {
  navCard,
  navDivider,
  navIconWrap,
  navItem,
  navLabel,
  navRoot,
} from "./components/mobileNav.variants";
import type { MobileNavItem } from "./types/mobileNav.types";

const NAV_ITEMS: readonly MobileNavItem[] = [
  { href: "/", label: "Home", icon: <PiHouse /> },
  { href: "/resume", label: "Resume", icon: <PiReadCvLogo /> },
  {
    href: LINKS.github,
    label: "Github",
    icon: <PiGithubLogo />,
    external: true,
  },
  { href: LINKS.figma, label: "Figma", icon: <PiFigmaLogo />, external: true },
];

const MobileNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" id="mobile-nav" className={navRoot}>
      <div className={navCard} id="mobile-nav-card">
        {NAV_ITEMS.map((item, index) => {
          const active = !item.external && pathname === item.href;

          const content = (
            <>
              <span aria-hidden className={navIconWrap({ active })}>
                {item.icon}
              </span>

              <span className={navLabel({ active })}>{item.label}</span>
            </>
          );

          return (
            <Fragment key={item.href}>
              {index === 2 && <span aria-hidden className={navDivider} />}

              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={navItem}
                >
                  {content}
                </a>
              ) : (
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={navItem}
                >
                  {content}
                </Link>
              )}
            </Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
