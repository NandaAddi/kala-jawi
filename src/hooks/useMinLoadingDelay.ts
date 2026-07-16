import { useState, useEffect } from "react";

/**
 * Ensures a minimum loading duration so skeleton always appears
 * before real content, even when data loads instantly (mock/cache).
 *
 * @param isLoading - The actual loading state from useQuery
 * @param minDelay - Minimum milliseconds skeleton must show (default: 800ms)
 * @returns A boolean that is true while skeleton should be visible
 */
export function useMinLoadingDelay(isLoading: boolean, minDelay = 800): boolean {
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowSkeleton(true);
      const timer = setTimeout(() => setShowSkeleton(false), minDelay);
      return () => clearTimeout(timer);
    } else {
      setShowSkeleton(false);
    }
  }, [isLoading, minDelay]);

  return showSkeleton;
}
