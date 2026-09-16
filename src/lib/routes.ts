/** A nav item for "/" only matches the exact home route; every other item
 *  also matches its nested routes, e.g. "/case-study" matches
 *  "/case-study/procurement-planning-system". */
export const isRouteActive = (pathname: string, routeHref: string): boolean =>
  routeHref === "/"
    ? pathname === "/"
    : pathname === routeHref || pathname.startsWith(`${routeHref}/`);
