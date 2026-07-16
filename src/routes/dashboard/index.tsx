import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { DashboardHomeSkeleton } from "@/components/dashboard/skeletons/DashboardHomeSkeleton";
import { useMinLoadingDelay } from "@/hooks/useMinLoadingDelay";
import { getDashboardStats, getProgressTrend, getRecentActivities } from "@/lib/api/dashboard";
import { getMockUser } from "@/lib/auth";
import { BookOpen, Users, TrendingUp, Activity, Sun, Moon, Sunrise } from "lucide-react";
import characterHi from "@/assets/character-hi.gif";
import iconTotalSiswa from "@/assets/icon/total-siswa.webp";
import iconTotalKelas from "@/assets/icon/total-kelas.webp";
import iconRataProgress from "@/assets/icon/rata-progress.webp";
import iconAktivitasHariIni from "@/assets/icon/aktivitas-hari-ini.webp";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  const user = getMockUser();

  const {
    data: stats,
    isLoading: isLoadingStats,
    error: errorStats,
  } = useQuery({
    queryKey: ["dashboard-stats", user?.id],
    queryFn: () => getDashboardStats(user?.id || ""),
    refetchInterval: 120000,
  });

  const {
    data: trendData,
    isLoading: isLoadingTrend,
    error: errorTrend,
  } = useQuery({
    queryKey: ["progress-trend", "week"],
    queryFn: () => getProgressTrend("week"),
  });

  const {
    data: activities,
    isLoading: isLoadingActivities,
    error: errorActivities,
  } = useQuery({
    queryKey: ["recent-activities"],
    queryFn: () => getRecentActivities(10),
    refetchInterval: 120000,
  });

  const isLoadingData = isLoadingStats || isLoadingTrend || isLoadingActivities;
  const showSkeleton = useMinLoadingDelay(isLoadingData);

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Selamat datang kembali! Berikut ringkasan aktivitas pembelajaran."
    >
      {errorStats || errorTrend || errorActivities ? (
        <div className="rounded-lg border-2 border-red-300 bg-red-50 p-6">
          <h2 className="text-lg font-bold text-red-900 mb-2">Terjadi Kesalahan</h2>
          <p className="text-red-800 mb-4">
            Gagal memuat data dashboard. Silakan coba lagi atau hubungi support.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
          >
            Muat Ulang Halaman
          </button>
        </div>
      ) : showSkeleton ? (
        <DashboardHomeSkeleton />
      ) : (
        <div className="space-y-8">
          {/* Greeting Card */}
          {(() => {
            const hour = new Date().getHours();
            const getGreeting = () => {
              if (hour >= 5 && hour < 12)
                return { text: "Selamat Pagi", icon: <Sunrise className="w-6 h-6" /> };
              if (hour >= 12 && hour < 17)
                return { text: "Selamat Siang", icon: <Sun className="w-6 h-6" /> };
              if (hour >= 17 && hour < 21)
                return { text: "Selamat Sore", icon: <Sun className="w-6 h-6" /> };
              return { text: "Selamat Malam", icon: <Moon className="w-6 h-6" /> };
            };
            const greeting = getGreeting();

            return (
              <div className="relative overflow-hidden rounded-xl bg-white border border-brand-gold/30 p-6 md:p-8 pb-0 shadow-sm shadow-black/5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-brand-gold">{greeting.icon}</span>
                      <span className="text-sm font-medium text-brand-gold">
                        {greeting.text}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold font-display text-brand-dark leading-tight">
                      {user?.nama || "Guru"}
                    </h2>
                    <p className="mt-2 text-brand-dark/60 text-sm md:text-base max-w-md">
                      Siap untuk membimbing siswa hari ini? Lihat progress dan aktivitas terbaru di bawah.
                    </p>
                  </div>
                  <div className="flex-shrink-0 hidden md:block absolute -bottom-8 right-4">
                    <img
                      src={characterHi}
                      alt="Karakter menyapa"
                      className="h-44 w-auto object-contain object-bottom drop-shadow-lg"
                    />
                  </div>
                </div>
              </div>
            );
          })()}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Siswa"
              value={`${stats?.total_siswa || 0} Siswa`}
              description="Siswa aktif di platform"
              status="active"
              characterImage={iconTotalSiswa}
            />
            <StatCard
              title="Total Kelas"
              value={`${stats?.total_kelas || 0} Kelas`}
              description="Kelas yang diampu"
              status="finished"
              characterImage={iconTotalKelas}
            />
            <StatCard
              title="Rata-rata Progress"
              value={`${stats?.rata_progress.toFixed(1) || 0}%`}
              description="Progress rata-rata siswa"
              status="active"
              characterImage={iconRataProgress}
            />
            <StatCard
              title="Aktivitas Hari Ini"
              value={`${stats?.aktivitas_hari_ini || 0} Aktivitas`}
              description="Aktivitas pembelajaran"
              status="paused"
              characterImage={iconAktivitasHariIni}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <div className="lg:col-span-2">
              <ChartContainer
                title="Tren Progress Belajar"
                description="7 hari terakhir"
                mini_stats={[
                  {
                    label: "Rata-rata",
                    value: `${stats?.rata_progress.toFixed(1) || 0}%`,
                  },
                  { label: "Tertinggi", value: "92%" },
                ]}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData || []}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-brand-tan"
                      opacity={0.2}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="tanggal"
                      className="stroke-brand-cream"
                      tick={{ fill: "oklch(0.97 0.02 85)", fontSize: 14 }}
                      tickFormatter={(val) => format(new Date(val), "dd/MM")}
                    />
                    <YAxis
                      className="stroke-brand-cream"
                      tick={{ fill: "oklch(0.97 0.02 85)", fontSize: 14 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#4a2c1a",
                        border: "1px solid #c9953c",
                        borderRadius: "8px",
                        color: "#fdf4e3",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="progress"
                      className="stroke-brand-gold"
                      strokeWidth={3}
                      dot={{ fill: "rgb(201, 149, 60)", r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="rounded-lg border border-brand-gold/30 bg-white/80 backdrop-blur-sm shadow-sm shadow-black/5 h-[600px] flex flex-col">
              <div className="p-6 border-b border-brand-gold/30 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
                <h2 className="text-xl font-bold text-brand-dark font-display leading-tight">
                  Aktivitas Terbaru
                </h2>
              </div>
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                <ActivityTimeline activities={activities || []} compact />
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
