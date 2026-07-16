import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  BarChart3,
  Lightbulb,
  History,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { LogoutDialog } from "./LogoutDialog";
import logoImage from "@/assets/kala-jawi-sidebar.webp";

interface DashboardSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const menuItems = [
  {
    section: "Dashboard",
    items: [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" }],
  },
  {
    section: "Pembelajaran",
    items: [
      { id: "kelas", label: "Kelas", icon: BookOpen, href: "/dashboard/kelas" },
      { id: "siswa", label: "Siswa", icon: Users, href: "/dashboard/siswa" },
      { id: "kurator", label: "Kurator", icon: Lightbulb, href: "/dashboard/kurator" },
    ],
  },
  {
    section: "Analitik",
    items: [
      { id: "analisis", label: "Analisis", icon: BarChart3, href: "/dashboard/analisis" },
      { id: "riwayat", label: "Riwayat", icon: History, href: "/dashboard/riwayat" },
    ],
  },
  {
    section: "Akun",
    items: [{ id: "profil", label: "Profil", icon: User, href: "/dashboard/profil" }],
  },
];

export function DashboardSidebar({ isOpen = false, onClose }: DashboardSidebarProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return currentPath === "/dashboard" || currentPath === "/dashboard/";
    }
    return currentPath === href || currentPath.startsWith(href + "/");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 border-r border-brand-gold/20 bg-brand-dark text-brand-cream p-6 flex flex-col transition-transform duration-300 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-8 flex items-center justify-between">
          <Link to="/dashboard">
            <img src={logoImage} alt="Kala Jawi Logo" className="h-20 w-auto" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="md:hidden rounded-lg p-1.5 text-brand-cream/70 hover:bg-brand-dark/60 hover:text-brand-cream transition-colors"
            aria-label="Tutup menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto">
          {menuItems.map((section) => (
            <div key={section.section}>
              <p className="text-xs uppercase tracking-widest font-semibold text-brand-gold/60 px-4 mb-3">
                {section.section}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.id}
                      to={item.href}
                      className={cn(
                        "relative flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group focus-visible:outline-2 focus-visible:outline-brand-gold focus-visible:outline-offset-2",
                        active
                          ? "text-brand-gold bg-brand-gold/10"
                          : "text-brand-cream/70 hover:text-brand-cream hover:bg-brand-dark/60",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {active && (
                        <motion.div
                          layoutId="sidebar-highlight"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-brand-light-gold rounded-r"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-medium leading-snug">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-brand-gold/30 pt-4 mt-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <LogoutDialog />
          </motion.div>
        </div>
      </aside>
    </>
  );
}
