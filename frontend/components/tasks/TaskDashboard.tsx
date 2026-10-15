"use client";

import { useTasks } from "@/hooks/useTasks";
import type { Task } from "@/types/api";
import { StatusFilter } from "@/components/tasks/StatusFilter";
import { TaskList } from "@/components/tasks/TaskList";

export function TaskDashboard() {
  const {
    filteredTasks,
    filter,
    loading,
    error,
    updatingTaskId,
    setFilter,
    fetchTasks,
    updateTaskStatus,
  } = useTasks();

  const handleToggle = (task: Task) => {
    updateTaskStatus(task.id, !task.completed);
  };

  return (
    <section className="grid gap-4">
      <header className="rounded-xl border border-border bg-surface p-4">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">
          Task Dashboard
        </h1>
      </header>

      <StatusFilter value={filter} onChange={setFilter} />

      {loading ? (
        <section className="rounded-xl border border-border bg-surface p-4">
          <p>Loading tasks...</p>
        </section>
      ) : null}

      {error ? (
        <section className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="mb-3 text-sm text-danger">{error}</p>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-text transition hover:border-primary hover:text-primary"
            onClick={fetchTasks}
          >
            Retry
          </button>
        </section>
      ) : null}

      {!loading && !error ? (
        <TaskList
          tasks={filteredTasks}
          updatingTaskId={updatingTaskId}
          onToggle={handleToggle}
        />
      ) : null}
    </section>
  );
}
