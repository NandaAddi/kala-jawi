import { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { BookOpen, Star, Clock, Trophy } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  status?: "active" | "finished" | "paused";
  characterImage?: string;
  icon?: ReactNode;
}

const statusConfig = {
  active: {
    label: "Active",
    icon: <BookOpen className="w-3 h-3" />,
    bg: "bg-blue-500",
    text: "text-white",
  },
  finished: {
    label: "Finished",
    icon: <Trophy className="w-3 h-3" />,
    bg: "bg-emerald-500",
    text: "text-white",
  },
  paused: {
    label: "Paused",
    icon: <Clock className="w-3 h-3" />,
    bg: "bg-amber-500",
    text: "text-white",
  },
};

const defaultIcons = [
  <BookOpen className="w-4 h-4" />,
  <Star className="w-4 h-4" />,
  <Clock className="w-4 h-4" />,
  <Trophy className="w-4 h-4" />,
];

export function StatCard({
  title,
  value,
  description,
  status = "active",
  characterImage,
  icon,
}: StatCardProps) {
  const statusStyle = statusConfig[status];
  const displayIcon = icon || defaultIcons[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="relative bg-white rounded-xl border border-gray-100 p-5 pb-0 pr-0 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden min-h-[120px]"
    >
      {/* Status Badge */}
      <div className={cn("w-fit inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold", statusStyle.bg, statusStyle.text)}>
        {statusStyle.icon}
        {statusStyle.label}
      </div>

      {/* Content */}
      <div className="mt-3 pr-16">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{value}</p>
      </div>

      {/* Character Illustration */}
      {characterImage && (
        <div className="absolute bottom-0 right-0 w-20 h-32">
          <img
            src={characterImage}
            alt=""
            className="w-full h-full object-contain object-bottom translate-y-2"
          />
        </div>
      )}

      {/* Decorative dots */}
      <div className="absolute top-5 right-5 flex gap-1">
        <div className="w-1 h-1 rounded-full bg-gray-300" />
        <div className="w-1 h-1 rounded-full bg-gray-300" />
        <div className="w-1 h-1 rounded-full bg-gray-300" />
      </div>
    </motion.div>
  );
}
