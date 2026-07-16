import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Users, Route as RouteIcon, BarChart3, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/game-info/")({
  head: () => ({
    meta: [
      { title: "Info Game - Kalajawi | Fitur Pembelajaran Budaya Jawa" },
      {
        name: "description",
        content:
          "Info game Kalajawi - Kelola kelas pengelana, susun jalur pembelajaran budaya, dan analisis perjalanan siswa dalam satu platform terintegrasi.",
      },
      { property: "og:title", content: "Info Game - Kalajawi | Fitur Pembelajaran Budaya Jawa" },
      {
        property: "og:description",
        content:
          "Kelola kelas, susun jalur pembelajaran, dan analisis perkembangan siswa dalam pembelajaran budaya Jawa.",
      },
      { property: "og:url", content: "https://kala-jawi.nandaaddiwijaya.my.id/game-info" },
      { property: "og:image", content: "https://kala-jawi.nandaaddiwijaya.my.id/og-image.jpg" },
    ],
  }),
  component: GameInfoPage,
});

const features = [
  {
    id: "kelas-pengelana",
    icon: Users,
    title: "Kelas Pengelana",
    description:
      "Kelola dan pantau seluruh kelas yang berada dalam bimbingan Anda. Fitur ini membantu Penjaga Waktu memonitor jumlah siswa, progres pembelajaran, serta perkembangan perjalanan budaya setiap kelas.",
    href: "/game-info/kelas-pengelana",
  },
  {
    id: "penyusunan-jalur",
    icon: RouteIcon,
    title: "Penyusunan Jalur",
    description:
      "Pilih dan aktifkan modul budaya sesuai kebutuhan pembelajaran. Guru dapat menyesuaikan materi yang akan diakses siswa tanpa perlu membuat konten dari awal.",
    href: "/game-info/penyusunan-jalur",
  },
  {
    id: "analisis-perjalanan",
    icon: BarChart3,
    title: "Analisis Perjalanan",
    description:
      "Lihat perkembangan kompetensi siswa secara visual melalui data hasil pembelajaran dan penyelesaian misi budaya.",
    href: "/game-info/analisis-perjalanan",
  },
];

function GameInfoPage() {
  return (
    <div className="px-4 sm:px-8 lg:px-16 pt-28 sm:pt-32 pb-20 sm:pb-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
            Info Game
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Kelola pembelajaran budaya Jawa dengan fitur lengkap untuk memantau, menyusun, dan
            menganalisis perjalanan siswa
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Card className="group h-full border-brand-gold/40 bg-brand-dark/95 backdrop-blur-md shadow-xl shadow-brand-gold/10 transition-all duration-300 hover:border-brand-light-gold hover:shadow-2xl hover:shadow-brand-gold/20 hover:scale-[1.02]">
                  <CardHeader>
                    <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-brand-gold/10 transition-all duration-300 group-hover:bg-brand-gold/20">
                      <Icon className="size-7 text-brand-gold transition-all duration-300 group-hover:text-brand-light-gold" />
                    </div>
                    <CardTitle className="font-display text-2xl text-white">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <CardDescription className="text-white/70 leading-relaxed text-sm">
                      {feature.description}
                    </CardDescription>
                    <Link
                      to={feature.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-gold transition-all duration-300 hover:text-brand-light-gold group-hover:gap-3"
                    >
                      Selengkapnya
                      <ArrowRight className="size-4" />
                    </Link>
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
