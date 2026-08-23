"use client";

import { usePathname } from "next/navigation";
import MobileNavConnect from "./components/MobileNavConnect";
import MobileNavItem from "./components/MobileNavItem";
import { navCard, navRoot } from "./components/mobileNav.variants";
import { NAV_ITEMS } from "./constants/mobileNav.constants";

const MobileNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" id="mobile-nav" className={navRoot}>
      <div className={navCard} id="mobile-nav-card">
        {NAV_ITEMS.map((item) => (
          <MobileNavItem
            key={item.href}
            item={item}
            active={pathname === item.href}
          />
        ))}

        <MobileNavConnect />
      </div>
    </nav>
  );
};

export default MobileNav;
