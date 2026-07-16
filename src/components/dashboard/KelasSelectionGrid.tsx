import { motion } from "motion/react";
import { BookOpen, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface Kelas {
  id: string;
  nama_kelas: string;
  kode_kelas: string;
  jumlah_siswa: number;
}

interface KelasSelectionGridProps {
  kelasList: Kelas[];
  onSelectKelas: (kelasId: string) => void;
  isLoading?: boolean;
}

export function KelasSelectionGrid({
  kelasList,
  onSelectKelas,
  isLoading = false,
}: KelasSelectionGridProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-brand-dark/50 font-medium">Memuat kelas...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-brand-dark font-display leading-tight">
          Pilih Kelas
        </h2>
        <p className="text-sm text-brand-dark/70 mt-2">
          Pilih salah satu kelas untuk melihat daftar siswa
        </p>
      </div>

      {kelasList && kelasList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kelasList.map((kelas, index) => (
            <motion.button
              key={kelas.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => onSelectKelas(kelas.id)}
              whileHover={{ y: -4 }}
              className="group relative rounded-lg border border-brand-gold/30 bg-white p-8 transition-all duration-300 hover:border-brand-gold/40 hover:shadow-lg hover:shadow-brand-gold/10 text-left focus-visible:outline-2 focus-visible:outline-brand-gold focus-visible:outline-offset-2"
              type="button"
            >
              <div className="mb-6">
                <div className="inline-flex p-3 rounded-lg bg-brand-gold/10 mb-4">
                  <BookOpen className="w-6 h-6 text-brand-gold" />
                </div>
                <h3 className="font-bold text-brand-dark text-xl leading-snug font-display">
                  {kelas.nama_kelas}
                </h3>
                <p className="text-xs text-brand-dark/70 mt-2 font-mono">{kelas.kode_kelas}</p>
              </div>

              <div className="pt-6 border-t border-brand-gold/30">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-brand-gold flex-shrink-0" />
                  <div>
                    <p className="text-xs text-brand-dark/70 font-semibold">Total Siswa</p>
                    <p className="text-lg font-bold text-brand-dark font-display leading-tight">
                      {kelas.jumlah_siswa}
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-xs font-semibold text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full">
                  Klik untuk lihat
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 rounded-lg border border-brand-gold/30 bg-brand-dark/5">
          <div className="w-16 h-16 rounded-full bg-brand-dark/10 flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-brand-dark/30" />
          </div>
          <p className="text-center text-brand-dark/70 font-medium text-sm">
            Belum ada kelas. Buat kelas terlebih dahulu di menu Kelas.
          </p>
        </div>
      )}
    </div>
  );
}
