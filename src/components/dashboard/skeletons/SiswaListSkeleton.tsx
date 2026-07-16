import { Skeleton, SkeletonCard, SkeletonText, SkeletonCircle } from "@/components/ui/skeleton";

export function KelasSelectionSkeleton() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <Skeleton className="h-8 w-48 mx-auto rounded bg-brand-dark/10" />
        <SkeletonText width="w-64" className="h-4 mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i} className="h-52 p-8">
            <div className="space-y-4">
              <Skeleton className="w-12 h-12 rounded-lg bg-brand-gold/15" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-24 rounded bg-brand-dark/10" />
                <SkeletonText width="w-20" className="h-3" />
              </div>
              <div className="pt-4 border-t border-brand-gold/20 flex items-center gap-3">
                <SkeletonCircle size="w-5 h-5" />
                <div className="space-y-1">
                  <SkeletonText width="w-16" className="h-2" />
                  <Skeleton className="h-5 w-8 rounded bg-brand-dark/10" />
                </div>
              </div>
            </div>
          </SkeletonCard>
        ))}
      </div>
    </div>
  );
}

export function SiswaGridSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-52 rounded bg-brand-dark/8" />

      <SkeletonCard className="p-4">
        <Skeleton className="h-10 w-full rounded bg-brand-cream/40" />
      </SkeletonCard>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <SkeletonCard key={i} className="h-64">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <SkeletonCircle size="w-12 h-12" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-28 rounded bg-brand-dark/10" />
                  <SkeletonText width="w-16" className="h-2" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <SkeletonText width="w-16" className="h-2" />
                  <SkeletonText width="w-8" className="h-2" />
                </div>
                <Skeleton className="h-2 w-full rounded-full bg-brand-cream/40" />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-brand-gold/20">
                {[1, 2].map((j) => (
                  <div key={j} className="flex items-center gap-2">
                    <Skeleton className="w-5 h-5 rounded bg-brand-gold/15" />
                    <div className="space-y-1">
                      <SkeletonText width="w-8" className="h-2" />
                      <Skeleton className="h-4 w-10 rounded bg-brand-dark/10" />
                    </div>
                  </div>
                ))}
              </div>
              <Skeleton className="h-9 w-full rounded bg-brand-cream/40" />
            </div>
          </SkeletonCard>
        ))}
      </div>
    </div>
  );
}
