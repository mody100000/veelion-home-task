import { PlusCircle, Edit2, Trash2, CheckCircle2, Info } from "lucide-react";
import type { ActivityLog } from "@/types/api";
import { formatTaskDate } from "@/utils/date";

type ActivityItemProps = {
  activity: ActivityLog;
};

export function ActivityItem({ activity }: ActivityItemProps) {
  let Icon = Info;
  let colorClass = "bg-gray-100 text-gray-600";
  let label = activity.action || "System";

  switch (activity.action) {
    case "created":
      Icon = PlusCircle;
      colorClass = "bg-blue-100 text-blue-600";
      label = "Created";
      break;
    case "updated":
      Icon = Edit2;
      colorClass = "bg-amber-100 text-amber-600";
      label = "Updated";
      break;
    case "deleted":
      Icon = Trash2;
      colorClass = "bg-red-100 text-red-600";
      label = "Deleted";
      break;
    case "status_changed":
      Icon = CheckCircle2;
      colorClass = "bg-emerald-100 text-emerald-600";
      label = "Status Changed";
      break;
  }

  return (
    <li className="flex items-start gap-4 rounded-xl border border-border bg-white p-4 transition-all hover:shadow-sm">
      <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${colorClass}`}>
        <Icon size={20} />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-zinc-900">{label}</span>
          <span className="text-xs text-slate-500">{formatTaskDate(activity.when)}</span>
        </div>
        <p className="mt-1 text-sm text-slate-600">{activity.info}</p>
      </div>
    </li>
  );
}
