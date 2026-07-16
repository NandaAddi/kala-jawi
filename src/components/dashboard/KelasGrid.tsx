import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2, Users, Plus, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { createKelas, deleteKelas, getKelasList } from "@/lib/api/dashboard";
import { getMockUser } from "@/lib/auth";
import { KelasSkeleton } from "@/components/dashboard/skeletons/KelasSkeleton";
import { useMinLoadingDelay } from "@/hooks/useMinLoadingDelay";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { CreateKelasInput } from "@/types/dashboard";

export function KelasGrid() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ nama_kelas: "", kode_kelas: "" });

  const user = getMockUser();
  const queryClient = useQueryClient();

  const { data: kelasList, isLoading } = useQuery({
    queryKey: ["kelas", user?.id],
    queryFn: () => getKelasList(user?.id || ""),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateKelasInput) => createKelas(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
      toast.success("Kelas berhasil ditambahkan!");
      setIsDialogOpen(false);
      setFormData({ nama_kelas: "", kode_kelas: "" });
    },
    onError: () => {
      toast.error("Gagal menambahkan kelas");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteKelas(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
      toast.success("Kelas berhasil dihapus!");
      setDeleteId(null);
    },
    onError: () => {
      toast.error("Gagal menghapus kelas");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({
      ...formData,
      guru_id: user?.id || "",
    });
  };

  const generateKodeKelas = () => {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    setFormData((prev) => ({ ...prev, kode_kelas: `KJ${random}` }));
  };

  const showSkeleton = useMinLoadingDelay(isLoading);

  if (showSkeleton) {
    return <KelasSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-brand-dark/70 font-medium">
          {kelasList?.length || 0} kelas aktif
        </p>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-brand-gold hover:bg-brand-gold/80 text-brand-dark font-semibold h-10"
        >
          <Plus className="w-5 h-5 mr-2" />
          Tambah Kelas
        </Button>
      </div>

      {kelasList && kelasList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kelasList.map((kelas, index) => (
            <motion.div
              key={kelas.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative rounded-xl border border-brand-gold/30 bg-white p-6 transition-all duration-300 hover:border-brand-gold/40 hover:shadow-lg hover:shadow-brand-gold/10 hover:-translate-y-1"
            >
              <button
                onClick={() => setDeleteId(kelas.id)}
                className="absolute top-4 right-4 p-2 rounded-lg text-brand-dark/40 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-brand-gold focus-visible:outline-offset-2"
                aria-label="Hapus kelas"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="mb-4">
                <h3 className="font-bold text-brand-dark text-lg leading-snug font-display truncate pr-8">
                  {kelas.nama_kelas}
                </h3>
                <div className="flex items-center gap-2 text-sm mt-2">
                  <Code className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <code className="font-mono text-brand-gold font-semibold text-sm">
                    {kelas.kode_kelas}
                  </code>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-gold/30">
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
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 rounded-xl border border-brand-gold/30 bg-brand-dark/5">
          <div className="w-16 h-16 rounded-full bg-brand-dark/10 flex items-center justify-center mb-4">
            <Plus className="w-8 h-8 text-brand-dark/30" />
          </div>
          <p className="text-center text-brand-dark/70 font-medium text-sm">
            Belum ada kelas. Klik "Tambah Kelas" untuk membuat kelas baru.
          </p>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="border-brand-gold/30">
          <DialogHeader>
            <DialogTitle className="font-display text-brand-dark">Tambah Kelas Baru</DialogTitle>
            <DialogDescription>Buat kelas baru untuk siswa Anda.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nama_kelas">Nama Kelas</Label>
                <Input
                  id="nama_kelas"
                  placeholder="contoh: 7A"
                  value={formData.nama_kelas}
                  onChange={(e) => setFormData((prev) => ({ ...prev, nama_kelas: e.target.value }))}
                  className="border-brand-gold/30"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kode_kelas">Kode Kelas</Label>
                <div className="flex gap-2">
                  <Input
                    id="kode_kelas"
                    placeholder="contoh: KJ7A2024"
                    value={formData.kode_kelas}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, kode_kelas: e.target.value }))
                    }
                    className="border-brand-gold/30"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateKodeKelas}
                    className="border-brand-gold/30"
                  >
                    Generate
                  </Button>
                </div>
                <p className="text-xs text-brand-dark/50">
                  Siswa akan menggunakan kode ini untuk bergabung ke kelas
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={createMutation.isPending}
                className="border-brand-gold/30"
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="bg-brand-gold hover:bg-brand-gold/80 text-brand-dark font-semibold"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? "Menyimpan..." : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="border-brand-gold/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-brand-dark">
              Hapus Kelas?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Kelas dan semua data terkait akan dihapus secara
              permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              disabled={deleteMutation.isPending}
              className="bg-red-500 hover:bg-red-600"
            >
              {deleteMutation.isPending ? "Menghapus..." : "Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
