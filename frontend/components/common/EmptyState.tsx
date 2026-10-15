import { Info } from "lucide-react";

type EmptyStateProps = {
  title?: string;
  description?: string;
};

export function EmptyState({
  title = "No tasks found",
  description = "Get started by creating a new task today.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface p-12 text-center shadow-sm">
      <div className="mb-4 rounded-full bg-slate-100 p-4 text-slate-400">
        <Info size={32} />
      </div>
      <h3 className="mb-1 text-lg font-semibold text-text">{title}</h3>
      <p className="text-sm text-secondary">{description}</p>
    </div>
  );
}
