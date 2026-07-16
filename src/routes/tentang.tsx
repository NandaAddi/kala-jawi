import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Users, BookOpen, BarChart3, Zap, HelpCircle, ArrowLeft } from "lucide-react";
import batikBg from "@/assets/batik.webp";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/tentang")({
  head: () => ({
    meta: [
      { title: "Tentang Kami - Kalajawi" },
      {
        name: "description",
        content:
          "Tentang Kalajawi - platform pembelajaran digital berbasis game edukasi yang mengintegrasikan budaya Jawa dengan Problem Based Learning.",
      },
      { property: "og:title", content: "Tentang Kami - Kalajawi" },
      {
        property: "og:description",
        content:
          "Pelajari lebih lanjut tentang Kalajawi dan fitur-fitur pembelajaran budaya Jawa digital yang inovatif.",
      },
      { property: "og:url", content: "https://kala-jawi.nandaaddiwijaya.my.id/tentang" },
      { property: "og:image", content: "https://kala-jawi.nandaaddiwijaya.my.id/og-image.jpg" },
    ],
  }),
  component: TentangPage,
});

interface Feature {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: <Users className="size-6" />,
    title: "Kelas Pengelana",
    description: "Mengelola dan memantau aktivitas belajar siswa.",
  },
  {
    id: 2,
    icon: <BookOpen className="size-6" />,
    title: "Kurasi Modul Pembelajaran",
    description: "Mengatur modul dan misi budaya yang akan dipelajari siswa.",
  },
  {
    id: 3,
    icon: <BarChart3 className="size-6" />,
    title: "Analisis Pembelajaran",
    description: "Menyajikan data perkembangan kompetensi siswa secara visual.",
  },
  {
    id: 4,
    icon: <Zap className="size-6" />,
    title: "Pemulihan Timeline",
    description:
      "Menampilkan progres perjalanan belajar siswa dalam memulihkan fragmen pengetahuan budaya.",
  },
  {
    id: 5,
    icon: <HelpCircle className="size-6" />,
    title: "Sasmita",
    description:
      "Fitur bantuan dan arahan yang dapat digunakan guru untuk mendampingi siswa selama proses pembelajaran.",
  },
];

function TentangPage() {
  return (
    <div className="min-h-screen w-full font-body bg-gradient-to-br from-brand-tan to-brand-medium">
      <div
        className="pointer-events-none fixed inset-0 z-0 animate-batik-drift opacity-30"
        style={{
          backgroundImage: `url(${batikBg})`,
          backgroundSize: "700px",
          backgroundRepeat: "repeat",
          transform: "rotate(4deg) scale(1.2)",
        }}
      />

      <div className="pointer-events-none fixed inset-0 z-[1]">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/40 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      </div>

      <Navbar />

      <main className="relative z-10 pt-32 pb-24 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-32"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              <div className="lg:col-span-5">
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-dark leading-[0.95] mb-6">
                  Tentang Kala-Jawi
                </h1>
              </div>
              <div className="lg:col-span-7 lg:pt-3">
                <p className="text-lg sm:text-xl text-brand-dark/80 leading-relaxed max-w-[55ch]">
                  Platform pembelajaran digital berbasis game edukasi yang mengintegrasikan budaya
                  Jawa dengan pendekatan Problem Based Learning.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-24 mb-28 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16"
          >
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-3xl font-bold text-brand-dark mb-4">
                  Untuk Siswa: Pengelana Waktu
                </h2>
                <p className="text-brand-dark/70 leading-relaxed">
                  Melalui peran sebagai Pengelana Waktu, siswa diajak menyelesaikan berbagai misteri
                  budaya, mempelajari sejarah, aksara Jawa, unggah-ungguh, dan gamelan dalam sebuah
                  petualangan yang interaktif.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="font-display text-3xl font-bold text-brand-dark mb-4">
                  Untuk Guru: Penjaga Waktu
                </h2>
                <p className="text-brand-dark/70 leading-relaxed">
                  Bertugas memantau perkembangan siswa melalui dashboard pembelajaran, mengelola
                  kelas, mengkurasi modul pembelajaran, serta menganalisis capaian kompetensi budaya
                  siswa.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-32 p-8 md:p-12 rounded-2xl bg-brand-dark/90 border border-brand-gold/30 backdrop-blur-sm shadow-lg shadow-brand-gold/10"
          >
            <h3 className="font-display text-2xl font-bold text-brand-cream mb-4">Tujuan Utama</h3>
            <p className="text-lg text-brand-cream/90 leading-relaxed max-w-3xl">
              Menghadirkan pengalaman belajar budaya yang lebih menarik, kontekstual, dan bermakna
              melalui pemanfaatan teknologi digital.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-20"
          >
            <h2 className="font-display text-4xl font-bold text-brand-dark mb-12">Fitur Utama</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-max">
              {features.map((feature, index) => {
                let colSpan = "md:col-span-1";
                if (index === 0) colSpan = "md:col-span-2";
                if (index === 4) colSpan = "md:col-span-1";

                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.45 + index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`${colSpan} group rounded-lg border border-brand-gold/30 bg-brand-dark/85 p-6 shadow-md shadow-brand-gold/5 backdrop-blur-sm transition-all duration-300 hover:border-brand-gold/50 hover:shadow-lg hover:shadow-brand-gold/15 hover:bg-brand-dark/95`}
                  >
                    <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-brand-gold/10">
                      <div className="text-brand-gold">{feature.icon}</div>
                    </div>
                    <h3 className="font-display text-lg font-bold text-brand-cream mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-brand-cream/80 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
