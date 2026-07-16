import { Link } from "@tanstack/react-router";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import logoImage from "@/assets/kala-jawi-navbar.webp";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Info Game", href: "/game-info" },
  { label: "Tentang", href: "/tentang" },
  { label: "Kontak", href: "/kontak" },
];

function SlideRevealLogo() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link to="/" aria-label="Kembali ke beranda Kalajawi">
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="focus-visible:outline-2 focus-visible:outline-brand-gold focus-visible:outline-offset-2"
      >
        <img src={logoImage} alt="Kala Jawi Logo" className="h-10 w-auto" />
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
      animate={{ scale: hovered ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
      <motion.span
        className="relative z-10"
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {label}
      </motion.span>
    </motion.div>
  );

  if (isExternal) {
    return <a href={href}>{content}</a>;
  }

  return <Link to={href}>{content}</Link>;
}

function NavCTAButton({
  label,
  href,
  variant = "outline",
}: {
  label: string;
  href: string;
  variant?: "outline" | "filled";
}) {
  const [hovered, setHovered] = useState(false);
  const isFilled = variant === "filled";

  return (
    <Link to={href}>
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileTap={{ scale: 0.96 }}
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`relative overflow-hidden rounded-lg border-2 px-6 py-2 text-sm font-bold focus-visible:outline-2 focus-visible:outline-brand-gold focus-visible:outline-offset-2 ${
          isFilled
            ? "border-brand-gold bg-brand-gold text-brand-dark hover:text-brand-dark"
            : "border-brand-gold text-brand-gold hover:text-brand-dark"
        }`}
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
        <motion.span
          className="relative z-10"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {label}
        </motion.span>
      </motion.div>
    </Link>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [open, handleKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-label="Menu navigasi"
          initial={{ clipPath: "inset(0 50% 0 50%)" }}
          animate={{ clipPath: "inset(0 0% 0 0%)" }}
          exit={{ clipPath: "inset(0 50% 0 50%)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/98 backdrop-blur-md md:hidden"
        >
          {/* Close button */}
          <motion.button
            onClick={onClose}
            aria-label="Tutup menu"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-lg text-brand-cream transition-colors hover:text-brand-gold focus-visible:outline-2 focus-visible:outline-brand-gold focus-visible:outline-offset-2"
          >
            <X size={24} />
          </motion.button>

          {/* Content */}
          <div className="flex flex-col items-center gap-8 px-6">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to="/" onClick={onClose} aria-label="Kembali ke beranda">
                <span className="text-4xl font-bold tracking-tight text-brand-cream font-display">
                  Kala<span className="text-brand-gold">jawi</span>
                </span>
              </Link>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-full max-w-xs flex-col gap-3"
            >
              <Link to="/login" onClick={onClose}>
                <div className="w-full rounded-lg border-2 border-brand-gold px-6 py-3 text-center font-bold text-brand-gold transition-colors hover:bg-brand-gold/10">
                  Masuk
                </div>
              </Link>
              <Link to="/register" onClick={onClose}>
                <div className="w-full rounded-lg bg-brand-gold px-6 py-3 text-center font-bold text-brand-dark transition-colors hover:bg-brand-light-gold">
                  Daftar
                </div>
              </Link>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-px w-32 bg-brand-gold/20"
            />

            {/* Nav Items */}
            <nav className="flex flex-col items-center gap-2">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.5 + i * 0.08,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className="block rounded-lg px-6 py-3 text-lg font-semibold text-white/90 transition-colors hover:text-brand-gold"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="mt-4 text-xs tracking-widest text-white"
            >
              Team Kala Jawi LIDM 2026
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
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
    <>
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
              <div className="ml-2">
                <NavCTAButton label="Daftar" href="/register" variant="filled" />
              </div>
            </div>

            <button
              className="flex size-11 items-center justify-center rounded-lg text-brand-cream transition-colors hover:text-brand-gold md:hidden focus-visible:outline-2 focus-visible:outline-brand-gold focus-visible:outline-offset-2"
              onClick={() => setMenuOpen(true)}
              aria-label="Buka menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </motion.div>
      </motion.nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
