import { BACKEND_BASE_URL } from "@/lib/constants";
import type {
  ActivityLog,
  CreateTaskRequest,
  ErrorResponse,
  Task,
  TaskResponse,
  TasksResponse,
  UpdateTaskRequest,
} from "@/types/api";

const REQUEST_TIMEOUT_MS = 8_000;

type ApiEnvelope<T> = {
  data: T;
};

function buildBackendUrl(path: string): string {
  return `${BACKEND_BASE_URL}${path}`;
}

function withTimeoutSignal(timeoutMs: number): AbortSignal {
  return AbortSignal.timeout(timeoutMs);
}

async function parseError(response: Response): Promise<string> {
  const fallback = `Request failed with status ${response.status}`;

  try {
    const body = (await response.json()) as ErrorResponse;
    return body.error?.message || fallback;
  } catch {
    return fallback;
  }
}

function isApiEnvelope<T>(value: unknown): value is ApiEnvelope<T> {
  return Boolean(value && typeof value === "object" && "data" in value);
}

async function requestBackendJson<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const timeoutSignal = withTimeoutSignal(REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(buildBackendUrl(path), {
      cache: "no-store",
      ...init,
      signal: timeoutSignal,
    });

    if (!response.ok) {
      throw new Error(await parseError(response));
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(`Request timed out after ${REQUEST_TIMEOUT_MS}ms.`);
    }

    throw new Error(
      error instanceof Error ? error.message : "Backend request failed.",
    );
  }
}

async function requestBackend(path: string, init?: RequestInit): Promise<void> {
  const timeoutSignal = withTimeoutSignal(REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(buildBackendUrl(path), {
      cache: "no-store",
      ...init,
      signal: timeoutSignal,
    });

    if (!response.ok) {
      throw new Error(await parseError(response));
    }
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(`Request timed out after ${REQUEST_TIMEOUT_MS}ms.`);
    }

    throw new Error(
      error instanceof Error ? error.message : "Backend request failed.",
    );
  }
}

export async function getTasksFromBackend(): Promise<Task[]> {
  const body = await requestBackendJson<TasksResponse>("/tasks");

  if (!isApiEnvelope<Task[]>(body) || !Array.isArray(body.data)) {
    throw new Error("Invalid tasks response shape from backend.");
  }

  return body.data;
}

export async function updateTaskInBackend(
  taskId: string,
  updates: UpdateTaskRequest,
): Promise<Task> {
  const body = await requestBackendJson<TaskResponse>(`/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (
    !isApiEnvelope<Task>(body) ||
    !body.data ||
    typeof body.data !== "object"
  ) {
    throw new Error("Invalid task response shape from backend.");
  }

  return body.data;
}

export async function createTaskInBackend(
  payload: CreateTaskRequest,
): Promise<Task> {
  const body = await requestBackendJson<TaskResponse>("/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (
    !isApiEnvelope<Task>(body) ||
    !body.data ||
    typeof body.data !== "object"
  ) {
    throw new Error("Invalid task response shape from backend.");
  }

  return body.data;
}

export async function deleteTaskInBackend(taskId: string): Promise<void> {
  await requestBackend(`/tasks/${taskId}`, {
    method: "DELETE",
  });
}

export async function getActivityFromBackend(): Promise<ActivityLog[]> {
  const body = await requestBackendJson<ActivityLog[]>("/activity");

  if (!Array.isArray(body)) {
    throw new Error("Invalid activity response shape from backend.");
  }

  return body;
}

export async function createActivityInBackend(payload: {
  action: string;
  info: string;
}): Promise<ActivityLog> {
  const body = await requestBackendJson<ActivityLog>("/activity", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return body;
}
