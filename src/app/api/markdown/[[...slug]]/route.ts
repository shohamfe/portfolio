import { ROLE_QUERY_PARAM } from "@/constants/site";
import { applyVaryAccept } from "@/lib/markdown/acceptNegotiation";
import {
  MARKDOWN_CACHE_CONTROL,
  MARKDOWN_CONTENT_TYPE,
  MARKDOWN_NOT_FOUND_CACHE_CONTROL,
} from "@/lib/markdown/constants";
import { buildNotFoundMarkdown } from "@/lib/markdown/notFoundMarkdown";
import { buildPageMarkdown } from "@/lib/markdown/pageMarkdown";
import { resolveSitePageHref } from "@/lib/markdown/markdownRoutes";
import type { NextRequest } from "next/server";

interface MarkdownRouteContext {
  params: Promise<{ slug?: string[] }>;
}

const markdownHeaders = (cacheControl: string): Headers => {
  const headers = new Headers({
    "Content-Type": MARKDOWN_CONTENT_TYPE,
    "Cache-Control": cacheControl,
  });
  applyVaryAccept(headers);

  return headers;
};

export const GET = async (
  request: NextRequest,
  { params }: MarkdownRouteContext,
) => {
  const { slug = [] } = await params;
  const href = resolveSitePageHref(slug);

  if (href === null) {
    return new Response(buildNotFoundMarkdown(`/${slug.join("/")}`), {
      status: 404,
      headers: markdownHeaders(MARKDOWN_NOT_FOUND_CACHE_CONTROL),
    });
  }

  const roleParam =
    request.nextUrl.searchParams.get(ROLE_QUERY_PARAM) ?? undefined;

  return new Response(buildPageMarkdown(href, roleParam), {
    headers: markdownHeaders(MARKDOWN_CACHE_CONTROL),
  });
};
