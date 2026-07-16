import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Users, ArrowLeft, Users2, TrendingUp, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/game-info/kelas-pengelana")({
  head: () => ({
    meta: [
      { title: "Kelas Pengelana - Kalajawi | Kelola Kelas Pembelajaran" },
      {
        name: "description",
        content:
          "Fitur Kelas Pengelana membantu guru mengelola dan memantau seluruh kelas, progres pembelajaran, dan perkembangan perjalanan budaya siswa.",
      },
      { property: "og:title", content: "Kelas Pengelana - Kalajawi | Kelola Kelas Pembelajaran" },
      {
        property: "og:description",
        content: "Monitor kelas, progres siswa, dan perkembangan perjalanan budaya dengan mudah.",
      },
      {
        property: "og:url",
        content: "https://kala-jawi.nandaaddiwijaya.my.id/game-info/kelas-pengelana",
      },
      { property: "og:image", content: "https://kala-jawi.nandaaddiwijaya.my.id/og-image.jpg" },
    ],
  }),
  component: KelasPengelanaPage,
});

const features = [
  {
    icon: Users2,
    title: "Monitor Jumlah Siswa",
    description: "Kelola seluruh kelas dalam bimbingan dan pantau jumlah siswa di setiap kelas.",
  },
  {
    icon: TrendingUp,
    title: "Progres Pembelajaran",
    description:
      "Pantau progres pembelajaran siswa secara real-time dan identifikasi area yang perlu perhatian.",
  },
  {
    icon: MapPin,
    title: "Perkembangan Perjalanan Budaya",
    description:
      "Lihat perkembangan perjalanan budaya setiap siswa dalam pembelajaran budaya Jawa.",
  },
];

function KelasPengelanaPage() {
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
            <Users className="size-10 text-brand-gold" />
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-brand-dark mb-4">
            Kelas Pengelana
          </h1>
          <p className="text-lg sm:text-xl text-brand-dark/80 mb-6 leading-relaxed">
            Kelola dan pantau seluruh kelas yang berada dalam bimbingan Anda. Fitur ini membantu
            Penjaga Waktu memonitor jumlah siswa, progres pembelajaran, serta perkembangan
            perjalanan budaya setiap kelas.
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
            Kurasi Modul Pembelajaran memungkinkan guru menentukan misi dan materi budaya yang akan
            dipelajari siswa. Setiap modul telah dirancang berdasarkan kompetensi tertentu seperti
            Sejarah Budaya, Aksara Jawa, Unggah-Ungguh, dan Gamelan. Dengan fitur ini, guru dapat
            menyusun jalur pembelajaran yang relevan dengan tujuan pembelajaran dan kebutuhan
            peserta didik.
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
