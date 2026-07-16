import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { AnalisisSkeleton } from "@/components/dashboard/skeletons/AnalisisSkeleton";
import { useMinLoadingDelay } from "@/hooks/useMinLoadingDelay";
import { getAnalisisData, getKelasList } from "@/lib/api/dashboard";
import { getMockUser } from "@/lib/auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KemampuanLineChart } from "@/components/dashboard/KemampuanLineChart";
import { DistribusiNilaiChart } from "@/components/dashboard/DistribusiNilaiChart";
import { Lightbulb } from "lucide-react";

export const Route = createFileRoute("/dashboard/analisis")({
  component: AnalisisPage,
});

function AnalisisPage() {
  const [selectedKelas, setSelectedKelas] = useState<string>("all");
  const user = getMockUser();

  const { data: kelasList } = useQuery({
    queryKey: ["kelas", user?.id],
    queryFn: () => getKelasList(user?.id || ""),
  });

  const { data: analisis, isLoading } = useQuery({
    queryKey: ["analisis", selectedKelas === "all" ? undefined : selectedKelas],
    queryFn: () => getAnalisisData(selectedKelas === "all" ? undefined : selectedKelas),
  });

  const showSkeleton = useMinLoadingDelay(isLoading);

  if (showSkeleton) {
    return (
      <DashboardLayout title="Analisis" subtitle="Memuat data analisis...">
        <AnalisisSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Analisis"
      subtitle="Visualisasi kemampuan siswa secara agregat dan insight pembelajaran."
    >
      <div className="space-y-6">
        <div className="flex justify-end">
          <Select value={selectedKelas} onValueChange={setSelectedKelas}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Pilih Kelas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kelas</SelectItem>
              {kelasList?.map((kelas) => (
                <SelectItem key={kelas.id} value={kelas.id}>
                  {kelas.nama_kelas}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {analisis?.insight && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-lg border border-brand-gold/30 bg-brand-dark/90 p-6 shadow-lg shadow-brand-gold/10 backdrop-blur-sm"
          >
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-brand-gold flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-brand-cream font-display mb-2">Insight Otomatis</h3>
                <p className="text-brand-cream/80 leading-relaxed">{analisis.insight}</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="space-y-6">
          <ChartContainer
            title="Kemampuan per Materi"
            description="Tren kemampuan siswa pada setiap materi pembelajaran"
          >
            {analisis?.kemampuan_per_materi && (
              <KemampuanLineChart data={analisis.kemampuan_per_materi} />
            )}
          </ChartContainer>

          <ChartContainer title="Distribusi Nilai Siswa" description="Histogram distribusi">
            {analisis?.distribusi_nilai && (
              <DistribusiNilaiChart data={analisis.distribusi_nilai} />
            )}
          </ChartContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}
