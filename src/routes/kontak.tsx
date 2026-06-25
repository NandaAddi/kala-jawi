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
  icon: React.ReactNode;
  title: string;
  content: string[];
  links?: { label: string; href: string; icon?: React.ReactNode }[];
  delay?: number;
}

function ContactCard({ icon, title, content, links, delay = 0 }: ContactCardProps) {
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
      className="group relative overflow-hidden rounded-xl border border-brand-gold/40 bg-brand-dark/95 p-5 shadow-xl shadow-brand-gold/10 backdrop-blur-md transition-shadow hover:shadow-2xl hover:shadow-brand-gold/20"
    >
      <div className="mb-3 flex size-12 items-center justify-center rounded-lg bg-brand-gold/10 text-brand-gold transition-colors group-hover:bg-brand-gold/20">
        {icon}
      </div>

      <h3 className="mb-2 font-display text-xl font-bold text-brand-gold">{title}</h3>

      <div className="space-y-1">
        {content.map((line, idx) => (
          <p key={idx} className="text-sm text-white/80 leading-snug">
            {line}
          </p>
        ))}
      </div>

      {links && links.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-brand-gold/30 px-3 py-1.5 text-xs font-medium text-brand-gold transition-all hover:border-brand-gold hover:bg-brand-gold/10 focus-visible:outline-2 focus-visible:outline-brand-gold focus-visible:outline-offset-2"
            >
              {link.icon && <span className="size-3.5">{link.icon}</span>}
              {link.label}
            </a>
          ))}
        </div>
      )}

      <div className="absolute -top-12 -right-12 size-32 rounded-full bg-brand-gold/5 blur-2xl transition-all group-hover:bg-brand-gold/10" />
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
    <div
      className="min-h-screen w-full"
      style={{
        background: "linear-gradient(135deg, #d9b482 0%, #b8895a 100%)",
        fontFamily: "'Inter', sans-serif",
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
              Hubungi <span className="text-brand-gold">Kami</span>
            </h1>
          </motion.section>

          <motion.section variants={fadeUp} className="mx-auto max-w-2xl text-center">
            <p className="text-base leading-relaxed text-white md:text-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Kami terbuka terhadap masukan, saran, kolaborasi, maupun kerja sama pengembangan
              pembelajaran digital berbasis budaya. Jika Anda memiliki pertanyaan mengenai
              Kala-Jawi, silakan hubungi tim pengembang melalui informasi berikut.
            </p>
          </motion.section>

          <section className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 md:gap-5">
            <ContactCard
              icon={<Mail className="size-7" />}
              title="Email"
              content={[
                "Kirim pertanyaan atau saran Anda melalui email:",
                "tim@kala-jawi.nandaaddiwijaya.my.id",
                "support@kala-jawi.nandaaddiwijaya.my.id",
              ]}
              delay={0.1}
            />

            <ContactCard
              icon={<Instagram className="size-7" />}
              title="Media Sosial"
              content={["Ikuti kami di media sosial untuk update terbaru:"]}
              links={[
                {
                  label: "Instagram",
                  href: "https://instagram.com/kalajawi",
                  icon: <Instagram className="size-4" />,
                },
                {
                  label: "Twitter",
                  href: "https://twitter.com/kalajawi",
                  icon: <Twitter className="size-4" />,
                },
                {
                  label: "Facebook",
                  href: "https://facebook.com/kalajawi",
                  icon: <Facebook className="size-4" />,
                },
              ]}
              delay={0.2}
            />
          </section>
        </motion.div>
      </main>
    </div>
  );
}
