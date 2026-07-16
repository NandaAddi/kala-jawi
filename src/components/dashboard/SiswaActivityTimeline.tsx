import { Aktivitas } from "@/types/dashboard";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";

interface SiswaActivityTimelineProps {
  data: Aktivitas[];
}

const activityColors = {
  quiz: "bg-blue-100 text-blue-700",
  "mini game": "bg-purple-100 text-purple-700",
  eksplorasi: "bg-green-100 text-green-700",
  default: "bg-gray-100 text-gray-700",
};

export function SiswaActivityTimeline({ data }: SiswaActivityTimelineProps) {
  const getActivityColor = (jenis: string) => {
    const key = jenis.toLowerCase() as keyof typeof activityColors;
    return activityColors[key] || activityColors.default;
  };

  return (
    <div className="space-y-4">
      {data && data.length > 0 ? (
        data.map((activity, idx) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1 + idx * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-brand-gold mt-2" />
              {idx !== data.length - 1 && <div className="w-0.5 h-12 bg-brand-gold/30 mt-2" />}
            </div>
            <div className="flex-1 pb-4">
              <div className="bg-white rounded-lg border border-brand-gold/30 p-4 transition-all duration-300 hover:border-brand-gold/40 hover:shadow-md hover:shadow-brand-gold/10">
                <div className="flex items-start justify-between mb-2 gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-brand-dark text-sm leading-snug">
                      {activity.chapter_nama}
                    </p>
                    <p className="text-xs text-brand-dark/70 mt-1">
                      {format(new Date(activity.tanggal), "dd MMMM yyyy HH:mm", {
                        locale: id,
                      })}
                    </p>
                  </div>
                  <Badge className={getActivityColor(activity.jenis_aktivitas)}>
                    {activity.jenis_aktivitas}
                  </Badge>
                </div>
                {activity.nilai !== undefined && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-brand-dark/70 font-semibold">Nilai:</span>
                    <span className="font-bold text-brand-gold text-sm">{activity.nilai}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="text-center text-brand-dark/70 py-8 font-medium text-sm">
          Belum ada aktivitas tercatat
        </div>
      )}
    </div>
  );
}
