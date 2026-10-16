import { StatsCard } from "@/components/common/StatsCard";
import {
  ListTodo,
  Activity,
  CheckCircle2,
  CircleDashed,
} from "lucide-react";

interface ReportsStatusProps {
  total: number;
  done: number;
  todo: number;
  recentActivityCount: number;
}

export function ReportsStatus({
  total,
  done,
  todo,
  recentActivityCount,
}: ReportsStatusProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Tasks"
        value={total}
        icon={ListTodo}
        iconColorClass="text-blue-600"
        iconBgClass="bg-blue-100"
      />
      <StatsCard
        title="Recent Activity"
        value={recentActivityCount}
        icon={Activity}
        iconColorClass="text-purple-600"
        iconBgClass="bg-purple-100"
      />
      <StatsCard
        title="Completed"
        value={done}
        icon={CheckCircle2}
        iconColorClass="text-emerald-600"
        iconBgClass="bg-emerald-100"
      />
      <StatsCard
        title="Pending"
        value={todo}
        icon={CircleDashed}
        iconColorClass="text-orange-600"
        iconBgClass="bg-orange-100"
      />
    </div>
  );
}