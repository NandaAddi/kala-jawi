import { supabase } from "../supabase";
import type {
  Kelas,
  Siswa,
  SiswaDetail,
  Aktivitas,
  ProgressMateri,
  Rekomendasi,
  DashboardStats,
  ProgressTrend,
  DashboardAnalisisData,
  Chapter,
  CreateKelasInput,
  RiwayatFilters,
} from "@/types/dashboard";

// Mock data untuk development
const mockChapters: Chapter[] = [
  { id: "ch1", nama_chapter: "Museum", urutan: 1, indikator_ketuntasan: 75, created_at: "" },
  { id: "ch2", nama_chapter: "Chapter 1", urutan: 2, indikator_ketuntasan: 75, created_at: "" },
  { id: "ch3", nama_chapter: "Chapter 2", urutan: 3, indikator_ketuntasan: 75, created_at: "" },
  { id: "ch4", nama_chapter: "Chapter 3", urutan: 4, indikator_ketuntasan: 75, created_at: "" },
];

const USE_MOCK = !process.env.VITE_SUPABASE_URL;

// ============= KELAS FUNCTIONS (FR-2) =============

export async function getKelasList(guruId: string): Promise<Kelas[]> {
  if (USE_MOCK) {
    return [
      {
        id: "k1",
        nama_kelas: "7A",
        kode_kelas: "KJ7A2024",
        guru_id: guruId,
        jumlah_siswa: 28,
        created_at: new Date().toISOString(),
      },
      {
        id: "k2",
        nama_kelas: "7B",
        kode_kelas: "KJ7B2024",
        guru_id: guruId,
        jumlah_siswa: 32,
        created_at: new Date().toISOString(),
      },
    ];
  }

  const { data, error } = await supabase
    .from("kelas")
    .select("*")
    .eq("guru_id", guruId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createKelas(input: CreateKelasInput): Promise<Kelas> {
  if (USE_MOCK) {
    return {
      id: `k${Date.now()}`,
      ...input,
      jumlah_siswa: 0,
      created_at: new Date().toISOString(),
    };
  }

  const { data, error } = await supabase.from("kelas").insert([input]).select().single();

  if (error) throw error;
  return data;
}

export async function deleteKelas(kelasId: string): Promise<void> {
  if (USE_MOCK) return;

  const { error } = await supabase.from("kelas").delete().eq("id", kelasId);

  if (error) throw error;
}

export async function getKelasDetail(kelasId: string): Promise<Kelas | null> {
  if (USE_MOCK) {
    return {
      id: "k1",
      nama_kelas: "7A",
      kode_kelas: "KJ7A2024",
      guru_id: "guru1",
      jumlah_siswa: 28,
      created_at: new Date().toISOString(),
    };
  }

  const { data, error } = await supabase.from("kelas").select("*").eq("id", kelasId).single();

  if (error) throw error;
  return data;
}

// ============= SISWA FUNCTIONS (FR-3, FR-4) =============

export async function getSiswaList(kelasId?: string): Promise<Siswa[]> {
  if (USE_MOCK) {
    return [
      {
        id: "s1",
        nama: "Raka Pratama",
        kelas_id: kelasId || "k1",
        status: "Aktif",
        progress_persen: 65,
        nilai_rata: 72,
        waktu_bermain_total: 450,
        created_at: new Date().toISOString(),
      },
      {
        id: "s2",
        nama: "Siti Nurhaliza",
        kelas_id: kelasId || "k1",
        status: "Aktif",
        progress_persen: 85,
        nilai_rata: 88,
        waktu_bermain_total: 720,
        created_at: new Date().toISOString(),
      },
      {
        id: "s3",
        nama: "Budi Santoso",
        kelas_id: kelasId || "k1",
        status: "Tidak Aktif",
        progress_persen: 45,
        nilai_rata: 65,
        waktu_bermain_total: 300,
        created_at: new Date().toISOString(),
      },
    ];
  }

  let query = supabase.from("siswa").select("*");

  if (kelasId) {
    query = query.eq("kelas_id", kelasId);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getSiswaDetail(siswaId: string): Promise<SiswaDetail | null> {
  if (USE_MOCK) {
    return {
      id: "s1",
      nama: "Raka Pratama",
      kelas_id: "k1",
      kelas_nama: "7A",
      status: "Aktif",
      progress_persen: 65,
      nilai_rata: 72,
      waktu_bermain_total: 450,
      created_at: new Date().toISOString(),
      progres_materi: [
        {
          id: "pm1",
          siswa_id: "s1",
          chapter_id: "ch1",
          chapter_nama: "Museum",
          status: "Selesai",
          nilai: 85,
          waktu_bermain: 120,
          updated_at: new Date().toISOString(),
        },
        {
          id: "pm2",
          siswa_id: "s1",
          chapter_id: "ch2",
          chapter_nama: "Chapter 1",
          status: "Selesai",
          nilai: 72,
          waktu_bermain: 150,
          updated_at: new Date().toISOString(),
        },
        {
          id: "pm3",
          siswa_id: "s1",
          chapter_id: "ch3",
          chapter_nama: "Chapter 2",
          status: "Sedang Berjalan",
          nilai: 60,
          waktu_bermain: 90,
          updated_at: new Date().toISOString(),
        },
        {
          id: "pm4",
          siswa_id: "s1",
          chapter_id: "ch4",
          chapter_nama: "Chapter 3",
          status: "Belum Mulai",
          waktu_bermain: 0,
          updated_at: new Date().toISOString(),
        },
      ],
      riwayat_aktivitas: [
        {
          id: "a1",
          siswa_id: "s1",
          siswa_nama: "Raka Pratama",
          tanggal: new Date().toISOString(),
          chapter_id: "ch2",
          chapter_nama: "Chapter 1",
          jenis_aktivitas: "Quiz",
          nilai: 72,
        },
        {
          id: "a2",
          siswa_id: "s1",
          siswa_nama: "Raka Pratama",
          tanggal: new Date(Date.now() - 86400000).toISOString(),
          chapter_id: "ch2",
          chapter_nama: "Chapter 1",
          jenis_aktivitas: "Mini Game",
          nilai: 68,
        },
      ],
      rekomendasi_terbaru: {
        id: "r1",
        siswa_id: "s1",
        chapter_disarankan: "ch2",
        chapter_nama: "Chapter 2",
        alasan:
          "Berdasarkan hasil analisis, Raka Pratama disarankan mengulang Chapter 1 karena capaian belum memenuhi indikator ketuntasan (nilai: 72, threshold: 75).",
        guru_id: "guru1",
        guru_nama: "Ibu Siti",
        tanggal: new Date().toISOString(),
      },
    };
  }

  const { data, error } = await supabase
    .from("siswa")
    .select(
      `
      *,
      kelas:kelas_id (nama_kelas),
      progres_materi (*),
      riwayat_aktivitas (*)
    `,
    )
    .eq("id", siswaId)
    .single();

  if (error) throw error;
  return data;
}

// ============= DASHBOARD FUNCTIONS (FR-1) =============

export async function getDashboardStats(guruId: string): Promise<DashboardStats> {
  if (USE_MOCK) {
    return {
      total_kelas: 2,
      total_siswa: 60,
      rata_progress: 68.5,
      aktivitas_hari_ini: 15,
    };
  }

  const kelas = await getKelasList(guruId);
  const total_kelas = kelas.length;
  const total_siswa = kelas.reduce((acc, k) => acc + k.jumlah_siswa, 0);

  return {
    total_kelas,
    total_siswa,
    rata_progress: 0,
    aktivitas_hari_ini: 0,
  };
}

export async function getProgressTrend(range: "week" | "month" = "week"): Promise<ProgressTrend[]> {
  if (USE_MOCK) {
    const days = range === "week" ? 7 : 30;
    return Array.from({ length: days }, (_, i) => ({
      tanggal: new Date(Date.now() - (days - i - 1) * 86400000).toISOString().split("T")[0],
      progress: Math.floor(60 + Math.random() * 20),
    }));
  }

  return [];
}

export async function getRecentActivities(limit: number = 10): Promise<Aktivitas[]> {
  if (USE_MOCK) {
    return [
      {
        id: "a1",
        siswa_id: "s1",
        siswa_nama: "Raka Pratama",
        tanggal: new Date().toISOString(),
        chapter_id: "ch2",
        chapter_nama: "Chapter 1",
        jenis_aktivitas: "Quiz",
        nilai: 85,
      },
      {
        id: "a2",
        siswa_id: "s2",
        siswa_nama: "Siti Nurhaliza",
        tanggal: new Date().toISOString(),
        chapter_id: "ch3",
        chapter_nama: "Chapter 2",
        jenis_aktivitas: "Mini Game",
        nilai: 92,
      },
      {
        id: "a3",
        siswa_id: "s3",
        siswa_nama: "Budi Santoso",
        tanggal: new Date(Date.now() - 3600000).toISOString(),
        chapter_id: "ch1",
        chapter_nama: "Museum",
        jenis_aktivitas: "Eksplorasi",
        nilai: 78,
      },
    ];
  }

  const { data, error } = await supabase
    .from("aktivitas")
    .select("*")
    .order("tanggal", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

// ============= RIWAYAT FUNCTIONS (FR-7) =============

export async function getRiwayatAktivitas(filters: RiwayatFilters): Promise<Aktivitas[]> {
  if (USE_MOCK) {
    return [
      {
        id: "a1",
        siswa_id: "s1",
        siswa_nama: "Raka Pratama",
        tanggal: new Date().toISOString(),
        chapter_id: "ch2",
        chapter_nama: "Chapter 1",
        jenis_aktivitas: "Quiz",
        nilai: 85,
      },
      {
        id: "a2",
        siswa_id: "s2",
        siswa_nama: "Siti Nurhaliza",
        tanggal: new Date().toISOString(),
        chapter_id: "ch3",
        chapter_nama: "Chapter 2",
        jenis_aktivitas: "Mini Game",
        nilai: 92,
      },
    ];
  }

  let query = supabase.from("aktivitas").select("*");

  if (filters.kelas_id) query = query.eq("kelas_id", filters.kelas_id);
  if (filters.siswa_id) query = query.eq("siswa_id", filters.siswa_id);
  if (filters.tanggal_mulai) query = query.gte("tanggal", filters.tanggal_mulai);
  if (filters.tanggal_akhir) query = query.lte("tanggal", filters.tanggal_akhir);

  query = query.order("tanggal", { ascending: false });

  if (filters.limit) query = query.limit(filters.limit);
  if (filters.offset)
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
}

// ============= ANALISIS FUNCTIONS (FR-5) =============

export async function getAnalisisData(kelasId?: string): Promise<DashboardAnalisisData> {
  if (USE_MOCK) {
    return {
      kemampuan_per_materi: {
        Museum: 78,
        "Chapter 1": 72,
        "Chapter 2": 65,
        "Chapter 3": 58,
      },
      distribusi_nilai: [
        { range: "0-50", jumlah: 3 },
        { range: "51-60", jumlah: 8 },
        { range: "61-70", jumlah: 15 },
        { range: "71-80", jumlah: 20 },
        { range: "81-90", jumlah: 10 },
        { range: "91-100", jumlah: 4 },
      ],
      insight:
        "Sebagian besar siswa telah menguasai materi Museum dan Chapter 1, namun masih memerlukan penguatan pada materi Chapter 2 dan Chapter 3. Disarankan untuk memberikan remedial pada siswa dengan nilai di bawah 75.",
    };
  }

  return {
    kemampuan_per_materi: {},
    distribusi_nilai: [],
    insight: "Data analisis belum tersedia.",
  };
}

// ============= KURATOR FUNCTIONS (FR-6) =============

export async function getRekomendasiSistem(siswaId: string): Promise<Rekomendasi | null> {
  if (USE_MOCK) {
    const siswa = await getSiswaDetail(siswaId);
    if (!siswa) return null;

    const progressBelumTuntas = siswa.progres_materi.find(
      (p) => p.status !== "Belum Mulai" && (p.nilai || 0) < 75,
    );

    if (progressBelumTuntas) {
      return {
        id: `r${Date.now()}`,
        siswa_id: siswaId,
        chapter_disarankan: progressBelumTuntas.chapter_id,
        chapter_nama: progressBelumTuntas.chapter_nama,
        alasan: `Berdasarkan hasil analisis, ${siswa.nama} disarankan mengulang ${progressBelumTuntas.chapter_nama} karena capaian belum memenuhi indikator ketuntasan (nilai: ${progressBelumTuntas.nilai}, threshold: 75).`,
        guru_id: "guru1",
        guru_nama: "Ibu Siti",
        tanggal: new Date().toISOString(),
      };
    }

    const progressSelanjutnya = siswa.progres_materi.find((p) => p.status === "Belum Mulai");

    if (progressSelanjutnya) {
      return {
        id: `r${Date.now()}`,
        siswa_id: siswaId,
        chapter_disarankan: progressSelanjutnya.chapter_id,
        chapter_nama: progressSelanjutnya.chapter_nama,
        alasan: `Berdasarkan hasil analisis, ${siswa.nama} telah menyelesaikan materi sebelumnya dengan baik dan siap melanjutkan ke ${progressSelanjutnya.chapter_nama}.`,
        guru_id: "guru1",
        guru_nama: "Ibu Siti",
        tanggal: new Date().toISOString(),
      };
    }

    return null;
  }

  return null;
}

export async function saveRekomendasi(
  data: Omit<Rekomendasi, "id" | "tanggal">,
): Promise<Rekomendasi> {
  if (USE_MOCK) {
    return {
      id: `r${Date.now()}`,
      ...data,
      tanggal: new Date().toISOString(),
    };
  }

  const { data: result, error } = await supabase
    .from("rekomendasi")
    .insert([{ ...data, tanggal: new Date().toISOString() }])
    .select()
    .single();

  if (error) throw error;
  return result;
}

// ============= CHAPTER FUNCTIONS =============

export async function getChapterList(): Promise<Chapter[]> {
  if (USE_MOCK) {
    return mockChapters;
  }

  const { data, error } = await supabase
    .from("chapter")
    .select("*")
    .order("urutan", { ascending: true });

  if (error) throw error;
  return data || [];
}
