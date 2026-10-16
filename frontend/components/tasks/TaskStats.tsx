import type { Task } from "@/types/api";
import { useReports } from "@/hooks/useReports";
import { StatsCard } from "@/components/common/StatsCard";
import { ListTodo, CheckCircle2, CircleDashed } from "lucide-react";

type TaskStatsProps = {
  tasks: Task[];
};

export function TaskStats({ tasks: _tasks }: TaskStatsProps) {
  const { data, loading } = useReports();

  const totalTasksCount = data?.total ?? 0;
  const completedTasksCount = data?.byStatus?.done ?? 0;
  const pendingTasksCount = data?.byStatus?.todo ?? 0;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatsCard
        title="Total Tasks"
        value={loading ? "..." : totalTasksCount}
        icon={ListTodo}
        iconColorClass="text-blue-600"
        iconBgClass="bg-blue-100"
      />
      <StatsCard
        title="Pending"
        value={loading ? "..." : pendingTasksCount}
        icon={CircleDashed}
        iconColorClass="text-orange-600"
        iconBgClass="bg-orange-100"
      />
      <StatsCard
        title="Completed"
        value={loading ? "..." : completedTasksCount}
        icon={CheckCircle2}
        iconColorClass="text-emerald-600"
        iconBgClass="bg-emerald-100"
      />
    </div>
  );
}
