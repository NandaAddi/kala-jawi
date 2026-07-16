import { motion } from "motion/react";
import { BookOpen, Users, TrendingUp, Activity, CheckCircle2, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TimelineActivity {
  id: string;
  siswa_nama: string;
  jenis_aktivitas: string;
  chapter_nama: string;
  nilai?: number;
  tanggal: string;
}

interface ActivityTimelineProps {
  activities: TimelineActivity[];
  compact?: boolean;
}

const activityIcons: Record<string, React.ReactNode> = {
  "Menyelesaikan Modul": <CheckCircle2 className="w-5 h-5" />,
  "Mengerjakan Kuis": <BookOpen className="w-5 h-5" />,
  "Membuka Chapter": <TrendingUp className="w-5 h-5" />,
  "Aktivitas Siswa": <Activity className="w-5 h-5" />,
  default: <Activity className="w-5 h-5" />,
};

const activityColors: Record<string, string> = {
  "Menyelesaikan Modul": "text-brand-gold",
  "Mengerjakan Kuis": "text-brand-medium",
  "Membuka Chapter": "text-brand-tan",
  "Aktivitas Siswa": "text-brand-light-gold",
  default: "text-brand-gold",
};

export function ActivityTimeline({ activities, compact = false }: ActivityTimelineProps) {
  if (!activities || activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <AlertCircle
          className={cn("text-brand-dark/20 mb-2", compact ? "w-10 h-10" : "w-12 h-12")}
        />
        <p className={cn("text-center text-brand-dark/50", compact ? "text-xs" : "text-sm")}>
          Belum ada aktivitas hari ini
        </p>
      </div>
    );
  }

  return (
    <div className={cn(compact ? "space-y-3" : "space-y-4")}>
      {activities.map((activity, index) => {
        const icon = activityIcons[activity.jenis_aktivitas] || activityIcons.default;
        const iconColor = activityColors[activity.jenis_aktivitas] || activityColors.default;

        return (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1 + index * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={cn("flex pb-4", compact ? "gap-3" : "gap-4")}
          >
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className={cn(
                  "rounded-full border-2 border-brand-gold/30 bg-brand-dark/5 transition-all duration-300 flex items-center justify-center",
                  iconColor,
                  compact ? "p-1.5 w-8 h-8" : "p-2.5 w-10 h-10",
                )}
              >
                {icon}
              </div>
              {index < activities.length - 1 && (
                <div
                  className={cn(
                    "bg-gradient-to-b from-brand-gold/30 to-brand-gold/10 mt-2",
                    compact ? "w-px h-10" : "w-0.5 h-12",
                  )}
                />
              )}
            </div>

            <div className={cn("flex-1", compact ? "pt-0" : "pt-1")}>
              <div
                className={cn(
                  "rounded-xl border border-brand-gold/30 bg-brand-cream/50 transition-all duration-300 hover:border-brand-gold/40 hover:bg-brand-cream/80 hover:shadow-md hover:shadow-brand-gold/10",
                  compact ? "p-3" : "p-4",
                )}
              >
                <div
                  className={cn("flex items-start justify-between", compact ? "gap-2" : "gap-4")}
                >
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "font-semibold text-brand-dark leading-snug",
                        compact ? "text-xs" : "text-sm",
                      )}
                    >
                      {activity.siswa_nama}
                    </p>
                    <p
                      className={cn(
                        "text-brand-dark/70 mt-1 leading-snug",
                        compact ? "text-xs" : "text-sm",
                      )}
                    >
                      {activity.jenis_aktivitas}
                    </p>
                    <p
                      className={cn(
                        "text-brand-dark/60 leading-snug",
                        compact ? "text-xs mt-1" : "text-xs mt-2",
                      )}
                    >
                      {activity.chapter_nama}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {activity.nilai && (
                      <div className={compact ? "mb-1" : "mb-2"}>
                        <span
                          className={cn(
                            "inline-block rounded-full bg-brand-gold/20 font-bold text-brand-gold",
                            compact ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
                          )}
                        >
                          {activity.nilai}
                        </span>
                      </div>
                    )}
                    <p className="text-xs text-brand-dark/50 whitespace-nowrap">
                      {format(new Date(activity.tanggal), "HH:mm")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
