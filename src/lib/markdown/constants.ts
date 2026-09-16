export const MARKDOWN_MEDIA_TYPE = "text/markdown";
export const HTML_MEDIA_TYPE = "text/html";

export const MARKDOWN_CONTENT_TYPE = `${MARKDOWN_MEDIA_TYPE}; charset=utf-8`;
export const PLAIN_TEXT_CONTENT_TYPE = "text/plain; charset=utf-8";

/** Ordered by preference: the first entry is what an unconstrained request -
 *  no `Accept` header, or a catch-all wildcard - receives. */
export const PRODUCIBLE_MEDIA_TYPES = [
  HTML_MEDIA_TYPE,
  MARKDOWN_MEDIA_TYPE,
] as const;

/** The `.md` sibling URLs have no HTML representation of their own. */
export const MARKDOWN_ONLY_MEDIA_TYPES = [MARKDOWN_MEDIA_TYPE] as const;

export const MARKDOWN_ROUTE_PREFIX = "/api/markdown";

export const MARKDOWN_EXTENSION = ".md";

/** The `.md` sibling of the site root, since `/.md` is not a usable URL. */
export const ROOT_MARKDOWN_SLUG = "index";

/** Cached at the edge for an hour, then served stale while it refreshes, so an
 *  agent never pays for a cold render. Vercel keys the CDN cache on `Accept`,
 *  and `Vary` only takes effect alongside a caching `Cache-Control`. */
export const MARKDOWN_CACHE_CONTROL =
  "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400";

/** A guessed URL must not pin a 404 at the edge for an hour, in case a page
 *  later appears at that path. */
export const MARKDOWN_NOT_FOUND_CACHE_CONTROL = "no-store";

export const VARY_HEADER = "Vary";
export const ACCEPT_HEADER = "Accept";

/** What an App Router Flight request asks for. */
export const RSC_MEDIA_TYPE = "text/x-component";
