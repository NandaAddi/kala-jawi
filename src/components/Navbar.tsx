import { Link } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Info Game", href: "#game-info" },
  { label: "Tentang", href: "#tentang" },
  { label: "Kontak", href: "/kontak" },
];

function SlideRevealLogo() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link to="/" aria-label="Kembali ke beranda Kalajawi">
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative overflow-hidden rounded-lg px-2 py-1 text-2xl font-bold tracking-tight text-brand-cream font-display focus-visible:outline-2 focus-visible:outline-brand-gold focus-visible:outline-offset-2"
      >
        <motion.span
          className="absolute inset-0 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: "linear-gradient(to right, #c9953c, #e8c878)",
          }}
        />
        <span className="relative z-10">
          Kala<span className="text-brand-gold">jawi</span>
        </span>
      </motion.div>
    </Link>
  );
}

function SlideRevealMobileItem({
  label,
  href,
  index,
  onClose,
}: {
  label: string;
  href: string;
  index: number;
  onClose: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isExternal = href.startsWith("#");

  const content = (
    <>
      <motion.span
        className="absolute inset-0 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: "linear-gradient(to right, #c9953c, #e8c878)",
        }}
      />
      <span className="relative z-10">{label}</span>
    </>
  );

  if (isExternal) {
    return (
      <motion.a
        href={href}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClose}
        className="relative overflow-hidden rounded-lg px-4 py-3 text-sm font-medium text-brand-cream/80"
      >
        {content}
      </motion.a>
    );
  }

  return (
    <Link to={href} onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative overflow-hidden rounded-lg px-4 py-3 text-sm font-medium text-white/90"
      >
        {content}
      </motion.div>
    </Link>
  );
}

function MagneticNavItem({ label, href }: { label: string; href: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 18 });
  const springY = useSpring(y, { stiffness: 120, damping: 18 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const isExternal = href.startsWith("#");

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative overflow-hidden rounded-lg px-4 py-3 text-sm font-medium text-white/90 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-brand-gold focus-visible:outline-offset-2"
    >
      <motion.span
        className="absolute inset-0 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: "linear-gradient(to right, #c9953c, #e8c878)",
        }}
      />
      <span className="relative z-10">{label}</span>
    </motion.div>
  );

  if (isExternal) {
    return <a href={href}>{content}</a>;
  }

  return <Link to={href}>{content}</Link>;
}

function NavCTAButton({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link to={href}>
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative overflow-hidden rounded-lg border-2 border-brand-gold px-6 py-2 text-sm font-bold text-brand-gold hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-brand-gold focus-visible:outline-offset-2"
      >
        <motion.span
          className="absolute inset-0 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: "linear-gradient(to right, #c9953c, #e8c878)",
          }}
        />
        <span className="relative z-10">{label}</span>
      </motion.div>
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHovered, setNavHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      aria-label="Navigasi utama"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4"
      style={{
        paddingTop: scrolled ? "0.75rem" : "1.25rem",
        transition: "padding-top 0.5s ease",
      }}
    >
      <motion.div
        onMouseEnter={() => setNavHovered(true)}
        onMouseLeave={() => setNavHovered(false)}
        initial={{ maxWidth: "48rem" }}
        animate={{ maxWidth: navHovered ? "56rem" : "48rem" }}
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
        className={`relative w-full rounded-lg border border-brand-gold/40 px-5 py-2 ${
          scrolled
            ? "bg-brand-dark/95 shadow-xl shadow-black/10 shadow-brand-gold/10 backdrop-blur-md"
            : "bg-brand-dark"
        }`}
      >
        <div className="flex items-center justify-between">
          <SlideRevealLogo />

          <div className="hidden items-center md:flex">
            <div className="flex items-center gap-2">
              {navItems.map((item) => (
                <MagneticNavItem key={item.label} label={item.label} href={item.href} />
              ))}
            </div>

            <div className="h-6 w-px bg-brand-gold/30 mx-4" />

            <NavCTAButton label="Masuk" href="/login" />
          </div>

          <button
            className="flex size-11 items-center justify-center rounded-lg text-brand-cream transition-colors hover:text-brand-gold md:hidden focus-visible:outline-2 focus-visible:outline-brand-gold focus-visible:outline-offset-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full mt-2 mx-4 overflow-hidden rounded-lg border border-brand-gold/40 bg-brand-dark/95 backdrop-blur-md shadow-xl shadow-brand-gold/10 md:hidden"
          >
            <div className="flex flex-col gap-2 p-4">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <div className="w-full rounded-lg bg-brand-gold px-4 py-3 text-center font-bold text-brand-dark hover:bg-brand-light-gold transition-colors mb-2">
                  Masuk
                </div>
              </Link>

              {navItems.map((item, i) => (
                <SlideRevealMobileItem
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  index={i}
                  onClose={() => setMenuOpen(false)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
