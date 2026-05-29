export function DashboardSkeleton() {
  return (
    <section className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <SkeletonTile className="min-h-[300px] md:col-span-2 xl:row-span-2" />
      <SkeletonTile />
      <SkeletonTile />
      <SkeletonTile />
      <SkeletonTile />
      <SkeletonTile className="min-h-[280px] md:col-span-2" />
    </section>
  );
}

function SkeletonTile({ className = "" }: { className?: string }) {
  return (
    <article
      className={`relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.055] p-5 shadow-glow ${className}`}
    >
      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/5 via-teal-200/5 to-pink-200/5" />
      <div className="relative z-10 space-y-4">
        <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
        <div className="h-8 w-3/4 animate-pulse rounded bg-white/10" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-white/10" />
      </div>
    </article>
  );
}
