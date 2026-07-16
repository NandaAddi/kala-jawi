import { Skeleton, SkeletonCard, SkeletonText } from "@/components/ui/skeleton";

export function KelasSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <SkeletonText width="w-24" className="h-4" />
        <Skeleton className="h-10 w-32 rounded-lg bg-brand-gold/20" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i} className="h-48">
            <div className="space-y-4">
              <div className="space-y-2 pr-8">
                <Skeleton className="h-5 w-32 rounded bg-brand-dark/10" />
                <div className="flex items-center gap-2">
                  <Skeleton className="w-4 h-4 rounded bg-brand-gold/15" />
                  <SkeletonText width="w-20" className="h-3 font-mono" />
                </div>
              </div>
              <div className="pt-4 border-t border-brand-gold/30">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-5 h-5 rounded bg-brand-gold/15" />
                  <div className="space-y-1">
                    <SkeletonText width="w-16" className="h-2" />
                    <Skeleton className="h-5 w-6 rounded bg-brand-dark/10" />
                  </div>
                </div>
              </div>
            </div>
          </SkeletonCard>
        ))}
      </div>
    </div>
  );
}
