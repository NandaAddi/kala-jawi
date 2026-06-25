import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Info, ArrowLeft } from "lucide-react";
import batikBg from "@/assets/batik.webp";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/tentang")({
  head: () => ({
    meta: [
      { title: "Tentang Kami - Kalajawi | Coming Soon" },
      {
        name: "description",
        content:
          "Tentang Kalajawi - platform pembelajaran digital interaktif budaya Jawa. Halaman ini sedang dalam pengembangan.",
      },
      { property: "og:title", content: "Tentang Kami - Kalajawi | Coming Soon" },
      {
        property: "og:description",
        content: "Kenali lebih dekat tentang Kalajawi - platform budaya Jawa digital.",
      },
      { property: "og:url", content: "https://kala-jawi.nandaaddiwijaya.my.id/tentang" },
      { property: "og:image", content: "https://kala-jawi.nandaaddiwijaya.my.id/og-image.jpg" },
    ],
  }),
  component: TentangPage,
});

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

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md text-center"
        >
          <div className="rounded-xl border border-brand-gold/40 bg-brand-dark/95 p-8 sm:p-12 shadow-2xl shadow-brand-gold/10 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
              className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-brand-gold/10"
            >
              <Info className="size-8 text-brand-gold" />
            </motion.div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Tentang Kami</h1>

            <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5">
              <span className="size-2 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-xs font-medium uppercase tracking-wider text-brand-gold">
                Coming Soon
              </span>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-white/70">
              Halaman ini sedang dalam pengembangan. Nantikan kehadirannya.
            </p>

            <div className="mt-8">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-brand-gold bg-brand-dark px-6 py-3 text-sm font-bold text-brand-cream transition-all duration-300 hover:bg-brand-dark/80 hover:border-brand-light-gold"
              >
                <ArrowLeft className="size-4" />
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
