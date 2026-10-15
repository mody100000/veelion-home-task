"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  ErrorResponse,
  Task,
  TaskFilter,
  TaskResponse,
  TasksResponse,
} from "@/types/api";

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const hasBody = init?.body !== undefined;

  const response = await fetch(url, {
    ...init,
    headers: {
      ...(hasBody ? { "Content-Type": "application/json" } : {}),
      ...(init?.headers || {}),
    },
  });

  if (!response.ok) {
    let message = `Request failed with ${response.status}`;

    try {
      const body = (await response.json()) as ErrorResponse;
      message = body.error?.message || message;
    } catch {}

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [creating, setCreating] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [mutatingTaskId, setMutatingTaskId] = useState<string | undefined>();
  const fetchAbortRef = useRef<AbortController | undefined>(undefined);

  useEffect(() => {
    return () => {
      fetchAbortRef.current?.abort();
    };
  }, []);

  const fetchTasks = useCallback(async () => {
    fetchAbortRef.current?.abort();

    const controller = new AbortController();
    fetchAbortRef.current = controller;

    try {
      setLoading(true);
      setError(undefined);

      const body = await requestJson<TasksResponse>("/api/tasks", {
        signal: controller.signal,
      });

      setTasks(body.data);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      setError(getErrorMessage(error, "Could not load tasks right now."));
    } finally {
      if (controller.signal.aborted) {
        return;
      }

      setLoading(false);
    }
  }, []);

  const updateTaskStatus = useCallback(
    async (taskId: string, completed: boolean) => {
      if (mutatingTaskId) {
        return false;
      }

      try {
        setMutatingTaskId(taskId);
        setError(undefined);

        const body = await requestJson<TaskResponse>(`/api/tasks/${taskId}`, {
          method: "PATCH",
          body: JSON.stringify({ completed }),
        });

        // Log activity asynchronously
        requestJson<any>("/api/activity", {
          method: "POST",
          body: JSON.stringify({
            action: "status_changed",
            info: `Task marked as ${completed ? "completed" : "pending"}`,
          }),
        }).catch((err) => console.error("Failed to log activity:", err));

        setTasks((previous) =>
          previous.map((task) => (task.id === taskId ? body.data : task)),
        );
        return true;
      } catch (error) {
        setError(getErrorMessage(error, "Could not update task status."));
        return false;
      } finally {
        setMutatingTaskId(undefined);
      }
    },
    [mutatingTaskId],
  );

  const createTask = useCallback(
    async (title: string) => {
      if (creating) {
        return false;
      }

      try {
        setCreating(true);
        setError(undefined);

        const body = await requestJson<TaskResponse>("/api/tasks", {
          method: "POST",
          body: JSON.stringify({ title }),
        });

        // Log activity asynchronously
        requestJson<any>("/api/activity", {
          method: "POST",
          body: JSON.stringify({
            action: "created",
            info: `New task created`,
          }),
        }).catch((err) => console.error("Failed to log activity:", err));

        setTasks((previous) => [body.data, ...previous]);
        return true;
      } catch (error) {
        setError(getErrorMessage(error, "Could not create task."));
        return false;
      } finally {
        setCreating(false);
      }
    },
    [creating],
  );

  const editTaskTitle = useCallback(
    async (taskId: string, title: string) => {
      if (mutatingTaskId) {
        return false;
      }

      try {
        setMutatingTaskId(taskId);
        setError(undefined);

        const body = await requestJson<TaskResponse>(`/api/tasks/${taskId}`, {
          method: "PATCH",
          body: JSON.stringify({ title }),
        });

        // Log activity asynchronously
        requestJson<any>("/api/activity", {
          method: "POST",
          body: JSON.stringify({
            action: "updated",
            info: `Task updated`,
          }),
        }).catch((err) => console.error("Failed to log activity:", err));

        setTasks((previous) =>
          previous.map((task) => (task.id === taskId ? body.data : task)),
        );
        return true;
      } catch (error) {
        setError(getErrorMessage(error, "Could not edit task."));
        return false;
      } finally {
        setMutatingTaskId(undefined);
      }
    },
    [mutatingTaskId],
  );

  const deleteTask = useCallback(
    async (taskId: string) => {
      if (mutatingTaskId) {
        return false;
      }

      try {
        setMutatingTaskId(taskId);
        setError(undefined);

        await requestJson<undefined>(`/api/tasks/${taskId}`, {
          method: "DELETE",
        });

        // Log activity asynchronously
        requestJson<any>("/api/activity", {
          method: "POST",
          body: JSON.stringify({
            action: "deleted",
            info: `Task deleted`,
          }),
        }).catch((err) => console.error("Failed to log activity:", err));

        setTasks((previous) => previous.filter((task) => task.id !== taskId));
        return true;
      } catch (error) {
        setError(getErrorMessage(error, "Could not delete task."));
        return false;
      } finally {
        setMutatingTaskId(undefined);
      }
    },
    [mutatingTaskId],
  );

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    let result = tasks;

    if (filter === "completed") {
      result = tasks.filter((task) => task.completed);
    } else if (filter === "pending") {
      result = tasks.filter((task) => !task.completed);
    }

    result = result.filter((task) =>
      task.title.toLowerCase().includes(normalizedSearch),
    );

    // Sort tasks by newest first
    return [...result].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [tasks, filter, searchQuery]);

  return {
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
  };
}
