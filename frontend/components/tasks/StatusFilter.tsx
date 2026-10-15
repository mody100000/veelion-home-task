import type { TaskFilter } from "@/types/api";
import { Button } from "@/components/common/Button";

const FILTERS: Array<{ label: string; value: TaskFilter }> = [
  { label: "All", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
];

type StatusFilterProps = {
  value: TaskFilter;
  onChange: (value: TaskFilter) => void;
  className?: string;
};

export function StatusFilter({
  value,
  onChange,
  className = "",
}: StatusFilterProps) {
  return (
    <section
      aria-label="Filter tasks by status"
      className={`rounded-xl border border-border bg-surface p-3 ${className}`}
    >
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => {
          const active = filter.value === value;

          return (
            <Button
              key={filter.value}
              type="button"
              variant={active ? "primary" : "outline"}
              className={
                !active ? "bg-white hover:text-primary transition" : ""
              }
              onClick={() => onChange(filter.value)}
              aria-pressed={active}
            >
              {filter.label}
            </Button>
          );
        })}
      </div>
    </section>
  );
}
