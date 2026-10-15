import type { Task } from "@/types/api";
import { TaskItem } from "@/components/tasks/TaskItem";

type TaskListProps = {
  tasks: Task[];
  mutatingTaskId?: string;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
};

export function TaskList({
  tasks,
  mutatingTaskId,
  onToggle,
  onEdit,
  onDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <section className="rounded-xl border border-border bg-surface p-4">
        <p className="mutedText">No tasks match this filter.</p>
      </section>
    );
  }

  return (
    <section aria-label="Task list">
      <ul className="m-0 grid list-none gap-3 p-0">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            busy={mutatingTaskId === task.id}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
}
