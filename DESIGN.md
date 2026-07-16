---
name: Kala Jawi
description: Platform edukasi guru-sentris dengan nuansa budaya Jawa yang hangat dan organik
colors:
  cream: "#fdf4e3"
  dark: "#4a2c1a"
  gold: "#c9953c"
  light-gold: "#e8c878"
  tan: "#d9b482"
  medium: "#b8895a"
  destructive: "#dc2626"
  background: "#ffffff"
  foreground: "#1e293b"
  muted: "#f1f5f9"
  muted-foreground: "#64748b"
  border: "#e2e8f0"
  ring: "#c9953c"
typography:
  display:
    fontFamily: "Caveat, cursive"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "12px"
  2xl: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.dark}"
    textColor: "{colors.cream}"
    rounded: "{rounded.lg}"
    padding: "10px 24px"
  button-primary-hover:
    backgroundColor: "{colors.medium}"
    textColor: "{colors.cream}"
    rounded: "{rounded.lg}"
    padding: "10px 24px"
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.dark}"
    rounded: "{rounded.lg}"
    padding: "10px 24px"
  card:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
    padding: "24px"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
---

# Design System: Kala Jawi

## 1. Overview

**Creative North Star: "Learning Atelier"**

Kala Jawi adalah atelier pembelajaran — ruang di mana guru dan siswa berkreasi bersama, bukan sekadar mentransfer informasi. Visual harus terasa seperti bengkel kerja yang hangat: kayu, tanah liat, kertas kraft, dan cahaya matahari yang lembut. Bukan laboratorium klinis, bukan kantor korporat.

Sistem ini menolak estetika SaaS kaku dan nuansa enterprise yang dingin. Tidak ada gradient futuristik, neon, atau glassmorphism dekoratif. Yang ada adalah warna alam (krem, cokelat, emas) yang sudah teruji oleh waktu, tipografi yang punya kepribadian, dan komponen yang terasa organik — sudut melengkung, tidak kaku.

**Key Characteristics:**
- Warna tanah (earth tones) sebagai fondasi, emas sebagai aksen yang menarik perhatian
- Caveat untuk heading memberikan sentuhan manusiawi dan personal
- Komponen dengan sudut melengkung (rounded) dan shadow halus
- Spasi yang cukup untuk bernapas tanpa terasa kosong
- Skeleton loading untuk semua data fetching

## 2. Colors

Palet Kala Jawi terinspirasi dari alam Jawa: tanah, kayu, dan cahaya matahari. Tidak ada warna sintetis atau neon.

### Primary

