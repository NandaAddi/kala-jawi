import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2, Eye, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createKelas, deleteKelas, getKelasList } from "@/lib/api/dashboard";
import { getMockUser } from "@/lib/auth";
import { toast } from "sonner";
import type { CreateKelasInput } from "@/types/dashboard";

export function KelasTable() {
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

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-brand-dark">Daftar Kelas</h2>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-brand-gold hover:bg-brand-gold/80 text-brand-dark"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Kelas
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-brand-gold/20">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Kelas</TableHead>
              <TableHead>Kode Kelas</TableHead>
              <TableHead className="text-right">Jumlah Siswa</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {kelasList && kelasList.length > 0 ? (
              kelasList.map((kelas) => (
                <TableRow key={kelas.id}>
                  <TableCell className="font-medium">{kelas.nama_kelas}</TableCell>
                  <TableCell className="font-mono text-brand-gold">{kelas.kode_kelas}</TableCell>
                  <TableCell className="text-right">{kelas.jumlah_siswa}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-brand-gold hover:text-brand-gold/80"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => setDeleteId(kelas.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-brand-dark/50 py-8">
                  Belum ada kelas. Klik "Tambah Kelas" untuk membuat kelas baru.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Kelas Baru</DialogTitle>
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
                    required
                  />
                  <Button type="button" variant="outline" onClick={generateKodeKelas}>
                    Generate
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
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
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="bg-brand-gold hover:bg-brand-gold/80 text-brand-dark"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? "Menyimpan..." : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Kelas?</AlertDialogTitle>
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
