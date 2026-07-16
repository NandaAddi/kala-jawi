import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";

interface GlassCardProps extends MotionProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "cyan" | "purple" | "blue" | "none";
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  hover = true,
  glow = "none",
  onClick,
  ...motionProps
}: GlassCardProps) {
  const glowClasses = {
    cyan: "glow-cyan",
    purple: "glow-purple",
    blue: "glow-blue",
    none: "",
  };

  return (
    <motion.div
      className={cn(
        "glass-container rounded-2xl",
        hover && "glass-hover cursor-pointer",
        glowClasses[glow],
        className,
      )}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
