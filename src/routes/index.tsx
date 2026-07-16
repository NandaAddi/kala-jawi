import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import temple from "@/assets/temple.webp";
import batikBg from "@/assets/batik.webp";
import logoImage from "@/assets/kala-jawi-logo.webp";
import { Navbar } from "@/components/Navbar";
import { SlideRevealButton } from "@/components/SlideRevealButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kalajawi - Platform Pembelajaran Budaya Jawa Digital" },
      {
        name: "description",
        content:
          "Kalajawi adalah platform pembelajaran digital interaktif yang menjelajahi kekayaan budaya Jawa. Temukan cerita, seni, tradisi, dan warisan leluhur dalam pengalaman belajar yang menyenangkan.",
      },
      { property: "og:title", content: "Kalajawi - Platform Pembelajaran Budaya Jawa Digital" },
      {
        property: "og:description",
        content: "Platform pembelajaran digital interaktif untuk menjelajahi kekayaan budaya Jawa.",
      },
      { property: "og:url", content: "https://kala-jawi.nandaaddiwijaya.my.id/" },
      { property: "og:image", content: "https://kala-jawi.nandaaddiwijaya.my.id/og-image.jpg" },
    ],
  }),
  component: Index,
});

const heroContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.25, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

function Index() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const templeY = useTransform(scrollY, [0, 500], [0, -40]);
  const templeOpacity = useTransform(scrollY, [0, 300], [1, 0.85]);

  return (
    <div className="min-h-screen w-full font-body bg-gradient-to-br from-brand-tan to-brand-medium">
      {/* ─── BATIK BACKGROUND ─── */}
      <div
        className="pointer-events-none fixed inset-0 z-0 animate-batik-drift opacity-30"
        style={{
          backgroundImage: `url(${batikBg})`,
          backgroundSize: "700px",
          backgroundRepeat: "repeat",
          transform: "rotate(4deg) scale(1.2)",
        }}
      />

      {/* ─── DARK GRADIENT OVERLAYS ─── */}
      <div className="pointer-events-none fixed inset-0 z-[1]">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/40 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      </div>

      <Navbar />

      {/* ─── HERO ─── */}
      <div
        ref={heroRef}
        className="relative z-10 grid grid-cols-1 items-center gap-8 px-4 sm:px-8 md:px-20 py-12 pt-28 md:grid-cols-5"
      >
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="space-y-10 md:col-span-2"
        >
          <motion.div variants={fadeUp} className="w-full max-w-sm">
            <img
              src={logoImage}
              alt="Kala Jawi Logo"
              width={400}
              height={400}
              className="h-auto w-full drop-shadow-lg"
            />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-lg leading-relaxed text-white md:text-xl max-w-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
          >
            Keberhasilan bukanlah milik orang yang pintar. Keberhasilan adalah kepunyaan mereka yang
            senantiasa berusaha.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col gap-4 pt-4 sm:flex-row sm:gap-8">
            <SlideRevealButton
              label="Masuk"
              variant="primary"
              gradientFrom="#c9953c"
              gradientTo="#e8c878"
              href="/login"
            />
            <SlideRevealButton
              label="Daftar"
              variant="secondary"
              gradientFrom="#c9953c"
              gradientTo="#e8c878"
              href="/register"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="flex justify-end md:col-span-3"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          style={{ y: templeY, opacity: templeOpacity }}
        >
          <img
            src={temple}
            alt="Candi Borobudur dengan latar belakang langit senja"
            width={1024}
            height={1024}
            className="h-auto w-full max-w-3xl drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </div>
  );
}
