import type { Task } from "@/types/api";

type TaskStatsProps = {
  tasks: Task[];
};

export function TaskStats({ tasks }: TaskStatsProps) {
  const totalTasksCount = tasks.length;
  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const pendingTasksCount = totalTasksCount - completedTasksCount;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-secondary">
          <div className="h-2 w-2 rounded-full bg-blue-500" />
          Total
        </div>
        <div className="text-3xl font-bold text-text">{totalTasksCount}</div>
        <div className="mt-1 text-sm text-secondary">All tasks</div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-secondary">
          <div className="h-2 w-2 rounded-full bg-orange-500" />
          Pending
        </div>
        <div className="text-3xl font-bold text-text">{pendingTasksCount}</div>
        <div className="mt-1 text-sm text-secondary">Awaiting action</div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-secondary">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          Completed
        </div>
        <div className="text-3xl font-bold text-text">
          {completedTasksCount}
        </div>
        <div className="mt-1 text-sm text-secondary">Done</div>
      </div>
    </div>
  );
}
