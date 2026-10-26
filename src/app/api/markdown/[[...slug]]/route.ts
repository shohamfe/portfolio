import { applyVaryAccept } from "@/lib/markdown/acceptNegotiation";
import {
  MARKDOWN_CACHE_CONTROL,
  MARKDOWN_CONTENT_TYPE,
  MARKDOWN_NOT_FOUND_CACHE_CONTROL,
} from "@/lib/markdown/constants";
import { buildNotFoundMarkdown } from "@/lib/markdown/notFoundMarkdown";
import { buildMarkdownForTarget } from "@/lib/markdown/pageMarkdown";
import { resolveMarkdownTarget } from "@/lib/markdown/markdownRoutes";

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
  _request: Request,
  { params }: MarkdownRouteContext,
) => {
  const { slug = [] } = await params;
  const target = resolveMarkdownTarget(slug);

  const markdown = target && buildMarkdownForTarget(target);

  if (markdown === null) {
    return new Response(buildNotFoundMarkdown(`/${slug.join("/")}`), {
      status: 404,
      headers: markdownHeaders(MARKDOWN_NOT_FOUND_CACHE_CONTROL),
    });
  }

  return new Response(markdown, {
    headers: markdownHeaders(MARKDOWN_CACHE_CONTROL),
  });
};
