import type { Task } from "@/types/api";

type TaskItemProps = {
  task: Task;
  busy: boolean;
  onToggle: (task: Task) => void;
};

export function TaskItem({ task, busy, onToggle }: TaskItemProps) {
  return (
    <li className="grid gap-2 rounded-xl border border-border bg-surface p-3.5">
      <div className="flex items-start justify-between gap-3">
        <p className="font-semibold">{task.title}</p>
        <span className="inline-flex items-center rounded-full border border-border bg-slate-50 px-2.5 py-1 text-xs font-medium text-secondary">
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <small className="mutedText">
        Updated: {new Date(task.updatedAt).toLocaleString()}
      </small>

      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-text transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
          onClick={() => onToggle(task)}
          disabled={busy}
          aria-label={`Mark ${task.title} as ${task.completed ? "pending" : "completed"}`}
        >
          {busy
            ? "Saving..."
            : task.completed
              ? "Mark as Pending"
              : "Mark as Completed"}
        </button>
      </div>
    </li>
  );
}
