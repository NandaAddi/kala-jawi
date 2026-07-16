import { Skeleton, SkeletonCard, SkeletonText, SkeletonCircle } from "@/components/ui/skeleton";

export function SiswaDetailSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonCard key={i} className="h-32">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <SkeletonText width="w-24" className="h-3" />
                <Skeleton className="h-8 w-20 rounded bg-brand-dark/12" />
              </div>
              <Skeleton className="w-10 h-10 rounded-lg bg-brand-gold/15" />
            </div>
          </SkeletonCard>
        ))}
      </div>

      <SkeletonCard className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <Skeleton className="w-10 h-10 rounded-lg bg-brand-gold/15" />
          <Skeleton className="h-5 w-36 rounded bg-brand-dark/10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <SkeletonCard key={i} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32 rounded bg-brand-dark/10" />
                  <SkeletonText width="w-20" className="h-2" />
                </div>
                <Skeleton className="h-5 w-16 rounded-full bg-green-100" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <SkeletonText width="w-8" className="h-2" />
                  <SkeletonText width="w-6" className="h-2" />
                </div>
                <Skeleton className="h-2 w-full rounded-full bg-brand-cream/40" />
              </div>
            </SkeletonCard>
          ))}
        </div>
      </SkeletonCard>

      <SkeletonCard className="p-6">
        <div className="flex items-start gap-3 mb-6">
          <Skeleton className="w-10 h-10 rounded-lg bg-brand-gold/15" />
          <Skeleton className="h-5 w-32 rounded bg-brand-dark/10" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3">
              <SkeletonCircle size="w-8 h-8" className="flex-shrink-0" />
              <div className="flex-1">
                <SkeletonCard className="p-3">
                  <div className="flex gap-2">
                    <div className="flex-1 space-y-2">
                      <SkeletonText width="w-24" className="h-3" />
                      <SkeletonText width="w-16" className="h-2" />
                    </div>
                    <SkeletonText width="w-10" className="h-2" />
                  </div>
                </SkeletonCard>
              </div>
            </div>
          ))}
        </div>
      </SkeletonCard>
    </div>
  );
}
