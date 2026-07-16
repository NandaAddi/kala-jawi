import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Route as RouteIcon, ArrowLeft, BookOpen, Zap, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/game-info/penyusunan-jalur")({
  head: () => ({
    meta: [
      { title: "Penyusunan Jalur - Kalajawi | Kustomisasi Pembelajaran" },
      {
        name: "description",
        content:
          "Fitur Penyusunan Jalur memungkinkan guru memilih dan mengaktifkan modul budaya sesuai kebutuhan pembelajaran tanpa perlu membuat konten dari awal.",
      },
      { property: "og:title", content: "Penyusunan Jalur - Kalajawi | Kustomisasi Pembelajaran" },
      {
        property: "og:description",
        content: "Pilih dan aktifkan modul budaya untuk menyesuaikan materi pembelajaran siswa.",
      },
      {
        property: "og:url",
        content: "https://kala-jawi.nandaaddiwijaya.my.id/game-info/penyusunan-jalur",
      },
      { property: "og:image", content: "https://kala-jawi.nandaaddiwijaya.my.id/og-image.jpg" },
    ],
  }),
  component: PenyusunanJalurPage,
});

const features = [
  {
    icon: BookOpen,
    title: "Pilih Modul Budaya",
    description:
      "Pilih modul budaya yang sesuai dengan kurikulum dan kebutuhan pembelajaran siswa Anda.",
  },
  {
    icon: Zap,
    title: "Aktifkan/Nonaktifkan Fleksibel",
    description:
      "Aktifkan atau nonaktifkan modul secara dinamis sesuai perkembangan pembelajaran kelas.",
  },
  {
    icon: Layers,
    title: "Atur Urutan Pembelajaran",
    description:
      "Susun urutan pembelajaran dan sesuaikan materi tanpa perlu membuat konten dari awal.",
  },
];

function PenyusunanJalurPage() {
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
            <RouteIcon className="size-10 text-brand-gold" />
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-brand-dark mb-4">
            Penyusunan Jalur
          </h1>
          <p className="text-lg sm:text-xl text-brand-dark/80 mb-6 leading-relaxed">
            Pilih dan aktifkan modul budaya sesuai kebutuhan pembelajaran. Guru dapat menyesuaikan
            materi yang akan diakses siswa tanpa perlu membuat konten dari awal.
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
