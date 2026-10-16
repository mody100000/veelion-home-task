import { ActivityLog } from "@/types/api";
import { PlusCircle, Edit2, Trash2, Activity } from "lucide-react";
import { useReports } from "@/hooks/useReports";
import { StatsCard } from "@/components/common/StatsCard";

type ActivityStatsProps = {
  activities: ActivityLog[];
};

export function ActivityStats({ activities }: ActivityStatsProps) {
  const { data, loading } = useReports();

  const stats = {
    total: data?.recentActivityCount ?? 0,
    creates: activities.filter((a) => a.action === "created").length,
    updates: activities.filter((a) => a.action === "updated").length,
    deletes: activities.filter((a) => a.action === "deleted").length,
  };

  const cards = [
    {
      label: "Total Actions",
      value: loading ? "..." : stats.total,
      icon: Activity,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Created",
      value: loading ? "..." : stats.creates,
      icon: PlusCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
    {
      label: "Updated",
      value: loading ? "..." : stats.updates,
      icon: Edit2,
      color: "text-amber-600",
      bg: "bg-amber-100",
    },
    {
      label: "Deleted",
      value: loading ? "..." : stats.deletes,
      icon: Trash2,
      color: "text-red-600",
      bg: "bg-red-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {cards.map((stat, idx) => (
        <StatsCard
          key={idx}
          title={stat.label}
          value={stat.value}
          icon={stat.icon}
          iconColorClass={stat.color}
          iconBgClass={stat.bg}
        />
      ))}
    </div>
  );
}
