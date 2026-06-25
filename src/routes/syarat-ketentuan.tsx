import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { FileText, ArrowLeft } from "lucide-react";
import batikBg from "@/assets/batik.webp";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/syarat-ketentuan")({
  head: () => ({
    meta: [
      { title: "Syarat & Ketentuan - Kalajawi" },
      {
        name: "description",
        content:
          "Syarat dan ketentuan penggunaan platform Kalajawi - platform pembelajaran digital budaya Jawa.",
      },
      { property: "og:title", content: "Syarat & Ketentuan - Kalajawi" },
      {
        property: "og:description",
        content: "Syarat dan ketentuan penggunaan platform Kalajawi.",
      },
      {
        property: "og:url",
        content: "https://kala-jawi.nandaaddiwijaya.my.id/syarat-ketentuan",
      },
      { property: "og:image", content: "https://kala-jawi.nandaaddiwijaya.my.id/og-image.jpg" },
    ],
  }),
  component: SyaratKetentuanPage,
});

function SyaratKetentuanPage() {
  return (
    <div
      className="min-h-screen w-full font-body"
      style={{
        background: "linear-gradient(135deg, #d9b482 0%, #b8895a 100%)",
      }}
    >
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

      <main className="relative z-10 mx-auto min-h-screen max-w-3xl px-4 py-6 pt-24 sm:px-8 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-xl border border-brand-gold/40 bg-brand-dark/95 p-6 sm:p-10 shadow-2xl shadow-brand-gold/10 backdrop-blur-md">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-brand-gold/10">
                <FileText className="size-5 text-brand-gold" />
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Syarat & Ketentuan
              </h1>
            </div>

            <div className="space-y-6 text-sm leading-relaxed text-white/80">
              <section>
                <h2 className="mb-2 font-display text-lg font-bold text-brand-gold">
                  1. Penerimaan Syarat
                </h2>
                <p>
                  Dengan mengakses dan menggunakan platform Kalajawi, Anda setuju untuk terikat oleh
                  syarat dan ketentuan yang berlaku. Jika Anda tidak setuju dengan syarat ini, mohon
                  untuk tidak menggunakan layanan kami.
                </p>
              </section>

              <section>
                <h2 className="mb-2 font-display text-lg font-bold text-brand-gold">
                  2. Penggunaan Layanan
                </h2>
                <p>
                  Platform Kalajawi menyediakan layanan pembelajaran digital interaktif bertema
                  budaya Jawa. Anda dapat menggunakan layanan ini untuk tujuan pendidikan dan
                  pembelajaran pribadi.
                </p>
              </section>

              <section>
                <h2 className="mb-2 font-display text-lg font-bold text-brand-gold">
                  3. Akun Pengguna
                </h2>
                <p>
                  Anda bertanggung jawab untuk menjaga kerahasiaan akun dan kata sandi Anda. Anda
                  bertanggung jawab atas semua aktivitas yang terjadi di bawah akun Anda.
                </p>
              </section>

              <section>
                <h2 className="mb-2 font-display text-lg font-bold text-brand-gold">
                  4. Hak Cipta
                </h2>
                <p>
                  Semua konten yang tersedia di platform Kalajawi dilindungi oleh hukum hak cipta.
                  Anda tidak diperkenankan menyalin, mendistribusikan, atau menggunakan konten tanpa
                  izin tertulis dari kami.
                </p>
              </section>

              <section>
                <h2 className="mb-2 font-display text-lg font-bold text-brand-gold">
                  5. Perubahan Ketentuan
                </h2>
                <p>
                  Kami berhak untuk mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan
                  berlaku efektif setelah dipublikasikan di halaman ini.
                </p>
              </section>
            </div>

            <div className="mt-10 border-t border-brand-gold/20 pt-6">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-brand-gold bg-brand-dark px-6 py-3 text-sm font-bold text-brand-cream transition-all duration-300 hover:bg-brand-dark/80 hover:border-brand-light-gold"
              >
                <ArrowLeft className="size-4" />
                Kembali ke Daftar
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
