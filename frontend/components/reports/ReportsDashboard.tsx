"use client";

import { EmptyState } from "@/components/common/EmptyState";
import { ReportsStatus } from "./ReportsStatus";
import { ReportsPieChart } from "./ReportsPieChart";
import { useReports } from "@/hooks/useReports";

export function ReportsDashboard() {
  const { data, error } = useReports();

  if (error && !data) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <EmptyState
          title="Failed to load reports"
          description={error || "Unknown error occurred"}
        />
      </div>
    );
  }

  const {
    total = 0,
    byStatus = { done: 0, todo: 0 },
    recentActivityCount = 0,
  } = data || {};
  const done = byStatus.done || 0;
  const todo = byStatus.todo || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <p className="text-secondary">Task insights and activity overview</p>
        </div>
      </div>

      <ReportsStatus
        total={total}
        done={done}
        todo={todo}
        recentActivityCount={recentActivityCount}
      />

      <ReportsPieChart total={total} done={done} todo={todo} />
    </div>
  );
}
