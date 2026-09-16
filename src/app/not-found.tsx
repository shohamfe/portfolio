import Link from "next/link";
import { SITE_PAGES } from "@/constants/site";
import { markdownUrlPath } from "@/lib/markdown/markdownRoutes";

const AGENT_SOURCES = [
  { href: "/sitemap.xml", label: "sitemap.xml" },
  { href: "/llms.txt", label: "llms.txt" },
];

/** Placeholder 404. Awaiting a design - deliberately plain until then, but it
 *  still lists every route, since this is the page an agent lands on after a
 *  guessed URL. */
const NotFound: React.FC = () => {
  return (
    <main className="mx-auto flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <p className="font-code text-code text-text-muted">404</p>

      <h1 className="font-display text-h2 text-text-strong">
        This page does not exist
      </h1>

      <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        {SITE_PAGES.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="font-body text-body text-accent underline underline-offset-4"
          >
            {page.label}
          </Link>
        ))}
      </nav>

      <p className="font-code text-code text-text-muted">
        {AGENT_SOURCES.map((source, index) => (
          <span key={source.href}>
            {index > 0 && " - "}

            <a href={source.href} className="underline underline-offset-4">
              {source.label}
            </a>
          </span>
        ))}
      </p>

      <p className="font-code text-code text-text-muted">
        Every page is also markdown: send <code>Accept: text/markdown</code>, or
        append <code>.md</code> to the path ({markdownUrlPath("/")} for the
        root).
      </p>
    </main>
  );
};

export default NotFound;
