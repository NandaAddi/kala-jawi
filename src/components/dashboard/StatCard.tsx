import { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  variant?: "primary" | "secondary" | "counter";
  description?: string;
}

const variantStyles = {
  primary: {
    container: "bg-brand-dark border-brand-gold/40 shadow-lg shadow-brand-gold/20",
    title: "text-brand-cream/70 text-sm",
    value: "text-brand-light-gold text-4xl",
    icon: "text-brand-gold",
  },
  secondary: {
    container: "bg-brand-cream border-brand-gold/20 shadow-sm",
    title: "text-brand-dark/60 text-sm",
    value: "text-brand-dark text-2xl",
    icon: "text-brand-gold",
  },
  counter: {
    container: "bg-transparent border-brand-gold/30 shadow-none",
    title: "text-brand-dark/70 text-xs uppercase tracking-wider",
    value: "text-brand-dark text-3xl font-display",
    icon: "text-brand-gold/60",
  },
};

export function StatCard({
  title,
  value,
  icon,
  variant = "secondary",
  description,
}: StatCardProps) {
  const styles = variantStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={variant !== "counter" ? { y: -4 } : undefined}
      className={cn("rounded-lg border p-6 transition-all duration-300", styles.container)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={styles.title}>{title}</p>
          <p className={cn("mt-3 font-bold font-display", styles.value)}>{value}</p>
          {description && <p className="mt-2 text-xs text-brand-dark/50">{description}</p>}
        </div>
        <div className={cn("p-3 rounded-lg", styles.icon)}>{icon}</div>
      </div>
    </motion.div>
  );
}
