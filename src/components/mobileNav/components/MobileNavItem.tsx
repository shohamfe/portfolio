import Link from "next/link";
import type { MobileNavItemProps } from "../types/mobileNav.types";
import { navIconWrap, navItem, navLabel } from "./mobileNav.variants";

const MobileNavItem: React.FC<MobileNavItemProps> = ({ item, active }) => (
  <Link
    href={item.href}
    aria-current={active ? "page" : undefined}
    className={navItem}
  >
    <span aria-hidden className={navIconWrap({ active })}>
      {active ? item.activeIcon : item.icon}
    </span>

    <span className={navLabel({ active })}>{item.label}</span>
  </Link>
);

export default MobileNavItem;
