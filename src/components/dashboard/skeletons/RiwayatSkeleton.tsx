import { Skeleton, SkeletonCard, SkeletonText, SkeletonCircle } from "@/components/ui/skeleton";

export function RiwayatSkeleton() {
  return (
    <div className="space-y-6">
      <SkeletonCard className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Skeleton className="h-10 w-full rounded-lg bg-brand-cream/40" />
          <Skeleton className="h-10 w-full rounded-lg bg-brand-cream/40" />
          <Skeleton className="h-10 w-full rounded-lg bg-brand-cream/40" />
          <Skeleton className="h-10 w-full rounded-lg bg-brand-cream/40" />
        </div>
      </SkeletonCard>

      <SkeletonCard className="p-6">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-3">
              <SkeletonCircle size="w-8 h-8" className="flex-shrink-0" />
              <div className="flex-1">
                <SkeletonCard className="p-3">
                  <div className="flex gap-2">
                    <div className="flex-1 space-y-2">
                      <SkeletonText width="w-28" className="h-3" />
                      <SkeletonText width="w-20" className="h-2" />
                      <SkeletonText width="w-24" className="h-2" />
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
      </SkeletonCard>

      <div className="flex justify-between items-center">
        <SkeletonText width="w-32" className="h-4" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20 rounded-lg bg-brand-cream/40" />
          <Skeleton className="h-9 w-16 rounded-lg bg-brand-cream/40" />
        </div>
      </div>
    </div>
  );
}
