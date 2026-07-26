import Link from "next/link";

/** Placeholder 404. Awaiting a design — deliberately plain until then. */
const NotFound: React.FC = () => {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-code text-code text-text-muted">404</p>

      <h1 className="font-display text-h2 text-text-strong">This page does not exist</h1>

      <Link
        href="/"
        className="font-body text-body text-accent underline underline-offset-4"
      >
        Back home
      </Link>
    </main>
  );
};

export default NotFound;
