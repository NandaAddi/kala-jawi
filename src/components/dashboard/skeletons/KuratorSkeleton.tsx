import { Skeleton, SkeletonCard, SkeletonText, SkeletonCircle } from "@/components/ui/skeleton";

export function KuratorSkeleton() {
  return (
    <div className="space-y-6">
      <SkeletonCard className="p-6">
        <div className="space-y-3">
          <Skeleton className="h-5 w-32 rounded bg-brand-dark/10" />
          <Skeleton className="h-10 w-full rounded-lg bg-brand-cream/40" />
        </div>
      </SkeletonCard>

      <SkeletonCard className="p-6">
        <div className="space-y-3">
          <Skeleton className="h-5 w-36 rounded bg-brand-dark/10" />
          <div className="flex items-center gap-4">
            <SkeletonCircle size="w-14 h-14" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-28 rounded bg-brand-dark/10" />
              <SkeletonText width="w-20" className="h-3" />
            </div>
          </div>
        </div>
      </SkeletonCard>

      <SkeletonCard className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-5 w-40 rounded bg-brand-dark/10" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="w-5 h-5 rounded bg-brand-gold/15" />
                <SkeletonText width="w-48" className="h-3" />
              </div>
            ))}
          </div>
        </div>
      </SkeletonCard>

      <SkeletonCard className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-5 w-44 rounded bg-brand-dark/10" />
          <Skeleton className="h-10 w-full rounded-lg bg-brand-cream/40" />
          <Skeleton className="h-10 w-40 rounded-lg bg-brand-gold/20" />
        </div>
      </SkeletonCard>
    </div>
  );
}
