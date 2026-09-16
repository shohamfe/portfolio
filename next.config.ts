import type { NextConfig } from "next";
import { networkInterfaces } from "os";
import { SITE_PAGES } from "./src/constants/site";

/** Every non-internal IPv4 address this machine currently has, across every
 *  network interface - not one hardcoded IP. Next only reads this file at
 *  dev-server startup, so recomputing it here means switching networks or
 *  computers just needs a restart, not a config edit every time DHCP hands
 *  out a different address. */
const lanIPv4Addresses = (): string[] =>
  Object.values(networkInterfaces())
    .flatMap((net) => net ?? [])
    .filter((net) => net.family === "IPv4" && !net.internal)
    .map((net) => net.address);

const nextConfig: NextConfig = {
  /* Next blocks dev-only requests (HMR, RSC refresh) from any origin other
   * than the hostname the server was initialized with - localhost by
   * default. Without this, opening the dev server from a phone or another
   * device on the LAN serves the static HTML fine but silently fails to
   * hydrate, since the client bootstrap itself is one of the blocked
   * requests. Only matters for `next dev`; production has no such gate. */
  allowedDevOrigins: lanIPv4Addresses(),

  /* Proxy negotiates HTML against markdown on these routes, so caches must key
   * on Accept. It cannot be set from Proxy: Next overwrites `Vary` on every
   * rendered page, whatever Proxy put there. Scoped to the negotiated routes
   * rather than set globally, so nothing else loses cacheability over it. */
  headers: async () => [
    {
      source: `/:path(${SITE_PAGES.map((page) => page.href.slice(1)).join("|")})`,
      headers: [{ key: "Vary", value: "Accept" }],
    },
  ],
};

export default nextConfig;
