import { describe, expect, it } from "vitest";
import { LINKS, ROLE_LABELS, SITE, SITE_URL } from "@/constants/site";
import { SCHEMA_IDS } from "@/constants/structuredData";
import {
  buildBreadcrumbListNode,
  buildPageGraph,
  buildPersonNode,
  serializeStructuredData,
} from "@/components/structuredData/helpers/structuredData.helpers";
import type {
  PersonNode,
  StructuredDataGraph,
} from "@/components/structuredData/types/structuredData.types";

const collectIdReferences = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.flatMap(collectIdReferences);
  }

  if (value === null || typeof value !== "object") {
    return [];
  }

  const entries = Object.entries(value as Record<string, unknown>);
  const isReference = entries.length === 1 && entries[0][0] === "@id";

  if (isReference && typeof entries[0][1] === "string") {
    return [entries[0][1]];
  }

  return entries.flatMap(([, entryValue]) => collectIdReferences(entryValue));
};

const collectDeclaredIds = (graph: StructuredDataGraph): string[] =>
  graph["@graph"].map((node) => node["@id"]);

describe("buildPersonNode", () => {
  const person: PersonNode = buildPersonNode();

  it("carries the required identity fields", () => {
    expect(person["@type"]).toBe("Person");
    expect(person["@id"]).toBe(SCHEMA_IDS.person);
    expect(person.name).toBe(SITE.name);
    expect(person.url).toBe(`${SITE_URL}/`);
    expect(person.jobTitle).toBe(ROLE_LABELS.default.primary);
    expect(person.description).toBe(SITE.description);
    expect(person.email).toBe("shoham.fe@gmail.com");
    expect(person.telephone).toBe("+972508882689");
    expect(person.knowsAbout.length).toBeGreaterThan(0);
  });

  it("exposes only locality and country, never a street address", () => {
    expect(person.address).toEqual({
      "@type": "PostalAddress",
      addressLocality: "Tel Aviv",
      addressCountry: "IL",
    });
    expect(Object.keys(person.address)).not.toContain("streetAddress");
    expect(JSON.stringify(person)).not.toContain("streetAddress");
  });

  it("links the LinkedIn and GitHub profiles through sameAs", () => {
    expect(person.sameAs).toContain(LINKS.linkedin);
    expect(person.sameAs).toContain(LINKS.github);
  });
});

describe("buildPageGraph", () => {
  it("marks the home page as a ProfilePage pointing at the Person", () => {
    const graph = buildPageGraph({
      path: "/",
      title: "Home title",
      description: "Home description",
    });
    const webPage = graph["@graph"][2];

    expect(webPage["@type"]).toBe("ProfilePage");
    expect(webPage).toMatchObject({
      url: `${SITE_URL}/`,
      mainEntity: { "@id": SCHEMA_IDS.person },
      about: { "@id": SCHEMA_IDS.person },
    });
  });

  it("adds a breadcrumb list on non-home routes", () => {
    const graph = buildPageGraph({
      path: "/resume",
      title: "Resume title",
      description: "Resume description",
    });
    const types = graph["@graph"].map((node) => node["@type"]);

    expect(types).toEqual(["Person", "WebSite", "WebPage", "BreadcrumbList"]);
  });

  it("resolves every @id reference within the graph", () => {
    for (const path of ["/", "/resume", "/case-study/octseven"]) {
      const graph = buildPageGraph({
        path,
        title: "Title",
        description: "Description",
      });
      const declaredIds = collectDeclaredIds(graph);

      for (const reference of collectIdReferences(graph["@graph"])) {
        expect(declaredIds).toContain(reference);
      }
    }
  });
});

describe("buildBreadcrumbListNode", () => {
  it("starts at the home URL and ends at the page URL", () => {
    const breadcrumb = buildBreadcrumbListNode("/case-study", [
      { path: "/case-study", name: "Case Study" },
    ]);

    expect(breadcrumb.itemListElement).toEqual([
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Case Study",
        item: `${SITE_URL}/case-study`,
      },
    ]);
  });

  it("numbers a nested trail from home through to the leaf", () => {
    const breadcrumb = buildBreadcrumbListNode("/case-study/octseven", [
      { path: "/case-study", name: "Case Study" },
      { path: "/case-study/octseven", name: "OctSeven" },
    ]);

    expect(breadcrumb.itemListElement.map((item) => item.position)).toEqual([
      1, 2, 3,
    ]);
    expect(breadcrumb.itemListElement[2]).toEqual({
      "@type": "ListItem",
      position: 3,
      name: "OctSeven",
      item: `${SITE_URL}/case-study/octseven`,
    });
  });
});

describe("serializeStructuredData", () => {
  it("escapes angle brackets so the script tag cannot be closed early", () => {
    const serialized = serializeStructuredData({
      "@context": "https://schema.org",
      "@graph": [
        { ...buildPersonNode(), name: "</script><script>alert(1)</script>" },
      ],
    });

    expect(serialized).not.toContain("</script>");
    expect(serialized).toContain("\\u003c/script");
    expect(JSON.parse(serialized)["@graph"][0].name).toBe(
      "</script><script>alert(1)</script>",
    );
  });
});
