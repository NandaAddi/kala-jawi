import { Skeleton, SkeletonCard, SkeletonText } from "@/components/ui/skeleton";

export function AnalisisSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Skeleton className="h-10 w-52 rounded-lg bg-brand-cream/40" />
      </div>

      <SkeletonCard className="p-6">
        <div className="flex items-start gap-3">
          <Skeleton className="w-10 h-10 rounded-lg bg-brand-gold/15" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-48 rounded bg-brand-dark/10" />
            <SkeletonText width="w-full" className="h-3" />
            <SkeletonText width="w-3/4" className="h-3" />
          </div>
        </div>
      </SkeletonCard>

      <SkeletonCard className="h-96">
        <div className="space-y-4 mb-6">
          <Skeleton className="h-6 w-56 rounded bg-brand-dark/10" />
          <SkeletonText width="w-24" className="h-3" />
          <div className="flex gap-6 pt-4 border-t border-brand-gold/20">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-1">
                <SkeletonText width="w-16" className="h-2" />
                <Skeleton className="h-5 w-12 rounded bg-brand-light-gold/20" />
              </div>
            ))}
          </div>
        </div>
        <Skeleton className="h-64 w-full rounded bg-brand-cream/40" />
      </SkeletonCard>

      <SkeletonCard className="h-96">
        <div className="space-y-4 mb-6">
          <Skeleton className="h-6 w-52 rounded bg-brand-dark/10" />
          <SkeletonText width="w-20" className="h-3" />
          <div className="flex gap-6 pt-4 border-t border-brand-gold/20">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-1">
                <SkeletonText width="w-20" className="h-2" />
                <Skeleton className="h-5 w-12 rounded bg-brand-light-gold/20" />
              </div>
            ))}
          </div>
        </div>
        <Skeleton className="h-64 w-full rounded bg-brand-cream/40" />
      </SkeletonCard>
    </div>
  );
}
