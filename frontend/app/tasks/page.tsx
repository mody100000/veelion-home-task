import { TaskDashboard } from "@/components/tasks/TaskDashboard";

export default function TasksPage() {
  return (
    <main className="mx-auto flex w-full flex-col gap-4 p-4">
      <TaskDashboard />
    </main>
  );
}
