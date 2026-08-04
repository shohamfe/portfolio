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

  return new NextResponse(upstream.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": upstream.headers.get("content-length") ?? "",
    },
  });
};
