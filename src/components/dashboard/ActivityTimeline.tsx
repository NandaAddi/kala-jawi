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

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  if (!activities || activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="w-12 h-12 text-brand-dark/20 mb-3" />
        <p className="text-center text-brand-dark/50">Belum ada aktivitas hari ini</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {activities.map((activity, index) => {
        const icon = activityIcons[activity.jenis_aktivitas] || activityIcons.default;
        const iconColor = activityColors[activity.jenis_aktivitas] || activityColors.default;

        return (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "p-2.5 rounded-full border-2 border-brand-gold/40 bg-brand-dark/5 transition-all duration-300",
                  iconColor,
                )}
              >
                {icon}
              </div>
              {index < activities.length - 1 && (
                <div className="w-0.5 h-12 bg-gradient-to-b from-brand-gold/40 to-brand-gold/10 mt-2" />
              )}
            </div>

            <div className="flex-1 pt-1">
              <div className="group cursor-pointer rounded-lg border border-brand-gold/20 bg-brand-cream/50 p-4 transition-all duration-300 hover:border-brand-gold/40 hover:bg-brand-cream/80 hover:shadow-md hover:shadow-brand-gold/10">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1">
                    <p className="font-semibold text-brand-dark">{activity.siswa_nama}</p>
                    <p className="text-sm text-brand-dark/70 mt-0.5">{activity.jenis_aktivitas}</p>
                    <p className="text-xs text-brand-dark/60 mt-1">{activity.chapter_nama}</p>
                  </div>
                  <div className="text-right ml-4">
                    {activity.nilai && (
                      <div className="mb-1">
                        <span className="inline-block px-3 py-1 rounded-full bg-brand-gold/20 text-sm font-bold text-brand-gold">
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
