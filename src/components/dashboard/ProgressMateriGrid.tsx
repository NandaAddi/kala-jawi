import { ProgressMateri } from "@/types/dashboard";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "motion/react";

interface ProgressMateriGridProps {
  data: ProgressMateri[];
}

const statusStyles = {
  Selesai: "bg-green-100 text-green-700",
  "Sedang Berjalan": "bg-blue-100 text-blue-700",
  "Belum Mulai": "bg-gray-100 text-gray-700",
};

export function ProgressMateriGrid({ data }: ProgressMateriGridProps) {
  const getStatusColor = (status: string) => {
    return statusStyles[status as keyof typeof statusStyles] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((progress, index) => (
        <motion.div
          key={progress.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.1 + index * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="bg-white rounded-lg border border-brand-gold/30 p-4 transition-all duration-300 hover:border-brand-gold/40 hover:shadow-md hover:shadow-brand-gold/10"
        >
          <div className="flex items-start justify-between mb-3 gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-brand-dark text-sm leading-snug">
                {progress.chapter_nama}
              </h3>
              <p className="text-xs text-brand-dark/70 mt-1">
                Waktu bermain: {Math.round(progress.waktu_bermain / 60)} menit
              </p>
            </div>
            <Badge className={getStatusColor(progress.status)}>{progress.status}</Badge>
          </div>

          {progress.nilai !== undefined && (
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs">
                <span className="text-brand-dark/70 font-semibold">Nilai</span>
                <span className="font-bold text-brand-gold">{progress.nilai}</span>
              </div>
              <Progress value={progress.nilai} className="h-2" />
            </div>
          )}

          {progress.status === "Belum Mulai" && (
            <p className="text-xs text-brand-dark/70 mt-3 font-medium">
              Siswa belum memulai materi ini
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
