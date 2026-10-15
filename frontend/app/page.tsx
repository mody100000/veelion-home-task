import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 md:px-6">
      <header className="mb-6 grid gap-4">
        <h1 className="text-3xl font-semibold tracking-tight text-text">
          VeeLion Frontend Assessment
        </h1>
        <p className="mutedText">
          Two separate modules built against the provided backend.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <Link
          href="/tasks"
          className="block rounded-xl border border-border bg-surface p-4"
        >
          <h2 className="text-xl font-semibold text-text">Task Dashboard</h2>
        </Link>

        <Link
          href="/activity"
          className="block rounded-xl border border-border bg-surface p-4"
        >
          <h2 className="text-xl font-semibold text-text">Activity Feed</h2>
        </Link>
      </section>
    </main>
  );
}
