"use client";

import { useEffect, useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import type { Task } from "@/types/api";
import { Button } from "@/components/common/Button";
import { CreateTaskModal } from "@/components/common/CreateTaskModal";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskHeader } from "@/components/tasks/TaskHeader";
import { TaskStats } from "@/components/tasks/TaskStats";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { Pagination } from "@/components/common/Pagination";
import { toast } from "react-toastify";

// Number of tasks to display per page
const ITEMS_PER_PAGE = 5;

export function TaskDashboard() {
  const {
    tasks,
    filteredTasks,
    filter,
    searchQuery,
    loading,
    creating,
    error,
    mutatingTaskId,
    setFilter,
    setSearchQuery,
    fetchTasks,
    createTask,
    editTaskTitle,
    deleteTask,
    updateTaskStatus,
  } = useTasks();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task>();
  const [taskToDelete, setTaskToDelete] = useState<Task>();
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page when filtering or searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filter]);

  const handleToggle = async (task: Task) => {
    const success = await updateTaskStatus(task.id, !task.completed);
    if (success) {
      toast.success(
        `Task marked as ${!task.completed ? "completed" : "pending"}`,
      );
    }
  };

  const handleSaveTask = async (title: string): Promise<boolean> => {
    if (editingTask) {
      const trimmed = title.trim();
      if (trimmed !== editingTask.title) {
        const success = await editTaskTitle(editingTask.id, trimmed);
        if (success) {
          toast.success("Task updated successfully!");
        }
        setEditingTask(undefined);
        return success;
      }
      setEditingTask(undefined);
      return true;
    }

    const success = await createTask(title);
    if (success) {
      toast.success("Task created successfully!");
    }
    return success;
  };

  const confirmDelete = async () => {
    if (!taskToDelete) return;
    const success = await deleteTask(taskToDelete.id);
    if (success) {
      toast.success("Task deleted successfully");
    }
    setTaskToDelete(undefined);
  };

  const isModalOpen = isCreateModalOpen || editingTask !== undefined;

  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedTasks = filteredTasks.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  return (
    <section className="grid gap-6">
      <TaskStats tasks={tasks} />

      <TaskHeader
        filter={filter}
        onFilterChange={setFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewTask={() => setIsCreateModalOpen(true)}
      />

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingTask(undefined);
        }}
        onSubmit={handleSaveTask}
        isLoading={creating || !!mutatingTaskId}
        initialTitle={editingTask?.title || ""}
        modalTitle={editingTask ? "Edit Task Title" : "Create New Task"}
        submitLabel={editingTask ? "Save Details" : "Create Task"}
        loadingLabel={editingTask ? "Saving..." : "Creating..."}
      />

      <ConfirmModal
        isOpen={taskToDelete !== undefined}
        onClose={() => setTaskToDelete(undefined)}
        onConfirm={confirmDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${taskToDelete?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        isConfirming={!!mutatingTaskId}
      />

      {loading ? <LoadingSkeleton /> : ""}

      {error ? (
        <section className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="mb-3 text-sm text-danger">{error}</p>
          <Button type="button" variant="outline" onClick={fetchTasks}>
            Retry
          </Button>
        </section>
      ) : (
        ""
      )}

      {!loading && !error && filteredTasks.length === 0 ? (
        <EmptyState
          title={searchQuery ? "No matching tasks" : "No tasks found"}
          description={
            searchQuery
              ? "Try adjusting your search or filters."
              : "Get started by creating a new task today."
          }
        />
      ) : (
        ""
      )}

      {!loading && !error && filteredTasks.length > 0 ? (
        <>
          <TaskList
            tasks={paginatedTasks}
            mutatingTaskId={mutatingTaskId}
            onToggle={handleToggle}
            onEdit={setEditingTask}
            onDelete={(id) => {
              const task = tasks.find((t) => t.id === id);
              if (task) setTaskToDelete(task);
            }}
          />
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        ""
      )}
    </section>
  );
}
