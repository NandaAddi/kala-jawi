import { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ChartContainerProps {
  title: string;
  children: ReactNode;
  description?: string;
  mini_stats?: Array<{
    label: string;
    value: string | number;
  }>;
  className?: string;
}

export function ChartContainer({
  title,
  children,
  description,
  mini_stats,
  className,
}: ChartContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "rounded-xl border border-brand-gold/30 bg-brand-dark/90 p-8 shadow-lg shadow-brand-gold/10 backdrop-blur-sm",
        className,
      )}
    >
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-brand-cream font-display leading-tight">
              {title}
            </h2>
            {description && (
              <p className="text-sm text-brand-cream/70 mt-2 leading-relaxed">{description}</p>
            )}
          </div>
        </div>

        {mini_stats && mini_stats.length > 0 && (
          <div className="flex flex-wrap gap-6 pt-4 border-t border-brand-gold/30">
            {mini_stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col"
              >
                <p className="text-xs text-brand-cream/60 uppercase tracking-wider font-semibold">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-brand-light-gold mt-1 font-display">
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="overflow-x-auto">{children}</div>
    </motion.div>
  );
}
