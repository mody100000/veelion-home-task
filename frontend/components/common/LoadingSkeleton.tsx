export function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      {[1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-zinc-200" />
            <div className="space-y-2">
              <div className="h-4 w-48 rounded bg-zinc-200" />
              <div className="h-3 w-24 rounded bg-zinc-200" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-24 rounded-full bg-zinc-200" />
            <div className="flex gap-2">
              <div className="h-9 w-9 rounded-lg bg-zinc-200" />
              <div className="h-9 w-9 rounded-lg bg-zinc-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
