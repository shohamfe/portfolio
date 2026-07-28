"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

/** Matches Tailwind's `lg` breakpoint used everywhere else on the site - below
 *  it the layout has no mobile design yet, so the visitor is bounced to the
 *  dedicated /mobile notice instead of a broken desktop layout. Listens for
 *  resize (not just initial load) so rotating a tablet or resizing a window
 *  crosses the boundary live in either direction. */
const MOBILE_QUERY = "(max-width: 1023px)";
const MOBILE_PATH = "/mobile";

const MobileRedirect: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);

    const sync = () => {
      if (mql.matches && pathname !== MOBILE_PATH) {
        router.replace(MOBILE_PATH);
      } else if (!mql.matches && pathname === MOBILE_PATH) {
        router.replace("/");
      }
    };

    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, [pathname, router]);

  return null;
};

export default MobileRedirect;
