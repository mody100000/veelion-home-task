import Link from "next/link";
import { TaskDashboard } from "@/components/tasks/TaskDashboard";

export default function TasksPage() {
  return (
    <main className="mx-auto grid w-full max-w-5xl gap-4 px-4 py-8 md:px-6">
      <nav>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-text transition hover:border-primary hover:text-primary"
        >
          Back
        </Link>
      </nav>
      <TaskDashboard />
    </main>
  );
}
