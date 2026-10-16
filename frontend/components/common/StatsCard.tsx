import { LucideIcon } from "lucide-react";

export type StatsCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColorClass?: string;
  iconBgClass?: string;
};

export function StatsCard({
  title,
  value,
  icon: Icon,
  iconColorClass = "text-blue-600",
  iconBgClass = "bg-blue-100",
}: StatsCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-white p-4 shadow-sm h-full">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconBgClass} ${iconColorClass}`}
      >
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-zinc-900">
          {value !== undefined && value !== null ? value : "-"}
        </p>
      </div>
    </div>
  );
}
