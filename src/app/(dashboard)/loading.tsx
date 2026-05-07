export default function DashboardLoading() {
  return (
    <div className="flex w-full max-w-[600px] flex-col gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="animate-pulse space-y-3">
          <div className="h-4 w-1/3 rounded bg-gray-200" />
          <div className="h-10 w-full rounded-lg bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
