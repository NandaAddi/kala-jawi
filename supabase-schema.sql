-- Kala Jawi Dashboard - Supabase SQL Schema
-- Execute these queries to set up the database for the Dashboard Guru

-- ============= GURU TABLE =============
CREATE TABLE guru (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  nama VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  sekolah VARCHAR(255),
  foto_profil TEXT,
  password_hash VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============= KELAS TABLE =============
CREATE TABLE kelas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guru_id UUID NOT NULL REFERENCES guru(id) ON DELETE CASCADE,
  nama_kelas VARCHAR(100) NOT NULL,
  kode_kelas VARCHAR(50) NOT NULL UNIQUE,
  jumlah_siswa INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============= SISWA TABLE =============
CREATE TABLE siswa (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kelas_id UUID NOT NULL REFERENCES kelas(id) ON DELETE CASCADE,
  nama VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'Aktif',
  progress_persen DECIMAL(5, 2) DEFAULT 0,
  nilai_rata DECIMAL(5, 2) DEFAULT 0,
  waktu_bermain_total INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============= CHAPTER TABLE =============
CREATE TABLE chapter (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_chapter VARCHAR(100) NOT NULL,
  urutan INTEGER NOT NULL,
  indikator_ketuntasan DECIMAL(5, 2) DEFAULT 75,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============= PROGRESS_MATERI TABLE =============
CREATE TABLE progress_materi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  siswa_id UUID NOT NULL REFERENCES siswa(id) ON DELETE CASCADE,
  chapter_id UUID NOT NULL REFERENCES chapter(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'Belum Mulai',
  nilai DECIMAL(5, 2),
  waktu_bermain INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(siswa_id, chapter_id)
);

-- ============= AKTIVITAS TABLE =============
CREATE TABLE aktivitas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  siswa_id UUID NOT NULL REFERENCES siswa(id) ON DELETE CASCADE,
  chapter_id UUID NOT NULL REFERENCES chapter(id) ON DELETE CASCADE,
  jenis_aktivitas VARCHAR(100),
  nilai DECIMAL(5, 2),
  tanggal TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============= REKOMENDASI TABLE =============
CREATE TABLE rekomendasi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  siswa_id UUID NOT NULL REFERENCES siswa(id) ON DELETE CASCADE,
  chapter_disarankan UUID NOT NULL REFERENCES chapter(id),
  alasan TEXT,
  guru_id UUID NOT NULL REFERENCES guru(id),
  tanggal TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============= INDEXES =============
CREATE INDEX idx_kelas_guru_id ON kelas(guru_id);
CREATE INDEX idx_siswa_kelas_id ON siswa(kelas_id);
CREATE INDEX idx_progress_materi_siswa_id ON progress_materi(siswa_id);
CREATE INDEX idx_aktivitas_siswa_id ON aktivitas(siswa_id);
CREATE INDEX idx_aktivitas_tanggal ON aktivitas(tanggal);
CREATE INDEX idx_rekomendasi_siswa_id ON rekomendasi(siswa_id);

-- ============= RLS POLICIES =============
-- Note: Configure Row Level Security (RLS) to ensure gurus can only access their own data

ALTER TABLE guru ENABLE ROW LEVEL SECURITY;
ALTER TABLE kelas ENABLE ROW LEVEL SECURITY;
ALTER TABLE siswa ENABLE ROW LEVEL SECURITY;
ALTER TABLE aktivitas ENABLE ROW LEVEL SECURITY;
ALTER TABLE rekomendasi ENABLE ROW LEVEL SECURITY;

-- ============= SAMPLE DATA (OPTIONAL) =============
-- Insert sample chapter data
INSERT INTO chapter (nama_chapter, urutan, indikator_ketuntasan) VALUES
  ('Museum', 1, 75),
  ('Chapter 1', 2, 75),
  ('Chapter 2', 3, 75),
  ('Chapter 3', 4, 75);