- **Deep Chocolate** (#4a2c1a): Warna utama untuk teks, tombol primary, dan elemen yang membutuhkan weight visual. Digunakan secara sparing — kekuatannya ada pada kelangkaannya.
- **Warm Parchment** (#fdf4e3): Background utama. Bukan putih murni, tapi krem yang hangat seperti kertas kuno. Memberikan kesan nyaman dan tidak menyilaukan.

### Accent

- **Heritage Gold** (#c9953c): Aksen utama untuk ikon, badge, progress bar, dan elemen yang perlu menonjol. Emas yang sudah pudar, bukan emas metalik yang mencolok.

- **Soft Gold** (#e8c878): Varian lebih muda dari gold. Digunakan untuk hover states, background ringan, dan dekorasi halus.

### Tertiary

- **Natural Tan** (#d9b482): Border, separator, dan elemen netral yang lebih hangat dari abu-abu standar.

- **Warm Medium** (#b8895a): Tombol secondary, sidebar active state, dan elemen interaktif yang tidak setegas primary.

### Neutral

- **Clean White** (#ffffff): Background kartu dan modal. Kontras dengan parchment untuk menciptakan depth.

- **Slate Text** (#1e293b): Teks body dan elemen informatif. Readable di atas krem.

- **Muted Gray** (#f1f5f9): Background untuk elemen yang perlu sedikit menonjol dari main background.

### Named Rules

**The Earth Tone Rule.** Semua warna harus terasa seperti berasal dari alam — tanah, kayu, batu, tumbuhan. Tidak ada warna yang terasa "buatan" atau "digital".

**The Gold Sparingly Rule.** Emas hanya digunakan pada ≤10% dari setiap layar. Kelangkaannya adalah kekuatannya — terlalu banyak emas membuat tampilan terasa murah.

## 3. Typography

**Display Font:** Caveat (with cursive fallback)
**Body Font:** Inter (with system-ui, sans-serif fallback)

**Character:** Caveat memberikan sentuhan personal dan manusiawi — seperti tulisan tangan guru yang hangat. Inter memberikan keterbacaan yang excellent untuk body text. Kombinasi ini menciptakan keseimbangan antara personality dan fungsionalitas.

### Hierarchy

- **Display** (700, clamp(2rem, 5vw, 3.5rem), 1.2): Hero headings, judul halaman, greeting card. Hanya di satu tempat per halaman.
- **Headline** (600, 1.5rem, 1.3): Section headings, card titles. Jelas tapi tidak mendominasi.
- **Title** (600, 1.125rem, 1.4): Sub-section headings, nama komponen.
- **Body** (400, 1rem, 1.6): Teks utama, deskripsi, konten. Max line length 65-75ch.
- **Label** (600, 0.75rem, 1.4, 0.02em spacing): Tombol, badge, navigasi sidebar.

### Named Rules

**The One Display Rule.** Caveat hanya digunakan untuk heading utama per halaman. Jangan gunakan Caveat untuk body text, label, atau tombol — itu akan kehilangan dampaknya.

## 4. Elevation

Sistem ini menggunakan pendekatan **flat dengan tonal layering**. Shadow digunakan sangat hemat — hanya untuk mengindikasikan state (hover, active) atau membedakan kartu dari background.

### Shadow Vocabulary

- **Subtle Lift** (`box-shadow: 0 1px 3px rgba(0,0,0,0.08)`): Default kartu dan container. Cukup untuk membedakan dari background tanpa terasa "terapung".
- **Hover State** (`box-shadow: 0 4px 12px rgba(0,0,0,0.1)`): Tombol dan kartu saat hover. Memberikan feedback bahwa elemen interaktif.
- **Modal/Dialog** (`box-shadow: 0 20px 50px rgba(0,0,0,0.15)`): Overlay yang membutuhkan attention tinggi.

### Named Rules

**The Flat-By-Default Rule.** Semua permukaan flat saat idle. Shadow hanya muncul sebagai respons terhadap state (hover, active, focus). Tidak ada shadow permanen yang dekoratif.

## 5. Components

### Buttons

- **Shape:** Gently curved (10px radius)
- **Primary:** Deep Chocolate background (#4a2c1a), Cream text (#fdf4e3), 10px 24px padding. Untuk aksi utama.
- **Hover:** Transisi ke Warm Medium (#b8895a). Transisi 200ms ease-out.
- **Gold Variant:** Heritage Gold background (#c9953c), Dark text (#4a2c1a). Untuk CTA yang perlu menonjol.
- **Ghost:** Transparan, hanya muncul border/background saat hover. Untuk aksi sekunder.

### Cards

- **Corner Style:** Gently rounded (12px radius)
- **Background:** Clean White (#ffffff) di atas Cream (#fdf4e3) main background
- **Shadow Strategy:** Flat-by-default, subtle lift saat idle
- **Border:** Tan (#d9b482) dengan opacity 30%
- **Internal Padding:** 24px

### Inputs

- **Style:** Transparan background, Tan (#d9b480) border, 8px radius
- **Focus:** Ring emas (#c9953c) 2px, transisi halus
- **Placeholder:** Muted Gray (#64748b) yang cukup contrast

### Navigation (Sidebar)

- **Style:** Clean white background, vertical layout dengan section grouping
- **Active State:** Gold accent background, Dark text
- **Typography:** Label font (600, 0.75rem), huruf kapital untuk section
- **Mobile:** Slide-in overlay dengan backdrop

### Skeleton Loading

- **Style:** Cream (#fdf4e3) background dengan shimmer effect
- **Shape:** Mengikuti bentuk konten yang akan dimuat
- **Animation:** Shimmer loop 2 detik

## 6. Do's and Don'ts

### Do:

- **Do** gunakan Earth Tone Rule: semua warna harus terasa alami — tanah, kayu, batu
- **Do** gunakan Caveat sparingly: hanya untuk heading utama, bukan untuk semua teks
- **Do** pertahankan spasi yang cukup: setiap elemen punya ruang untuk bernapas
- **Do** gunakan skeleton loading untuk semua data fetching
- **Do** pertahankan kontras 4.5:1 untuk body text
- **Do** gunakan shadow hanya untuk state (hover, active), bukan dekoratif

### Don't:

- **Don't** gunakan gradient text (`background-clip: text`) — itu dekoratif, bukan meaningful
- **Don** gunakan glassmorphism secara default — blur dan glass cards hanya untuk keperluan spesifik
- **Don't** gunakan border-left/border-right lebih dari 1px sebagai stripe — rewrite dengan full border atau background tint
- **Don't** gunakan animasi bounce atau elastic — gunakan ease-out yang smooth
- **Don't** gunakan hero-metric template (big number, small label, gradient accent) — itu SaaS cliche
- **Don't** gunakan eyebrow di atas setiap section — itu AI grammar, bukan design choice
- **Don't** gunakan rounded radius lebih dari 16px pada kartu — over-rounding adalah codex tell
- **Don't** meniru SaaS kaku/enterprise (anti-reference dari PRODUCT.md)
- **Don't** meniru estetika AI/fintech (anti-reference dari PRODUCT.md)
- **Don't** gunakan warna neon, gradient futuristik, atau nuansa high-tech
