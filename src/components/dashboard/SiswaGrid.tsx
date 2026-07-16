import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Eye, Search, TrendingUp, BookOpen, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getSiswaList, getKelasList } from "@/lib/api/dashboard";
import { getMockUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { useMinLoadingDelay } from "@/hooks/useMinLoadingDelay";
import {
  KelasSelectionSkeleton,
  SiswaGridSkeleton,
} from "@/components/dashboard/skeletons/SiswaListSkeleton";
import { KelasSelectionGrid } from "./KelasSelectionGrid";

type SortField = "nama" | "progress_persen" | "nilai_rata";
type SortOrder = "asc" | "desc";
type Step = "kelas-selection" | "siswa-grid";

export function SiswaGrid() {
  const [search, setSearch] = useState("");
  const [selectedKelas, setSelectedKelas] = useState<string>("");
  const [sortField, setSortField] = useState<SortField>("nama");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [step, setStep] = useState<Step>("kelas-selection");

  const user = getMockUser();

  const { data: kelasList, isLoading: isLoadingKelas } = useQuery({
    queryKey: ["kelas", user?.id],
    queryFn: () => getKelasList(user?.id || ""),
  });

  useEffect(() => {
    if (kelasList && kelasList.length > 0) {
      if (kelasList.length === 1) {
        setSelectedKelas(kelasList[0].id);
        setStep("siswa-grid");
      }
    }
  }, [kelasList]);

  const { data: siswaList, isLoading } = useQuery({
    queryKey: ["siswa", selectedKelas],
    queryFn: () => getSiswaList(selectedKelas),
    enabled: !!selectedKelas,
  });

  const filteredAndSortedSiswa = siswaList
    ?.filter((siswa) => siswa.nama.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      const modifier = sortOrder === "asc" ? 1 : -1;

      if (typeof aVal === "string" && typeof bVal === "string") {
        return aVal.localeCompare(bVal) * modifier;
      }

      return ((aVal as number) - (bVal as number)) * modifier;
    });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-brand-gold";
    if (progress >= 50) return "text-brand-medium";
    return "text-brand-tan";
  };

  const getProgressBg = (progress: number) => {
    if (progress >= 80) return "bg-brand-gold";
    if (progress >= 50) return "bg-brand-medium";
    return "bg-brand-tan";
  };

  const handleSelectKelas = (kelasId: string) => {
    setSelectedKelas(kelasId);
    setSearch("");
    setStep("siswa-grid");
  };

  const handleBackToKelasSelection = () => {
    setStep("kelas-selection");
    setSearch("");
  };

  const selectedKelasData = kelasList?.find((k) => k.id === selectedKelas);

  const showKelasSkeleton = useMinLoadingDelay(isLoadingKelas);
  const showSiswaSkeleton = useMinLoadingDelay(!!isLoading);

  if (showKelasSkeleton) {
    return <KelasSelectionSkeleton />;
  }

  return (
    <AnimatePresence mode="wait">
      {step === "kelas-selection" ? (
        <motion.div
          key="kelas-selection"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <KelasSelectionGrid
            kelasList={kelasList || []}
            onSelectKelas={handleSelectKelas}
            isLoading={isLoadingKelas}
          />
        </motion.div>
      ) : (
        <motion.div
          key="siswa-grid"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          {kelasList && kelasList.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Button
                variant="ghost"
                onClick={handleBackToKelasSelection}
                className="text-brand-gold hover:text-brand-gold hover:bg-brand-gold/10 font-semibold mb-2"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Kembali ke Pilihan Kelas
              </Button>
            </motion.div>
          )}

          {selectedKelasData && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-lg border border-brand-gold/30 bg-brand-gold/5 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-gold/20">
                  <BookOpen className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <p className="text-xs text-brand-dark/70 font-semibold uppercase tracking-wider">
                    Kelas Terpilih
                  </p>
                  <p className="text-lg font-bold text-brand-dark font-display leading-tight">
                    {selectedKelasData.nama_kelas}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 p-6 rounded-lg border border-brand-gold/30 bg-brand-dark/5">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-dark/40 w-5 h-5" />
              <Input
                placeholder="Cari siswa berdasarkan nama..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 border-brand-gold/30 h-10 text-sm"
              />
            </div>
          </div>

          {showSiswaSkeleton ? (
            <SiswaGridSkeleton />
          ) : filteredAndSortedSiswa && filteredAndSortedSiswa.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedSiswa.map((siswa, index) => (
                  <motion.div
                    key={siswa.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      to="/dashboard/siswa/$siswaId"
                      params={{ siswaId: siswa.id }}
                      className="block group"
                    >
                      <div className="relative h-full rounded-lg border border-brand-gold/30 bg-white p-6 transition-all duration-300 hover:border-brand-gold/40 hover:shadow-lg hover:shadow-brand-gold/10 hover:-translate-y-1">
                        <div className="absolute top-4 right-4">
                          <div
                            className={cn(
                              "px-2.5 py-1 rounded-full text-xs font-semibold",
                              siswa.status === "Aktif"
                                ? "bg-brand-gold/20 text-brand-gold"
                                : "bg-brand-dark/10 text-brand-dark/50",
                            )}
                          >
                            {siswa.status}
                          </div>
                        </div>

                        <div className="flex items-start gap-4 mb-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-dark flex items-center justify-center">
                            <span className="text-brand-cream font-bold font-display text-base">
                              {getInitials(siswa.nama)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-brand-dark text-base leading-snug font-display truncate">
                              {siswa.nama}
                            </h3>
                            <p className="text-xs text-brand-dark/60 mt-1">
                              ID: {siswa.id.slice(0, 8)}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-brand-dark/70 uppercase tracking-wider font-semibold">
                                Progress
                              </span>
                              <span
                                className={cn(
                                  "text-sm font-bold",
                                  getProgressColor(siswa.progress_persen),
                                )}
                              >
                                {siswa.progress_persen}%
                              </span>
                            </div>
                            <div className="h-2 bg-brand-cream rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${siswa.progress_persen}%` }}
                                transition={{
                                  duration: 1,
                                  delay: 0.1 + index * 0.05 + 0.3,
                                }}
                                className={cn(
                                  "h-full rounded-full",
                                  getProgressBg(siswa.progress_persen),
                                )}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-brand-gold/30">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-5 h-5 text-brand-gold flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="text-xs text-brand-dark/70 font-semibold">Nilai</p>
                                <p className="text-sm font-bold text-brand-dark leading-tight">
                                  {siswa.nilai_rata}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-5 h-5 text-brand-gold flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="text-xs text-brand-dark/70 font-semibold">Modul</p>
                                <p className="text-sm font-bold text-brand-dark leading-tight">
                                  {Math.round(siswa.progress_persen / 10)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-brand-gold/30">
                          <Button
                            variant="ghost"
                            className="w-full text-brand-gold hover:text-brand-gold hover:bg-brand-gold/10 font-semibold text-sm h-9"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Lihat Detail
                          </Button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="text-sm text-brand-dark/70 text-center font-medium">
                Menampilkan {filteredAndSortedSiswa.length} dari {siswaList?.length} siswa
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-brand-dark/10 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-brand-dark/30" />
              </div>
              <p className="text-center text-brand-dark/70 font-medium text-sm">
                {search
                  ? "Tidak ada siswa yang sesuai dengan pencarian."
                  : "Belum ada siswa di kelas ini."}
              </p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
