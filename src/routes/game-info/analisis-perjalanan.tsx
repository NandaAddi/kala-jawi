import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { BarChart3, ArrowLeft, LineChart, PieChart, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/game-info/analisis-perjalanan")({
  head: () => ({
    meta: [
      { title: "Analisis Perjalanan - Kalajawi | Monitor Perkembangan Siswa" },
      {
        name: "description",
        content:
          "Fitur Analisis Perjalanan menampilkan data perkembangan kompetensi siswa secara visual melalui pembelajaran dan penyelesaian misi budaya Jawa.",
      },
      {
        property: "og:title",
        content: "Analisis Perjalanan - Kalajawi | Monitor Perkembangan Siswa",
      },
      {
        property: "og:description",
        content: "Lihat perkembangan kompetensi siswa secara visual dan data hasil pembelajaran.",
      },
      {
        property: "og:url",
        content: "https://kala-jawi.nandaaddiwijaya.my.id/game-info/analisis-perjalanan",
      },
      { property: "og:image", content: "https://kala-jawi.nandaaddiwijaya.my.id/og-image.jpg" },
    ],
  }),
  component: AnalisisPerjalananPage,
});

const features = [
  {
    icon: LineChart,
    title: "Visualisasi Data Pembelajaran",
    description:
      "Lihat grafik perkembangan siswa berdasarkan hasil pembelajaran dan penyelesaian misi budaya.",
  },
  {
    icon: PieChart,
    title: "Tingkat Penguasaan Kompetensi",
    description:
      "Analisis tingkat penguasaan siswa pada kompetensi seperti Sejarah Budaya, Aksara Jawa, Unggah-Ungguh, dan Gamelan.",
  },
  {
    icon: Activity,
    title: "Report Progres Komprehensif",
    description:
      "Dapatkan laporan progres per siswa dan per kelas untuk menentukan strategi pembelajaran lanjutan.",
  },
];

function AnalisisPerjalananPage() {
  return (
    <div className="px-4 pt-32 pb-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <Link
            to="/game-info"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-gold transition-all duration-300 hover:text-brand-light-gold hover:gap-3 mb-8"
          >
            <ArrowLeft className="size-4" />
            Kembali ke Info Game
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mb-12"
        >
          <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-brand-gold/10">
            <BarChart3 className="size-10 text-brand-gold" />
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-brand-dark mb-4">
            Analisis Perjalanan
          </h1>
          <p className="text-lg sm:text-xl text-brand-dark/80 mb-6 leading-relaxed">
            Lihat perkembangan kompetensi siswa secara visual melalui data hasil pembelajaran dan
            penyelesaian misi budaya.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mb-12 rounded-xl border border-brand-gold/40 bg-brand-dark/95 p-8 backdrop-blur-md shadow-xl shadow-brand-gold/10"
        >
          <h2 className="font-display text-3xl font-bold text-white mb-6">Penjelasan Lengkap</h2>
          <p className="text-white/80 leading-relaxed mb-6">
            Analisis Pembelajaran menyajikan data perkembangan siswa berdasarkan aktivitas yang
            dilakukan dalam Kala-Jawi. Sistem mengolah hasil penyelesaian misi dan menampilkan
            tingkat penguasaan kompetensi seperti Sejarah Budaya, Aksara Jawa, Unggah-Ungguh, dan
            Gamelan. Informasi ini membantu guru mengidentifikasi kekuatan, kelemahan, serta
            menentukan strategi pembelajaran lanjutan yang lebih tepat.
          </p>
          <p className="text-white/70 text-sm">Keterangan Singkat</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Card className="h-full border-brand-gold/40 bg-brand-dark/95 backdrop-blur-md shadow-lg shadow-brand-gold/10 transition-all duration-300 hover:border-brand-light-gold hover:shadow-xl hover:shadow-brand-gold/15">
                  <CardHeader>
                    <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-brand-gold/10">
                      <Icon className="size-6 text-brand-gold" />
                    </div>
                    <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
