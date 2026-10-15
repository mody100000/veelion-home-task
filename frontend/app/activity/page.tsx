import { ActivityClient } from "@/components/activity/ActivityClient";

export default function ActivityPage() {
  return (
    <main className="mx-auto grid w-full gap-6 px-4 py-8 md:px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-zinc-900">Activity Log</h1>
        <p className="text-sm text-slate-500">
          Track all operations and updates across your tasks.
        </p>
      </div>

      <ActivityClient />
    </main>
  );
}
