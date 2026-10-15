import { Search } from "lucide-react";
import { Button } from "@/components/common/Button";

type ActionFilter = "all" | "created" | "updated" | "deleted" | "status_changed";

type ActivityHeaderProps = {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  actionFilter: ActionFilter;
  onFilterChange: (val: ActionFilter) => void;
};

export function ActivityHeader({
  searchQuery,
  onSearchChange,
  actionFilter,
  onFilterChange,
}: ActivityHeaderProps) {
  const filters: { label: string; value: ActionFilter }[] = [
    { label: "All Activity", value: "all" },
    { label: "Created", value: "created" },
    { label: "Updated", value: "updated" },
    { label: "Deleted", value: "deleted" },
    { label: "Status Changed", value: "status_changed" },
  ];

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button
            key={f.value}
            type="button"
            variant={actionFilter === f.value ? "primary" : "outline"}
            size="sm"
            onClick={() => onFilterChange(f.value)}
          >
            {f.label}
          </Button>
        ))}
      </div>

      <div className="relative w-full sm:w-64">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          type="text"
          className="w-full rounded-lg border border-border bg-white py-2 pl-10 pr-4 text-sm text-text outline-none placeholder:text-muted focus:border-primary"
          placeholder="Search logs..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </section>
  );
}
