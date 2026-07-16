# PROJECT REQUIREMENTS DOCUMENT (PRD)

## Dashboard Guru — Kala Jawi

**Versi:** 1.0
**Tanggal:** 10 Juli 2026
**Dokumen:** Requirements untuk modul Dashboard Guru pada platform pembelajaran Kala Jawi

---

## 1. LATAR BELAKANG & TUJUAN PROYEK

Kala Jawi adalah platform pembelajaran berbasis game yang membantu siswa mempelajari Bahasa Jawa (kosakata, unggah-ungguh basa, teks deskriptif, dll) melalui progres chapter dan "Museum" sebagai unit pembelajaran.

Dashboard Guru dibutuhkan agar guru dapat:

- Memantau aktivitas dan progres belajar siswa secara real-time.
- Menganalisis kemampuan siswa per materi.
- Memberikan rekomendasi pembelajaran yang dipersonalisasi (remedial/lanjutan).
- Mengelola kelas dan data siswa.

---

## 2. RUANG LINGKUP (SCOPE)

**In-scope:**

- 9 modul utama: Dashboard, Kelas, Siswa, Detail Siswa, Analisis, Kurator Pembelajaran, Riwayat Aktivitas, Profil Guru, Logout.
- Role: Guru (single role untuk versi ini).

**Out-of-scope (asumsi, perlu konfirmasi):**

- Modul Admin/Superadmin.
- Modul Siswa (aplikasi terpisah, di luar dashboard ini).
- Sistem pembayaran/lisensi sekolah.

---

## 3. USER ROLE

| Role | Deskripsi                | Akses                              |
| ---- | ------------------------ | ---------------------------------- |
| Guru | Pengguna utama dashboard | Full akses ke seluruh menu sidebar |

---

## 4. FUNCTIONAL REQUIREMENTS

### 4.1 Dashboard (Beranda)

**Tujuan:** Ringkasan aktivitas pembelajaran secara keseluruhan.

| ID     | Requirement                                                                                           |
| ------ | ----------------------------------------------------------------------------------------------------- |
| FR-1.1 | Sistem menampilkan total jumlah kelas milik guru                                                      |
| FR-1.2 | Sistem menampilkan total jumlah siswa di seluruh kelas                                                |
| FR-1.3 | Sistem menampilkan persentase rata-rata progress pembelajaran seluruh siswa                           |
| FR-1.4 | Sistem menampilkan jumlah aktivitas siswa pada hari berjalan                                          |
| FR-1.5 | Sistem menampilkan grafik tren progress belajar (mingguan/bulanan)                                    |
| FR-1.6 | Sistem menampilkan daftar aktivitas terbaru siswa (real-time/near real-time), maks. 10 entri terakhir |

**Acceptance Criteria:** Data ringkasan ter-update otomatis saat ada aktivitas baru; grafik dapat difilter berdasarkan rentang waktu.

---

### 4.2 Halaman Kelas

**Tujuan:** Mengelola data kelas.

| ID     | Requirement                                                                             |
| ------ | --------------------------------------------------------------------------------------- |
| FR-2.1 | Guru dapat menambah kelas baru (nama kelas, kode kelas otomatis/manual)                 |
| FR-2.2 | Guru dapat menghapus kelas (dengan konfirmasi)                                          |
| FR-2.3 | Guru dapat melihat detail kelas (daftar siswa di kelas tsb)                             |
| FR-2.4 | Tabel kelas menampilkan: Nama Kelas, Kode Kelas, Jumlah Siswa, Aksi (Edit/Hapus/Detail) |
| FR-2.5 | Kode kelas digunakan siswa untuk join ke kelas                                          |

**Acceptance Criteria:** Penghapusan kelas memunculkan dialog konfirmasi; kode kelas unik per kelas.

---

### 4.3 Daftar Siswa

**Tujuan:** Menampilkan seluruh siswa dalam kelas terpilih.

