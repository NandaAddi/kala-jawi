import type { LucideIcon } from "lucide-react";

interface SocialButtonProps {
  icon: LucideIcon;
  label: string;
}

export function SocialButton({ icon: Icon, label }: SocialButtonProps) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-2 rounded-lg border border-brand-gold/40 bg-transparent px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-brand-gold hover:bg-brand-gold/10"
    >
      <Icon className="size-5" />
      <span>{label}</span>
    </button>
  );
}
