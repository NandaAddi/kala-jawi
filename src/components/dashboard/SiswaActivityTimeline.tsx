import { Aktivitas } from "@/types/dashboard";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

interface SiswaActivityTimelineProps {
  data: Aktivitas[];
}

export function SiswaActivityTimeline({ data }: SiswaActivityTimelineProps) {
  const getActivityColor = (jenis: string) => {
    switch (jenis.toLowerCase()) {
      case "quiz":
        return "bg-blue-100 text-blue-700";
      case "mini game":
        return "bg-purple-100 text-purple-700";
      case "eksplorasi":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-4">
      {data && data.length > 0 ? (
        data.map((activity, idx) => (
          <div key={activity.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-brand-gold mt-2" />
              {idx !== data.length - 1 && <div className="w-0.5 h-12 bg-brand-gold/20 mt-2" />}
            </div>
            <div className="flex-1 pb-4">
              <div className="bg-white rounded-lg border border-brand-gold/20 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-brand-dark">{activity.chapter_nama}</p>
                    <p className="text-sm text-brand-dark/60">
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
                    <span className="text-sm text-brand-dark/60">Nilai:</span>
                    <span className="font-bold text-brand-gold">{activity.nilai}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-brand-dark/50 py-8">Belum ada aktivitas tercatat</div>
      )}
    </div>
  );
}
