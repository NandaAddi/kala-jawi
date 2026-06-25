import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import temple from "@/assets/temple.webp";
import batikBg from "@/assets/batik.webp";
import { Navbar } from "@/components/Navbar";

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
      { property: "og:image", content: "https://kala-jawi.nandaaddiwijaya.my.id/og-image.webp" },
    ],
  }),
  component: Index,
});

function SlideRevealButton({
  label,
  gradientFrom,
  gradientTo,
  variant = "primary",
  href,
}: {
  label: string;
  gradientFrom: string;
  gradientTo: string;
  variant?: "primary" | "secondary";
  href: string;
}) {
  const [hovered, setHovered] = useState(false);

  const isPrimary = variant === "primary";

  return (
    <Link to={href}>
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className={`group relative cursor-pointer overflow-hidden rounded-lg border-2 border-brand-gold px-8 py-3 text-base font-bold uppercase tracking-[0.12em] shadow-[0_4px_20px_rgba(0,0,0,0.4)] sm:px-14 sm:py-4 sm:text-xl ${
          isPrimary
            ? "bg-brand-gold text-brand-dark"
            : "bg-brand-dark/70 backdrop-blur-sm text-white"
        }`}
      >
        {!isPrimary && (
          <motion.span
            className="absolute inset-0 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
            }}
          />
        )}
        <span className="relative z-10">{label}</span>
        <span className="absolute -top-[3px] -left-[3px] size-5 border-t-2 border-l-2 border-brand-gold transition-all duration-300 group-hover:size-7 group-hover:border-brand-light-gold" />
        <span className="absolute -bottom-[3px] -right-[3px] size-5 border-b-2 border-r-2 border-brand-gold transition-all duration-300 group-hover:size-7 group-hover:border-brand-light-gold" />
      </motion.div>
    </Link>
  );
}

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
    <div
      className="min-h-screen w-full"
      style={{
        background: "linear-gradient(135deg, #d9b482 0%, #b8895a 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
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
          <motion.h1
            variants={fadeUp}
            className="text-5xl text-white sm:text-6xl md:text-8xl lg:text-9xl font-display drop-shadow-lg"
            style={{ lineHeight: 1 }}
          >
            Kala<span className="text-brand-gold">jawi</span>
          </motion.h1>

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
            alt="Candi Jawa"
            width={1024}
            height={1024}
            className="h-auto w-full max-w-3xl drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </div>
  );
}
