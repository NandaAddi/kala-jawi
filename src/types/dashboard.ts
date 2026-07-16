export interface Guru {
  id: string;
  nama: string;
  email: string;
  sekolah: string;
  foto_profil?: string;
  created_at: string;
}

export interface Kelas {
  id: string;
  nama_kelas: string;
  kode_kelas: string;
  guru_id: string;
  jumlah_siswa: number;
  created_at: string;
}

export interface Siswa {
  id: string;
  nama: string;
  kelas_id: string;
  status: "Aktif" | "Tidak Aktif";
  progress_persen: number;
  nilai_rata: number;
  waktu_bermain_total: number;
  created_at: string;
}

export interface Chapter {
  id: string;
  nama_chapter: string;
  urutan: number;
  indikator_ketuntasan: number;
  created_at: string;
}

export interface ProgressMateri {
  id: string;
  siswa_id: string;
  chapter_id: string;
  chapter_nama: string;
  status: "Belum Mulai" | "Sedang Berjalan" | "Selesai";
  nilai?: number;
  waktu_bermain: number;
  updated_at: string;
}

export interface Aktivitas {
  id: string;
  siswa_id: string;
  siswa_nama: string;
  tanggal: string;
  chapter_id: string;
  chapter_nama: string;
  jenis_aktivitas: string;
  nilai?: number;
}

export interface Rekomendasi {
  id: string;
  siswa_id: string;
  chapter_disarankan: string;
  chapter_nama: string;
  alasan: string;
  guru_id: string;
  guru_nama: string;
  tanggal: string;
}

export interface DashboardStats {
  total_kelas: number;
  total_siswa: number;
  rata_progress: number;
  aktivitas_hari_ini: number;
}

export interface ProgressTrend {
  tanggal: string;
  progress: number;
}

export interface DashboardAnalisisData {
  kemampuan_per_materi: Record<string, number>;
  distribusi_nilai: Array<{ range: string; jumlah: number }>;
  insight: string;
}

export interface SiswaDetail extends Siswa {
  kelas_nama: string;
  progres_materi: ProgressMateri[];
  riwayat_aktivitas: Aktivitas[];
  rekomendasi_terbaru?: Rekomendasi;
}

export type CreateKelasInput = Omit<Kelas, "id" | "created_at" | "jumlah_siswa">;
export type UpdateProfilInput = Partial<Pick<Guru, "nama" | "sekolah" | "foto_profil">>;
export type ChangePasswordInput = {
  password_lama: string;
  password_baru: string;
  konfirmasi_password: string;
};

export type RiwayatFilters = {
  kelas_id?: string;
  siswa_id?: string;
  tanggal_mulai?: string;
  tanggal_akhir?: string;
  limit?: number;
  offset?: number;
};
