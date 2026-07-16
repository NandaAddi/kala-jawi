import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: ReactNode;
  variant?: "blue-cyan" | "purple-pink" | "blue-emerald";
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
}

export function GradientText({
  children,
  variant = "blue-cyan",
  as: Component = "span",
  className,
}: GradientTextProps) {
  const variantClasses = {
    "blue-cyan": "gradient-text",
    "purple-pink": "gradient-text-purple",
    "blue-emerald": "bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent",
  };

  return <Component className={cn(variantClasses[variant], className)}>{children}</Component>;
}
