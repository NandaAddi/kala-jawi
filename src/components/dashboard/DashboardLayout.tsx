import { ReactNode, useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { Menu, X } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-brand-cream">
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 md:ml-64 flex flex-col overflow-hidden">
        {(title || subtitle) && (
          <div className="border-b border-brand-gold/20 bg-white px-4 md:px-8 py-4 md:py-6 flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-brand-gold/10 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-brand-dark" />
            </button>
            <div className="flex-1">
              {title && (
                <h1 className="text-2xl md:text-3xl font-bold text-brand-dark font-display">
                  {title}
                </h1>
              )}
              {subtitle && <p className="text-sm text-brand-dark/60 mt-1">{subtitle}</p>}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-auto p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