| ID     | Requirement                                                                                   |
| ------ | --------------------------------------------------------------------------------------------- |
| FR-3.1 | Sistem menampilkan dropdown/filter pemilihan kelas                                            |
| FR-3.2 | Tabel siswa menampilkan: Nama, Progress (%), Nilai, Status (Aktif/Tidak Aktif), tombol Detail |
| FR-3.3 | Guru dapat mencari siswa berdasarkan nama (search)                                            |
| FR-3.4 | Guru dapat mengurutkan (sort) berdasarkan Progress atau Nilai                                 |
| FR-3.5 | Opsi lain: export data siswa (CSV/Excel), tambah/hapus siswa dari kelas                       |

---

### 4.4 Detail Siswa

**Tujuan:** Menampilkan perkembangan belajar individual siswa.

| ID     | Requirement                                                                                                             |
| ------ | ----------------------------------------------------------------------------------------------------------------------- |
| FR-4.1 | Ringkasan: Progress keseluruhan (%), Total waktu bermain, Nilai rata-rata, Status                                       |
| FR-4.2 | Progress Materi ditampilkan per unit: Museum, Chapter 1, Chapter 2, Chapter 3 (indikator selesai/belum/sedang berjalan) |
| FR-4.3 | Riwayat aktivitas/pengerjaan game siswa tsb (tanggal, chapter, nilai)                                                   |
| FR-4.4 | Sistem menampilkan hasil analisis otomatis dan rekomendasi pembelajaran untuk siswa tsb                                 |

**Acceptance Criteria:** Progress materi menggunakan indikator visual (progress bar/badge status).

---

### 4.5 Analisis

**Tujuan:** Visualisasi kemampuan siswa secara agregat.

| ID     | Requirement                                                                                                                                                                                       |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-5.1 | Grafik kemampuan siswa per materi (radar chart/bar chart)                                                                                                                                         |
| FR-5.2 | Diagram distribusi nilai siswa (histogram)                                                                                                                                                        |
| FR-5.3 | Sistem menghasilkan insight otomatis dalam bentuk narasi, contoh: "Sebagian besar siswa telah menguasai materi Teks Deskriptif, namun masih memerlukan penguatan pada materi Unggah-ungguh Basa." |
| FR-5.4 | Filter analisis berdasarkan kelas dan rentang waktu                                                                                                                                               |

**Acceptance Criteria:** Insight dihasilkan berdasarkan threshold ketuntasan yang dapat dikonfigurasi (misal: nilai >= 75 dianggap "menguasai").

---

### 4.6 Kurator Pembelajaran

**Tujuan:** Membantu guru menentukan chapter/map selanjutnya untuk siswa.

| ID     | Requirement                                                                                                                                                                                                                                 |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-6.1 | Guru memilih siswa dari daftar                                                                                                                                                                                                              |
| FR-6.2 | Sistem menampilkan rekomendasi chapter/materi selanjutnya beserta alasan, contoh: "Berdasarkan hasil analisis, Raka Pratama disarankan mengulang Chapter 2 karena capaian materi Kosakata Bahasa Jawa belum memenuhi indikator ketuntasan." |
| FR-6.3 | Guru dapat memilih chapter selanjutnya secara manual (override rekomendasi sistem)                                                                                                                                                          |
| FR-6.4 | Guru dapat menyimpan rekomendasi (tersimpan ke profil siswa, terlihat siswa dan/atau riwayat)                                                                                                                                               |

**Acceptance Criteria:** Rekomendasi sistem berbasis data nilai & progress aktual siswa, bukan statis; rekomendasi tersimpan memiliki riwayat (siapa memberi, kapan, alasan).

---

### 4.7 Riwayat Aktivitas

**Tujuan:** Log seluruh aktivitas belajar siswa.

| ID     | Requirement                                                        |
| ------ | ------------------------------------------------------------------ |
| FR-7.1 | Tabel dengan kolom: Tanggal, Nama Siswa, Chapter, Aktivitas, Nilai |
| FR-7.2 | Filter berdasarkan kelas, siswa, dan rentang tanggal               |
| FR-7.3 | Pagination/infinite scroll untuk data dalam jumlah besar           |

