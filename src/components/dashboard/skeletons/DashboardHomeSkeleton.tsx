import { Skeleton, SkeletonCard, SkeletonText, SkeletonCircle } from "@/components/ui/skeleton";

export function DashboardHomeSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonCard key={i} className="h-32">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                <SkeletonText width="w-24" className="h-3" />
                <Skeleton className="h-8 w-16 rounded bg-brand-dark/12" />
                <SkeletonText width="w-32" className="h-2" />
              </div>
              <Skeleton className="w-12 h-12 rounded-lg bg-brand-gold/15" />
            </div>
          </SkeletonCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2">
          <SkeletonCard className="h-[600px]">
            <div className="space-y-4 mb-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-56 rounded bg-brand-dark/10" />
                  <SkeletonText width="w-32" className="h-3" />
                </div>
              </div>
              <div className="flex gap-6 pt-4 border-t border-brand-gold/20">
                {[1, 2].map((i) => (
                  <div key={i} className="space-y-1">
                    <SkeletonText width="w-16" className="h-2" />
                    <Skeleton className="h-5 w-12 rounded bg-brand-light-gold/20" />
                  </div>
                ))}
              </div>
            </div>
            <Skeleton className="h-64 w-full rounded bg-brand-cream/40" />
          </SkeletonCard>
        </div>

        <div className="rounded-xl border border-brand-gold/30 bg-white/80 h-[600px] flex flex-col">
          <div className="p-6 border-b border-brand-gold/30">
            <Skeleton className="h-5 w-36 rounded bg-brand-dark/10" />
          </div>
          <div className="flex-1 p-6 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-3">
                <SkeletonCircle size="w-8 h-8" className="flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <SkeletonCard className="p-3">
                    <div className="flex gap-2">
                      <div className="flex-1 space-y-2">
                        <SkeletonText width="w-24" className="h-3" />
                        <SkeletonText width="w-20" className="h-2" />
                        <SkeletonText width="w-28" className="h-2" />
                      </div>
                      <div className="space-y-1 text-right">
                        <Skeleton className="h-4 w-8 rounded-full bg-brand-gold/15" />
                        <SkeletonText width="w-10" className="h-2" />
                      </div>
                    </div>
                  </SkeletonCard>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
