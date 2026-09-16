import { ROLE_QUERY_PARAM } from "@/constants/site";
import {
  ACCEPT_HEADER,
  MARKDOWN_CACHE_CONTROL,
  MARKDOWN_CONTENT_TYPE,
  VARY_HEADER,
} from "@/lib/markdown/constants";
import { buildNotFoundMarkdown } from "@/lib/markdown/notFoundMarkdown";
import { buildPageMarkdown } from "@/lib/markdown/pageMarkdown";
import { resolveSitePageHref } from "@/lib/markdown/markdownRoutes";
import type { NextRequest } from "next/server";

interface MarkdownRouteContext {
  params: Promise<{ slug?: string[] }>;
}

const markdownHeaders = (): HeadersInit => ({
  "Content-Type": MARKDOWN_CONTENT_TYPE,
  "Cache-Control": MARKDOWN_CACHE_CONTROL,
  [VARY_HEADER]: ACCEPT_HEADER,
});

export const GET = async (
  request: NextRequest,
  { params }: MarkdownRouteContext,
) => {
  const { slug = [] } = await params;
  const href = resolveSitePageHref(slug);

  if (href === null) {
    return new Response(buildNotFoundMarkdown(`/${slug.join("/")}`), {
      status: 404,
      headers: markdownHeaders(),
    });
  }

  const roleParam =
    request.nextUrl.searchParams.get(ROLE_QUERY_PARAM) ?? undefined;

  return new Response(buildPageMarkdown(href, roleParam), {
    headers: markdownHeaders(),
  });
};
