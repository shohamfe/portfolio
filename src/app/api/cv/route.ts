import { NextRequest, NextResponse } from "next/server";
import { CV_URLS, ROLE_QUERY_PARAM, ROLE_QUERY_VALUE } from "@/constants/site";

/** Proxies the PDF server-side so it can be streamed same-origin. */
export const GET = async (request: NextRequest) => {
  const role = request.nextUrl.searchParams.get(ROLE_QUERY_PARAM);
  const url = role === ROLE_QUERY_VALUE ? CV_URLS.frontend : CV_URLS.default;

  const upstream = await fetch(url);

  if (!upstream.ok || !upstream.body) {
    return new NextResponse("Failed to fetch CV", { status: 502 });
  }

  const headers = new Headers({ "Content-Type": "application/pdf" });
  const contentLength = upstream.headers.get("content-length");

  // Omitted rather than sent empty when upstream doesn't report a size;
  // the client falls back to an indeterminate progress bar.
  if (contentLength) headers.set("Content-Length", contentLength);

  return new NextResponse(upstream.body, { headers });
};
