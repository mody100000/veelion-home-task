import Image from "next/image";
import Link from "next/link";
import { ListTodo, Activity, FileText } from "lucide-react";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 md:px-6">
      <header className="mb-12 text-center">
        <div className="mb-6 flex justify-center">
          <Image
            src="/images/logo.avif"
            alt="VeeLion Logo"
            width={150}
            height={150}
            priority
          />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-text">
          VeeLion Frontend Assessment
        </h1>
        <p className="mt-2 text-secondary">
          Manage your tasks, track activity, and view comprehensive reports.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        <Link
          href="/tasks"
          className="group flex flex-col rounded-xl border border-border bg-surface p-6 shadow-sm transition-all hover:border-blue-500 hover:shadow-lg"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
            <ListTodo size={24} />
          </div>
          <h2 className="text-lg font-semibold text-text">Task Dashboard</h2>
          <p className="mt-2 text-sm text-secondary">
            Create, manage, and track your tasks with ease
          </p>
        </Link>

        <Link
          href="/activity"
          className="group flex flex-col rounded-xl border border-border bg-surface p-6 shadow-sm transition-all hover:border-purple-500 hover:shadow-lg"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 transition-colors group-hover:bg-purple-600 group-hover:text-white">
            <Activity size={24} />
          </div>
          <h2 className="text-lg font-semibold text-text">Activity Feed</h2>
          <p className="mt-2 text-sm text-secondary">
            View all task activities and changes in real-time
          </p>
        </Link>

        <Link
          href="/reports"
          className="group flex flex-col rounded-xl border border-border bg-surface p-6 shadow-sm transition-all hover:border-emerald-500 hover:shadow-lg"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
            <FileText size={24} />
          </div>
          <h2 className="text-lg font-semibold text-text">Reports</h2>
          <p className="mt-2 text-sm text-secondary">
            Visualize task stats and insights with charts
          </p>
        </Link>
      </section>
    </main>
  );
}