---

### 4.8 Profil Guru

| ID     | Requirement                                                             |
| ------ | ----------------------------------------------------------------------- |
| FR-8.1 | Menampilkan info: Nama, Email, Sekolah, Foto Profil                     |
| FR-8.2 | Guru dapat mengedit profil (nama, sekolah, foto)                        |
| FR-8.3 | Guru dapat mengubah password (validasi password lama, baru, konfirmasi) |
| FR-8.4 | Tombol simpan perubahan dengan notifikasi sukses/gagal                  |

---

### 4.9 Logout

| ID     | Requirement                                                                         |
| ------ | ----------------------------------------------------------------------------------- |
| FR-9.1 | Sistem menampilkan dialog konfirmasi sebelum logout                                 |
| FR-9.2 | Pesan konfirmasi: "Terima kasih telah menggunakan Kala Jawi. Sampai jumpa kembali!" |
| FR-9.3 | Setelah logout, sesi/token dihapus dan diarahkan ke halaman login                   |

---

## 5. STRUKTUR NAVIGASI (SIDEBAR)

```
Dashboard
Kelas
Siswa
Analisis
Kurator
Riwayat
Profil
Logout
```

---

## 6. DATA ENTITY (draft awal)

| Entitas        | Atribut Kunci                                               |
| -------------- | ----------------------------------------------------------- |
| Guru           | id, nama, email, sekolah, foto_profil, password_hash        |
| Kelas          | id, nama_kelas, kode_kelas, guru_id                         |
| Siswa          | id, nama, kelas_id, status                                  |
| Progress       | siswa_id, chapter_id, status, nilai, waktu_bermain          |
| Chapter/Materi | id, nama_materi (Museum, Chapter 1-3), indikator_ketuntasan |
| Aktivitas      | id, siswa_id, tanggal, chapter_id, jenis_aktivitas, nilai   |
| Rekomendasi    | id, siswa_id, chapter_disarankan, alasan, guru_id, tanggal  |

---

## 7. NON-FUNCTIONAL REQUIREMENTS

| Kategori    | Requirement                                                                                           |
| ----------- | ----------------------------------------------------------------------------------------------------- |
| Performance | Dashboard load < 2 detik untuk data hingga ±50 kelas / 1000 siswa                                     |
| Usability   | Responsive (desktop-first, mendukung tablet)                                                          |
| Security    | Autentikasi guru, password ter-hash, proteksi akses antar-guru (guru A tidak bisa lihat kelas guru B) |
| Reliability | Data aktivitas tersinkron near real-time (maks delay 1-2 menit)                                       |
| Scalability | Mendukung penambahan modul (misal role Admin) di masa depan                                           |

---

## 8. ASUMSI & PERTANYAAN TERBUKA

1. Apakah satu guru bisa mengajar banyak sekolah, atau 1 guru = 1 sekolah?
2. Apakah "Aktivitas Hari Ini" dihitung real-time via WebSocket/polling, atau cukup refresh manual?
3. Apakah indikator ketuntasan materi (untuk insight & rekomendasi) bersifat fixed atau bisa dikonfigurasi guru/admin?
4. Apakah rekomendasi dari Kurator otomatis terkirim/terlihat oleh siswa, atau hanya catatan internal guru?
5. Format export Riwayat Aktivitas & Daftar Siswa — perlu PDF juga atau cukup Excel/CSV?

---

## 9. PRIORITAS PENGEMBANGAN (SARAN)

1. **Fase 1 (MVP):** Kelas, Siswa, Detail Siswa, Riwayat Aktivitas, Profil, Logout
2. **Fase 2:** Dashboard ringkasan + grafik
3. **Fase 3:** Analisis (insight otomatis) + Kurator Pembelajaran (rekomendasi sistem)
