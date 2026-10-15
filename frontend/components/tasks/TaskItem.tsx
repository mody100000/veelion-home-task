import { Calendar, Edit2, Trash2, CheckCircle2, Circle } from "lucide-react";
import { Badge } from "@/components/common/Badges";
import { Button } from "@/components/common/Button";
import { getStringInitial } from "@/utils/string";
import type { Task } from "@/types/api";
import { formatTaskDate } from "@/utils/date";

type TaskItemProps = {
  task: Task;
  busy: boolean;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
};

export function TaskItem({
  task,
  busy,
  onToggle,
  onEdit,
  onDelete,
}: TaskItemProps) {
  const handleDelete = () => {
    onDelete(task.id);
  };

  const initial = getStringInitial(task.title);

  return (
    <li
      className={`flex flex-col gap-4 rounded-xl border bg-white p-5 transition hover:shadow-sm sm:flex-row sm:items-center ${
        task.completed
          ? "border-b-border border-r-border border-t-border border-l-4 border-l-emerald-400"
          : "border-border"
      }`}
    >
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <Badge
          letter={initial}
          size="md"
          className={`shrink-0 ${task.completed ? "opacity-60" : ""}`}
        />
        <div className="min-w-0 flex-1 pt-0.5">
          <p
            className={`truncate text-sm font-semibold sm:text-base ${
              task.completed ? "text-slate-400 line-through" : "text-zinc-900"
            }`}
          >
            {task.title}
          </p>
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-400">
            <Calendar size={14} />
            <span>{formatTaskDate(task.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <Button
          type="button"
          variant="status"
          size="none"
          className={`px-3.5 py-1.5 text-sm gap-1.5 ${
            task.completed
              ? "bg-emerald-50 text-emerald-600"
              : "bg-amber-100/50 text-amber-700"
          }`}
          onClick={() => onToggle(task)}
          disabled={busy}
          aria-label={`Mark ${task.title} as ${
            task.completed ? "pending" : "completed"
          }`}
        >
          {task.completed ? (
            <CheckCircle2 size={16} className="text-emerald-500" />
          ) : (
            <Circle size={16} className="text-amber-500" />
          )}
          {task.completed ? "Completed" : "Pending"}
        </Button>

        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => onEdit(task)}
            disabled={busy}
            aria-label="Edit"
          >
            <Edit2 size={16} />
          </Button>

          <Button
            type="button"
            variant="danger"
            size="icon"
            onClick={handleDelete}
            disabled={busy}
            aria-label={`Delete ${task.title}`}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </li>
  );
}
