import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const robots = readFileSync(join(process.cwd(), "src/app/robots.txt"), "utf8");

describe("robots.txt", () => {
  it("allows every crawler, including AI training", () => {
    expect(robots).toContain("User-agent: *");
    expect(robots).toContain(
      "Content-Signal: search=yes, ai-input=yes, ai-train=yes",
    );
    expect(robots).toContain("Allow: /");
  });

  it("declares the sitemap with an absolute URL", () => {
    const sitemapLine = robots
      .split("\n")
      .find((line) => line.startsWith("Sitemap: "));

    expect(sitemapLine).toBeDefined();
    expect(sitemapLine).toMatch(/^Sitemap: https:\/\/\S+\/sitemap\.xml$/);
  });
});
