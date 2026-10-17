import Link from "next/link";
import { FileQuestion, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm ring-8 ring-blue-50/50">
        <FileQuestion size={40} strokeWidth={1.75} />
      </div>

      <span className="mb-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold tracking-wide text-slate-600">
        404 Error
      </span>

      <h1 className="mb-2 text-2xl font-bold tracking-tight text-text sm:text-3xl">
        Page not found
      </h1>

      <p className="mb-8 max-w-md text-sm text-secondary sm:text-base">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been
        moved or does not exist.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/tasks"
          className="inline-flex items-center gap-2 rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
        >
          <Home size={16} />
          Go to Tasks
        </Link>
        <Link
          href="/reports"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          View Reports
        </Link>
      </div>
    </div>
  );
}
