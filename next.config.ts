import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Next blocks dev-only requests (HMR, RSC refresh) from any origin other
   * than the hostname the server was initialized with - localhost by
   * default. Without this, opening the dev server from a phone or another
   * device on the LAN serves the static HTML fine but silently fails to
   * hydrate, since the client bootstrap itself is one of the blocked
   * requests. Only matters for `next dev`; production has no such gate. */
  allowedDevOrigins: ["10.100.102.31"],
};

export default nextConfig;
