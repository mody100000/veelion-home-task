import { TaskDashboard } from "@/components/tasks/TaskDashboard";

export default function TasksPage() {
  return (
    <main className="mx-auto grid w-full gap-6 px-4 py-8 md:px-6">
      <TaskDashboard />
    </main>
  );
}
