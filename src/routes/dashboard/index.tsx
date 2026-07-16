import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { getDashboardStats, getProgressTrend, getRecentActivities } from "@/lib/api/dashboard";
import { getMockUser } from "@/lib/auth";
import { BookOpen, Users, TrendingUp, Activity } from "lucide-react";
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
      ) : isLoadingStats ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-max">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 rounded-lg border border-brand-gold/20 bg-brand-cream/50 animate-pulse"
              />
            ))}
          </div>
          <div className="h-96 rounded-lg border border-brand-gold/20 bg-brand-cream/50 animate-pulse" />
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-max">
            <StatCard
              title="Total Siswa"
              value={stats?.total_siswa || 0}
              icon={<Users className="w-6 h-6" />}
              variant="primary"
              description="Siswa aktif di platform"
            />
            <div className="space-y-6">
              <StatCard
                title="Total Kelas"
                value={stats?.total_kelas || 0}
                icon={<BookOpen className="w-6 h-6" />}
                variant="secondary"
              />
              <StatCard
                title="Rata-rata Progress"
                value={`${stats?.rata_progress.toFixed(1) || 0}%`}
                icon={<TrendingUp className="w-6 h-6" />}
                variant="secondary"
              />
            </div>
            <div className="flex items-end">
              <StatCard
                title="Aktivitas Hari Ini"
                value={stats?.aktivitas_hari_ini || 0}
                icon={<Activity className="w-6 h-6" />}
                variant="counter"
              />
            </div>
          </div>

          <ChartContainer
            title="Tren Progress Belajar"
            description="7 hari terakhir"
            mini_stats={[
              { label: "Rata-rata", value: `${stats?.rata_progress.toFixed(1) || 0}%` },
              { label: "Tertinggi", value: "92%" },
            ]}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#c9953c" opacity={0.2} />
                <XAxis
                  dataKey="tanggal"
                  stroke="#e8c878"
                  tick={{ fill: "#e8c878" }}
                  tickFormatter={(val) => format(new Date(val), "dd/MM")}
                />
                <YAxis stroke="#e8c878" tick={{ fill: "#e8c878" }} />
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
                  stroke="#c9953c"
                  strokeWidth={3}
                  dot={{ fill: "#c9953c", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          <div className="rounded-lg border border-brand-gold/30 bg-white/80 backdrop-blur-sm p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-brand-dark mb-6 font-display">
              Aktivitas Terbaru
            </h2>
            <ActivityTimeline activities={activities || []} />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
