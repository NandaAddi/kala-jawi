import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-brand-cream/60",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent",
        className,
      )}
      {...props}
    />
  );
}

function SkeletonCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-lg border border-brand-gold/20 bg-brand-cream/50 p-6", className)}
      {...props}
    />
  );
}

function SkeletonText({
  className,
  width = "w-full",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { width?: string }) {
  return <Skeleton className={cn("h-4 rounded", width, "bg-brand-dark/8", className)} {...props} />;
}

function SkeletonCircle({
  className,
  size = "w-12 h-12",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { size?: string }) {
  return <Skeleton className={cn("rounded-full bg-brand-dark/10", size, className)} {...props} />;
}

export { Skeleton, SkeletonCard, SkeletonText, SkeletonCircle };
