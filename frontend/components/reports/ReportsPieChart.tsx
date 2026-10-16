import { PieChart } from "lucide-react";

interface ReportsPieChartProps {
  total: number;
  done: number;
  todo: number;
}

export function ReportsPieChart({ total, done, todo }: ReportsPieChartProps) {
  const completedPercentage = total > 0 ? (done / (done + todo)) * 100 : 0;
  const pendingPercentage = total > 0 ? (todo / (done + todo)) * 100 : 0;

  if (total === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <PieChart className="h-5 w-5 text-secondary" />
          Completion Overview
        </h2>
        <div className="text-center py-12 text-secondary">
          No tasks to display
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <PieChart className="h-5 w-5 text-secondary" />
        Completion Overview
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-12 py-4">
        <div
          className="w-64 h-64 rounded-full shadow-inner"
          style={{
            background: `conic-gradient(
              #10b981 0% ${completedPercentage}%, 
              #f97316 ${completedPercentage}% 100%
            )`,
          }}
        />

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded bg-emerald-500 shadow-sm" />
            <div>
              <div className="font-semibold text-text">Completed</div>
              <div className="text-sm text-secondary">
                {completedPercentage.toFixed(1)}% ({done} tasks)
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded bg-orange-500 shadow-sm" />
            <div>
              <div className="font-semibold text-text">Pending</div>
              <div className="text-sm text-secondary">
                {pendingPercentage.toFixed(1)}% ({todo} tasks)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}