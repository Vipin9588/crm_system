export function SalesPageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 rounded-xl bg-muted" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="h-[320px] rounded-xl bg-muted lg:col-span-2" />
        <div className="h-[320px] rounded-xl bg-muted" />
      </div>
      <div className="h-[320px] rounded-xl bg-muted" />
    </div>
  );
}