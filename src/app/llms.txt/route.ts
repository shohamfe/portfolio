import {
  LLMS_TXT_CACHE_CONTROL,
  LLMS_TXT_CONTENT_TYPE,
} from "@/constants/llmsTxt";
import { buildLlmsTxt } from "@/lib/llmsTxt";

export const dynamic = "force-static";

export const GET = () =>
  new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": LLMS_TXT_CONTENT_TYPE,
      "Cache-Control": LLMS_TXT_CACHE_CONTROL,
    },
  });
