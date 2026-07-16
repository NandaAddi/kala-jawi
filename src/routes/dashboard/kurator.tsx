import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import {
  getSiswaList,
  getRekomendasiSistem,
  saveRekomendasi,
  getChapterList,
} from "@/lib/api/dashboard";
import { getMockUser } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Lightbulb, Sparkles, Save } from "lucide-react";
import { toast } from "sonner";
import type { Siswa } from "@/types/dashboard";

export const Route = createFileRoute("/dashboard/kurator")({
  component: KuratorPage,
});

function KuratorPage() {
  const [selectedSiswaId, setSelectedSiswaId] = useState<string>("");
  const [manualChapterId, setManualChapterId] = useState<string>("");
  const user = getMockUser();
  const queryClient = useQueryClient();

  const { data: siswaList } = useQuery({
    queryKey: ["siswa"],
    queryFn: () => getSiswaList(),
  });

  const { data: chapters } = useQuery({
    queryKey: ["chapters"],
    queryFn: () => getChapterList(),
  });

  const { data: rekomendasi, isLoading: isLoadingRekomendasi } = useQuery({
    queryKey: ["rekomendasi-sistem", selectedSiswaId],
    queryFn: () => getRekomendasiSistem(selectedSiswaId),
    enabled: !!selectedSiswaId,
  });

  const saveMutation = useMutation({
    mutationFn: saveRekomendasi,
    onSuccess: () => {
      toast.success("Rekomendasi berhasil disimpan!");
      queryClient.invalidateQueries({ queryKey: ["siswa-detail", selectedSiswaId] });
      setManualChapterId("");
    },
    onError: () => {
      toast.error("Gagal menyimpan rekomendasi");
    },
  });

  const selectedSiswa = siswaList?.find((s) => s.id === selectedSiswaId);

  const handleSaveRekomendasi = () => {
    if (!selectedSiswaId || !user) return;

    const chapterId = manualChapterId || rekomendasi?.chapter_disarankan;
    const chapter = chapters?.find((c) => c.id === chapterId);

    if (!chapter) {
      toast.error("Chapter tidak ditemukan");
      return;
    }

    const alasan = manualChapterId
      ? `Guru ${user.nama} merekomendasikan secara manual untuk melanjutkan ke ${chapter.nama_chapter}.`
      : rekomendasi?.alasan || "";

    saveMutation.mutate({
      siswa_id: selectedSiswaId,
      chapter_disarankan: chapterId!,
      chapter_nama: chapter.nama_chapter,
      alasan,
      guru_id: user.id,
      guru_nama: user.nama,
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DashboardLayout
      title="Kurator Pembelajaran"
      subtitle="Tentukan chapter/materi selanjutnya untuk siswa berdasarkan rekomendasi sistem atau pilihan manual."
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="border-brand-gold/30">
            <CardHeader>
              <CardTitle className="font-display">Pilih Siswa</CardTitle>
              <CardDescription>Pilih siswa untuk melihat rekomendasi pembelajaran</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedSiswaId} onValueChange={setSelectedSiswaId}>
                <SelectTrigger className="border-brand-gold/30">
                  <SelectValue placeholder="Pilih siswa..." />
                </SelectTrigger>
                <SelectContent>
                  {siswaList?.map((siswa) => (
                    <SelectItem key={siswa.id} value={siswa.id}>
                      {siswa.nama} - Progress: {siswa.progress_persen}%
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </motion.div>

        {selectedSiswa && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="border-brand-gold/30">
              <CardHeader>
                <CardTitle className="font-display">Siswa Terpilih</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-brand-gold text-brand-dark font-bold">
                      {getInitials(selectedSiswa.nama)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-brand-dark">{selectedSiswa.nama}</p>
                    <div className="flex gap-4 mt-1 text-sm text-brand-dark/60">
                      <span>Progress: {selectedSiswa.progress_persen}%</span>
                      <span>Nilai Rata-rata: {selectedSiswa.nilai_rata}</span>
                      <Badge
                        variant={selectedSiswa.status === "Aktif" ? "default" : "secondary"}
                        className={
                          selectedSiswa.status === "Aktif"
                            ? "bg-brand-gold/20 text-brand-gold"
                            : "bg-brand-dark/10 text-brand-dark/50"
                        }
                      >
                        {selectedSiswa.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {selectedSiswaId && isLoadingRekomendasi && (
          <div className="text-center py-8 text-brand-dark/50">Menganalisis data siswa...</div>
        )}

        {selectedSiswaId && !isLoadingRekomendasi && rekomendasi && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="border-brand-gold/30 bg-brand-light-gold/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-brand-dark">
                  <Sparkles className="w-5 h-5 text-brand-gold" />
                  Rekomendasi Sistem
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-brand-dark/60 mb-1">Chapter Disarankan</p>
                  <p className="text-xl font-bold text-brand-gold">{rekomendasi.chapter_nama}</p>
                </div>
                <div>
                  <p className="text-sm text-brand-dark/60 mb-1">Alasan</p>
                  <p className="text-brand-dark/80 leading-relaxed">{rekomendasi.alasan}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {selectedSiswaId && !isLoadingRekomendasi && !rekomendasi && (
          <Card>
            <CardContent className="py-8 text-center text-brand-dark/50">
              <Lightbulb className="w-12 h-12 mx-auto mb-3 text-brand-gold/50" />
              <p>Tidak ada rekomendasi tersedia untuk siswa ini.</p>
            </CardContent>
          </Card>
        )}

        {selectedSiswaId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="border-brand-gold/30">
              <CardHeader>
                <CardTitle className="font-display">Pilihan Manual (Opsional)</CardTitle>
                <CardDescription>
                  Override rekomendasi sistem dengan memilih chapter secara manual
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={manualChapterId} onValueChange={setManualChapterId}>
                  <SelectTrigger className="border-brand-gold/30">
                    <SelectValue placeholder="Pilih chapter manual..." />
                  </SelectTrigger>
                  <SelectContent>
                    {chapters?.map((chapter) => (
                      <SelectItem key={chapter.id} value={chapter.id}>
                        {chapter.nama_chapter}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  onClick={handleSaveRekomendasi}
                  disabled={saveMutation.isPending || (!rekomendasi && !manualChapterId)}
                  className="w-full bg-brand-gold hover:bg-brand-gold/80 text-brand-dark font-semibold"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saveMutation.isPending ? "Menyimpan..." : "Simpan Rekomendasi"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
