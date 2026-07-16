import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { getSiswaDetail } from "@/lib/api/dashboard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProgressMateriGrid } from "@/components/dashboard/ProgressMateriGrid";
import { SiswaActivityTimeline } from "@/components/dashboard/SiswaActivityTimeline";
import { Clock, Award, Zap } from "lucide-react";

export const Route = createFileRoute("/dashboard/siswa/$siswaId")({
  component: SiswaDetailPage,
});

function SiswaDetailPage() {
  const { siswaId } = Route.useParams();
  const { data: siswa, isLoading } = useQuery({
    queryKey: ["siswa-detail", siswaId],
    queryFn: () => getSiswaDetail(siswaId),
  });

  if (isLoading) {
    return <DashboardLayout title="Loading...">Loading...</DashboardLayout>;
  }

  if (!siswa) {
    return (
      <DashboardLayout title="Detail Siswa">
        <div className="text-center text-brand-dark/50 py-8">Data siswa tidak ditemukan</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={siswa.nama} subtitle={`Kelas ${siswa.kelas_nama} • ID: ${siswa.id}`}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "Progress Keseluruhan",
              value: `${siswa.progress_persen}%`,
              icon: null,
              delay: 0,
            },
            {
              label: "Waktu Bermain",
              value: Math.round(siswa.waktu_bermain_total / 60),
              unit: "menit",
              icon: Clock,
              delay: 0.05,
            },
            { label: "Nilai Rata-rata", value: siswa.nilai_rata, icon: Award, delay: 0.1 },
            { label: "Status", value: siswa.status, icon: Zap, delay: 0.15 },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: stat.delay, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="border-brand-gold/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-brand-dark/60 flex items-center gap-2">
                    {stat.icon && <stat.icon className="w-4 h-4" />}
                    {stat.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {index === 0 ? (
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-brand-gold font-display">
                        {stat.value}
                      </p>
                      <Progress value={siswa.progress_persen} className="h-2" />
                    </div>
                  ) : index === 3 ? (
                    <Badge
                      variant={siswa.status === "Aktif" ? "default" : "secondary"}
                      className={
                        siswa.status === "Aktif"
                          ? "bg-brand-gold/20 text-brand-gold"
                          : "bg-brand-dark/10 text-brand-dark/50"
                      }
                    >
                      {stat.value}
                    </Badge>
                  ) : (
                    <>
                      <p className="text-2xl font-bold text-brand-gold font-display">
                        {stat.value}
                      </p>
                      {stat.unit && <p className="text-xs text-brand-dark/50">{stat.unit}</p>}
                      {index === 2 && <Progress value={siswa.nilai_rata} className="h-2 mt-2" />}
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {siswa.rekomendasi_terbaru && (
          <Card className="border-brand-gold/30 bg-brand-light-gold/10">
            <CardHeader>
              <CardTitle className="text-brand-dark">Rekomendasi Terbaru</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-brand-dark/70">
                <span className="font-semibold">Chapter Disarankan:</span>{" "}
                {siswa.rekomendasi_terbaru.chapter_nama}
              </p>
              <p className="text-sm text-brand-dark/70">{siswa.rekomendasi_terbaru.alasan}</p>
              <p className="text-xs text-brand-dark/50">
                Dari: {siswa.rekomendasi_terbaru.guru_nama} •{" "}
                {new Date(siswa.rekomendasi_terbaru.tanggal).toLocaleDateString("id-ID")}
              </p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Progress Materi</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressMateriGrid data={siswa.progres_materi} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Riwayat Aktivitas</CardTitle>
          </CardHeader>
          <CardContent>
            <SiswaActivityTimeline data={siswa.riwayat_aktivitas} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
