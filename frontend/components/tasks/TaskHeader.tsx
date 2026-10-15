import { Plus } from "lucide-react";
import { Button } from "@/components/common/Button";
import { StatusFilter } from "@/components/tasks/StatusFilter";
import type { TaskFilter } from "@/types/api";

type TaskHeaderProps = {
  filter: TaskFilter;
  onFilterChange: (value: TaskFilter) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onNewTask: () => void;
};

export function TaskHeader({
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  onNewTask,
}: TaskHeaderProps) {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <StatusFilter
        value={filter}
        onChange={onFilterChange}
        className="shrink-0 p-1.5 shadow-sm"
      />

      <label className="flex-1" htmlFor="task-search-input">
        <span className="sr-only">Search Tasks</span>
        <input
          id="task-search-input"
          type="search"
          placeholder="Search by task title"
          className="h-13 w-full rounded-xl border border-border bg-surface px-4 text-sm text-text outline-none transition focus:border-primary shadow-sm"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <Button
        type="button"
        onClick={onNewTask}
        className="h-12 shrink-0 whitespace-nowrap rounded-xl px-5 text-sm shadow-sm"
        variant="primary"
        size="none"
      >
        <Plus size={18} className="mr-2" />
        New task
      </Button>
    </header>
  );
}
