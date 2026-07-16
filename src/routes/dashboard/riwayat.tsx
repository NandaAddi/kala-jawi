import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { RiwayatSkeleton } from "@/components/dashboard/skeletons/RiwayatSkeleton";
import { useMinLoadingDelay } from "@/hooks/useMinLoadingDelay";
import { getRiwayatAktivitas, getKelasList } from "@/lib/api/dashboard";
import { getMockUser } from "@/lib/auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import type { RiwayatFilters } from "@/types/dashboard";

export const Route = createFileRoute("/dashboard/riwayat")({
  component: RiwayatPage,
});

function RiwayatPage() {
  const [filters, setFilters] = useState<RiwayatFilters>({
    limit: 50,
    offset: 0,
  });
  const [kelasFilter, setKelasFilter] = useState<string>("all");

  const user = getMockUser();

  const { data: kelasList } = useQuery({
    queryKey: ["kelas", user?.id],
    queryFn: () => getKelasList(user?.id || ""),
  });

  const { data: riwayat, isLoading } = useQuery({
    queryKey: ["riwayat", filters, kelasFilter],
    queryFn: () =>
      getRiwayatAktivitas({
        ...filters,
        kelas_id: kelasFilter === "all" ? undefined : kelasFilter,
      }),
  });

  const showSkeleton = useMinLoadingDelay(isLoading);

  const handleDateFilterChange = (field: "tanggal_mulai" | "tanggal_akhir", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value || undefined,
    }));
  };

  if (showSkeleton) {
    return (
      <DashboardLayout title="Riwayat Aktivitas" subtitle="Memuat log aktivitas...">
        <RiwayatSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Riwayat Aktivitas" subtitle="Log seluruh aktivitas pembelajaran siswa.">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-lg border border-brand-gold/30 bg-brand-dark/5 p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-brand-dark/70 mb-2 block">Kelas</label>
              <Select value={kelasFilter} onValueChange={setKelasFilter}>
                <SelectTrigger className="border-brand-gold/30">
                  <SelectValue />
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

            <div>
              <label className="text-sm font-medium text-brand-dark/70 mb-2 block">
                Tanggal Mulai
              </label>
              <Input
                type="date"
                onChange={(e) => handleDateFilterChange("tanggal_mulai", e.target.value)}
                className="border-brand-gold/30"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-brand-dark/70 mb-2 block">
                Tanggal Akhir
              </label>
              <Input
                type="date"
                onChange={(e) => handleDateFilterChange("tanggal_akhir", e.target.value)}
                className="border-brand-gold/30"
              />
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setFilters({ limit: 50, offset: 0 });
                  setKelasFilter("all");
                }}
                className="w-full"
              >
                Reset Filter
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-lg border border-brand-gold/30 bg-white/80 backdrop-blur-sm p-8 shadow-sm"
        >
          <h2 className="text-2xl font-bold text-brand-dark mb-6 font-display">Log Aktivitas</h2>
          {riwayat && riwayat.length > 0 ? (
            <ActivityTimeline
              activities={riwayat.map((activity) => ({
                id: activity.id,
                siswa_nama: activity.siswa_nama,
                jenis_aktivitas: activity.jenis_aktivitas,
                chapter_nama: activity.chapter_nama,
                nilai: activity.nilai,
                tanggal: activity.tanggal,
              }))}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-center text-brand-dark/50">Belum ada riwayat aktivitas</p>
            </div>
          )}
        </motion.div>

        {riwayat && riwayat.length > 0 && (
          <div className="flex justify-between items-center">
            <p className="text-sm text-brand-dark/60">Menampilkan {riwayat.length} aktivitas</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={!filters.offset || filters.offset === 0}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    offset: Math.max(0, (prev.offset || 0) - (prev.limit || 50)),
                  }))
                }
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={riwayat.length < (filters.limit || 50)}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    offset: (prev.offset || 0) + (prev.limit || 50),
                  }))
                }
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
