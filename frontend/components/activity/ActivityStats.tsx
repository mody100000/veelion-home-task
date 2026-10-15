import { ActivityLog } from "@/types/api";
import { PlusCircle, Edit2, Trash2, Activity } from "lucide-react";

type ActivityStatsProps = {
  activities: ActivityLog[];
};

export function ActivityStats({ activities }: ActivityStatsProps) {
  const stats = {
    total: activities.length,
    creates: activities.filter((a) => a.action === "created").length,
    updates: activities.filter((a) => a.action === "updated").length,
    deletes: activities.filter((a) => a.action === "deleted").length,
  };

  const cards = [
    {
      label: "Total Actions",
      value: stats.total,
      icon: Activity,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Created",
      value: stats.creates,
      icon: PlusCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
    {
      label: "Updated",
      value: stats.updates,
      icon: Edit2,
      color: "text-amber-600",
      bg: "bg-amber-100",
    },
    {
      label: "Deleted",
      value: stats.deletes,
      icon: Trash2,
      color: "text-red-600",
      bg: "bg-red-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {cards.map((stat, idx) => (
        <div
          key={idx}
          className="flex items-center gap-4 rounded-xl border border-border bg-white p-4 shadow-sm"
        >
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${stat.bg} ${stat.color}`}
          >
            <stat.icon size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
