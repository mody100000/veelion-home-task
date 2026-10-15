import type { ActivityLog } from "@/types/api";
import { ActivityItem } from "./ActivityItem";

type ActivityListProps = {
  activities: ActivityLog[];
};

export function ActivityList({ activities }: ActivityListProps) {
  return (
    <ul className="flex flex-col gap-3 m-0 p-0 list-none">
      {activities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </ul>
  );
}
