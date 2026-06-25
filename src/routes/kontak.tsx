import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Mail, Instagram, Twitter, Facebook } from "lucide-react";
import batikBg from "@/assets/batik.webp";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/kontak")({
  head: () => ({
    meta: [
      { title: "Kontak Kami - Kalajawi | Hubungi Tim" },
      {
        name: "description",
        content:
          "Hubungi tim Kalajawi untuk masukan, saran, kolaborasi, atau pertanyaan seputar platform pembelajaran budaya Jawa digital.",
      },
      { property: "og:title", content: "Kontak Kami - Kalajawi | Hubungi Tim" },
      {
        property: "og:description",
        content:
          "Hubungi tim Kalajawi untuk masukan, saran, kolaborasi, atau pertanyaan seputar platform budaya Jawa.",
      },
      { property: "og:url", content: "https://kala-jawi.nandaaddiwijaya.my.id/kontak" },
      { property: "og:image", content: "https://kala-jawi.nandaaddiwijaya.my.id/og-image.jpg" },
    ],
  }),
  component: KontakPage,
});

interface ContactCardProps {
  title: string;
  items: {
    icon: React.ReactNode;
    label: string;
    href: string;
  }[];
  delay?: number;
}

function ContactCard({ title, items, delay = 0 }: ContactCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 p-5 shadow-xl backdrop-blur-md transition-shadow hover:shadow-2xl hover:bg-white/15"
    >
      <h3 className="mb-3 font-display text-lg font-bold text-white">{title}</h3>

      <div className="space-y-2">
        {items.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white transition-all hover:border-white/30 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            <span className="shrink-0 text-white/70">{item.icon}</span>
            <span className="truncate">{item.label}</span>
          </a>
        ))}
      </div>

      <div className="absolute -top-12 -right-12 size-32 rounded-full bg-white/5 blur-2xl transition-all group-hover:bg-white/10" />
    </motion.div>
  );
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

function KontakPage() {
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

      <main className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-6 pt-20 sm:px-8 sm:py-8 sm:pt-24 md:px-12 lg:px-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-4 sm:space-y-6"
        >
          <motion.section variants={fadeUp} className="text-center">
            <h1
              className="font-display text-3xl text-white sm:text-4xl md:text-6xl drop-shadow-lg"
              style={{ lineHeight: 1.1 }}
            >
              Hubungi Kami
            </h1>
          </motion.section>

          <motion.section variants={fadeUp} className="mx-auto max-w-2xl text-center">
            <p className="text-base leading-relaxed text-white md:text-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Kami terbuka terhadap masukan, saran, kolaborasi, maupun kerja sama pengembangan
              pembelajaran digital berbasis budaya. Jika Anda memiliki pertanyaan mengenai
              Kala-Jawi, silakan hubungi tim pengembang melalui informasi berikut.
            </p>
          </motion.section>

          <section className="mx-auto max-w-xl">
            <ContactCard
              title="Hubungi Kami"
              items={[
                {
                  icon: <Mail className="size-4" />,
                  label: "tim@kala-jawi.nandaaddiwijaya.my.id",
                  href: "mailto:tim@kala-jawi.nandaaddiwijaya.my.id",
                },
                {
                  icon: <Mail className="size-4" />,
                  label: "support@kala-jawi.nandaaddiwijaya.my.id",
                  href: "mailto:support@kala-jawi.nandaaddiwijaya.my.id",
                },
                {
                  icon: <Instagram className="size-4" />,
                  label: "Instagram",
                  href: "https://instagram.com/kalajawi",
                },
                {
                  icon: <Twitter className="size-4" />,
                  label: "Twitter",
                  href: "https://twitter.com/kalajawi",
                },
                {
                  icon: <Facebook className="size-4" />,
                  label: "Facebook",
                  href: "https://facebook.com/kalajawi",
                },
              ]}
              delay={0.1}
            />
          </section>
        </motion.div>
      </main>
    </div>
  );
}
