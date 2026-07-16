import { ProgressMateri } from "@/types/dashboard";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ProgressMateriGridProps {
  data: ProgressMateri[];
}

export function ProgressMateriGrid({ data }: ProgressMateriGridProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Selesai":
        return "bg-green-100 text-green-700";
      case "Sedang Berjalan":
        return "bg-blue-100 text-blue-700";
      case "Belum Mulai":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((progress) => (
        <div key={progress.id} className="bg-white rounded-lg border border-brand-gold/20 p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-brand-dark">{progress.chapter_nama}</h3>
              <p className="text-xs text-brand-dark/50">
                Waktu bermain: {Math.round(progress.waktu_bermain / 60)} menit
              </p>
            </div>
            <Badge className={getStatusColor(progress.status)}>{progress.status}</Badge>
          </div>

          {progress.nilai !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-brand-dark/60">Nilai</span>
                <span className="font-semibold text-brand-gold">{progress.nilai}</span>
              </div>
              <Progress value={progress.nilai} className="h-2" />
            </div>
          )}

          {progress.status === "Belum Mulai" && (
            <p className="text-xs text-brand-dark/50 mt-3">Siswa belum memulai materi ini</p>
          )}
        </div>
      ))}
    </div>
  );
}
