import { NextResponse } from "next/server";
import { CV_URL } from "@/constants/site";

/** Proxies the PDF server-side so it can be streamed same-origin. */
export const GET = async () => {
  const upstream = await fetch(CV_URL);

  if (!upstream.ok || !upstream.body) {
    return new NextResponse("Failed to fetch CV", { status: 502 });
  }

  const headers = new Headers({ "Content-Type": "application/pdf" });
  const contentLength = upstream.headers.get("content-length");

  if (contentLength) headers.set("Content-Length", contentLength);

  return new NextResponse(upstream.body, { headers });
};
