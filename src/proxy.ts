import { NextResponse, type NextRequest } from "next/server";
import {
  applyVaryAccept,
  explicitlyRejects,
  negotiateMediaType,
} from "@/lib/markdown/acceptNegotiation";
import {
  ACCEPT_HEADER,
  MARKDOWN_EXTENSION,
  MARKDOWN_MEDIA_TYPE,
  MARKDOWN_ONLY_MEDIA_TYPES,
  MARKDOWN_ROUTE_PREFIX,
  PLAIN_TEXT_CONTENT_TYPE,
  PRODUCIBLE_MEDIA_TYPES,
  RSC_MEDIA_TYPE,
  VARY_HEADER,
} from "@/lib/markdown/constants";
import { hrefFromMarkdownUrlPath } from "@/lib/markdown/markdownRoutes";

const NOT_ACCEPTABLE_STATUS = 406;

const notAcceptable = (availableTypes: readonly string[]): Response =>
  new Response(
    `406 Not Acceptable\n\nAvailable representations: ${availableTypes.join(", ")}\n`,
    {
      status: NOT_ACCEPTABLE_STATUS,
      headers: {
        "Content-Type": PLAIN_TEXT_CONTENT_TYPE,
        [VARY_HEADER]: ACCEPT_HEADER,
      },
    },
  );

const rewriteToMarkdown = (request: NextRequest, href: string) => {
  const url = request.nextUrl.clone();
  url.pathname =
    href === "/" ? MARKDOWN_ROUTE_PREFIX : `${MARKDOWN_ROUTE_PREFIX}${href}`;

  const rewritten = NextResponse.rewrite(url);
  applyVaryAccept(rewritten.headers);

  return rewritten;
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const acceptHeader = request.headers.get("accept");

  /** A client asking for the Flight payload is not asking for a representation
   *  of the page, so it is Next's to answer rather than ours to negotiate.
   *  Neither the RSC header nor the _rsc query param survives into Proxy, so
   *  the media type is the only signal left to recognise it by. */
  if (acceptHeader?.includes(RSC_MEDIA_TYPE)) return NextResponse.next();

  /** The `.md` sibling is the URL `<link rel="alternate">` points at, and a
   *  crawler following it may send no `Accept` at all - so it serves markdown
   *  regardless, and only an explicit `q=0` rejection turns into a 406. */
  if (pathname.endsWith(MARKDOWN_EXTENSION)) {
    if (explicitlyRejects(acceptHeader, MARKDOWN_MEDIA_TYPE)) {
      return notAcceptable(MARKDOWN_ONLY_MEDIA_TYPES);
    }

    return rewriteToMarkdown(request, hrefFromMarkdownUrlPath(pathname));
  }

  const chosenType = negotiateMediaType(acceptHeader, PRODUCIBLE_MEDIA_TYPES);

  if (chosenType === MARKDOWN_MEDIA_TYPE) {
    return rewriteToMarkdown(request, pathname);
  }

  if (chosenType === null) {
    return notAcceptable(PRODUCIBLE_MEDIA_TYPES);
  }

  /** Next owns `Vary` on rendered pages and overwrites whatever anything else
   *  sets - Proxy via `set`, `append`, `next()` or `rewrite()`, and
   *  `next.config.ts` `headers()` too, which lands its other headers but not
   *  this one. So the HTML branch cannot advertise `Vary: Accept`; the markdown
   *  branch does, and Vercel's CDN keys on `Accept` by default regardless. */
  return NextResponse.next();
}

export const config = {
  /** Page routes only. Static assets, Next internals and the other agent-facing
   *  files (robots.txt, sitemap.xml, llms.txt) have a single representation, so
   *  negotiating them would only risk a spurious 406. `.md` is deliberately not
   *  in the excluded extension list. */
  matcher: [
    "/((?!api/|_next/|_vercel/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|txt|xml|json|pdf|js|css|map|woff|woff2|ttf|mp4|webm)$).*)",
  ],
};
