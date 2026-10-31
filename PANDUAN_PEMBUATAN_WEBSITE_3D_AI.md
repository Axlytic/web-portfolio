# Panduan Lengkap: Membangun Website Interaktif 3D Berbasis AI (DreamFrame)

> **Catatan Referensi:** Panduan ini disusun berdasarkan analisis mendalam dari video tutorial **MiladiCode**: *"I Built This Interactive 3D Website With AI (Gemini 3.8 Flash)"* (URL: https://youtu.be/y1pM7bS6IY8) beserta catatan prompt Notion aslinya. Dilengkapi dengan **analisis teknis kritis**, **kode implementasi**, serta **rekomendasi AI terbaru** yang lebih mutakhir dan efisien.

---

## Daftar Isi
1. [Ringkasan Proyek & Konsep Website](#1-ringkasan-proyek--konsep-website)
2. [Perbandingan AI: Video 1 Bulan Lalu vs Rekomendasi Terkini](#2-perbandingan-ai-video-1-bulan-lalu-vs-rekomendasi-terkini)
3. [Alur Kerja Step-by-Step (Dari Nol Sampai Jadi)](#3-alur-kerja-step-by-step-dari-nol-sampai-jadi)
   - [Tahap 1: Persiapan Aset Visual & Pembuatan Video Transisi (AI)](#tahap-1-persiapan-aset-visual--pembuatan-video-transisi-ai)
   - [Tahap 2: Ekstraksi Video Menjadi 150 Frame Gambar](#tahap-2-ekstraksi-video-menjadi-150-frame-gambar)
   - [Tahap 3: Setup Proyek Frontend](#tahap-3-setup-proyek-frontend)
   - [Tahap 4: Pembuatan Hero Section Awal](#tahap-4-pembuatan-hero-section-awal)
   - [Tahap 5: Implementasi Canvas Scroll Animation (Bagian Kritis!)](#tahap-5-implementasi-canvas-scroll-animation-bagian-kritis)
   - [Tahap 6: Memperbaiki Kontras & Keterbacaan Teks (Bagian Penting di Video)](#tahap-6-memperbaiki-kontras--keterbacaan-teks-bagian-penting-di-video)
   - [Tahap 7: Dua Baris Infinite Logo Carousel (Marquee)](#tahap-7-dua-baris-infinite-logo-carousel-marquee)
   - [Tahap 8: Bento Grid Section & Perbaikan Visual](#tahap-8-bento-grid-section--perbaikan-visual)
   - [Tahap 9: Pembuatan Model 3D AI & Integrasi GLB Interaktif](#tahap-9-pembuatan-model-3d-ai--integrasi-glb-interaktif)
   - [Tahap 10: Sentuhan Akhir (Footer & Responsivitas Mobile)](#tahap-10-sentuhan-akhir-footer--responsivitas-mobile)
4. [Kompilasi Prompt Asli & Panduan Penggunaannya](#4-kompilasi-prompt-asli--panduan-penggunaannya)
5. [Arsitektur Kode & Contoh Implementasi Kunci](#5-arsitektur-kode--contoh-implementasi-kunci)
   - [Komponen Canvas Scroll Frame (Smooth Lerp + DPR Retina)](#komponen-canvas-scroll-frame-smooth-lerp--dpr-retina)
   - [Komponen 3D Model Viewer (Three.js / React Three Fiber)](#komponen-3d-model-viewer-threejs--react-three-fiber)
6. [Troubleshooting & Solusi Masalah Umum untuk Pemula](#6-troubleshooting--solusi-masalah-umum-untuk-pemula)

---

## 1. Ringkasan Proyek & Konsep Website

Dalam video tersebut, kreator membangun sebuah landing page untuk produk fiktif bernama **"DreamFrame"** (sebuah platform generator gambar dan video berbasis AI). Website ini bukan sekadar halaman statis, melainkan memiliki estetika **ultra-premium, sinematik, dark cosmic, dan interaktif** layaknya website Apple / Linear / Lusion.

### Fitur-fitur Utama yang Dibuat:
1. **Hero Section Sinematik**: Tipografi raksasa "DREAMFRAME" di bagian bawah layar (lebar ~90vw), headline modern, badge status, dan tombol CTA ganda.
2. **Scroll-Driven Frame Animation**: Saat pengguna menggulir mouse (scroll) ke bawah, latar belakang video berputar/bergerak mulus mengikuti posisi scroll (menggunakan canvas HTML5 yang merender urutan 150 frame gambar).
3. **Penyempurnaan Kontras Visual**: Vignette gelap atmospheric di balik teks kiri agar teks tetap terbaca tajam saat latar belakang video berubah terang/gelap.
4. **Infinite Logo Carousel (Marquee)**: Dua baris deretan logo partner yang bergerak berlawanan arah secara terus menerus tanpa terputus.
5. **Modern Bento Grid**: Tata letak asimetris ala Apple dengan efek glassmorphism, border glowing halus, dan visual fitur produk.
6. **3D Model Creator Studio**: Model 3D astronot di atas bus oranye yang dibuat dari gambar 2D menggunakan AI, lalu diintegrasikan ke website dalam format `.glb` sehingga pengunjung bisa memutar dan berinteraksi secara 3D 360 derajat.

---

## 2. Perbandingan AI: Video 1 Bulan Lalu vs Rekomendasi Terkini

Karena lanskap AI berkembang sangat cepat, berikut adalah perbandingan antara tools yang digunakan di dalam video dengan **tools terbaik & paling optimal saat ini**:

| Kategori | Tool di Video (1 Bulan Lalu) | Rekomendasi AI Terbaru Saat Ini | Mengapa Lebih Baik? (Analisis & Pendapat) |
|---|---|---|---|
| **AI Coding Assistant** | Antigravity + Gemini 3.8 Flash | **Gemini 3.8 Flash / Pro** (di Antigravity) ATAU **Claude 3.7 Sonnet** | Gemini 3.8 Flash di Antigravity sangat cepat dan mendukung live artifact & terminal execution. Namun, untuk styling CSS rumit, animasi Three.js, dan taste desain UI modern, **Claude 3.7 Sonnet** terkenal menghasilkan kode yang paling rapi dan minim bug dalam sekali jalan. |
| **Pencarian Ide & Gambar Awal** | Pinterest & RunDiffusion | **FLUX.1 (Dev/Pro)** atau **Midjourney v6.1 / v7** | FLUX.1 dan Midjourney v6.1 memiliki koherensi pencahayaan (cinematic lighting) dan detail arsitektur futuristik yang jauh lebih stabil untuk dijadikan Frame 1 dan Frame 2. |
| **Image-to-Video Interpolation** | Runnable (Seedance 2.5) | **Kling AI (v1.5 / v2.0)** atau **Runway Gen-3 Alpha (Camera Control)** atau **Luma Dream Machine Ray-2** | Seedance di Runnable bagus, namun **Kling AI** dan **Runway Gen-3 Alpha** memiliki fitur *End Frame Control* (Keyframing awal & akhir) yang jauh lebih akurat dalam mempertahankan kontinuitas objek tanpa terjadi deformasi (morphing aneh) pada pintu atau ruangan. |
| **Ekstraksi Frame Video** | Runnable Agent / Ezgif Web | **FFmpeg (CLI Lokal)** atau script Python sederhana | Mengunggah video ke Ezgif membatasi resolusi, menurunkan bitrate (kompresi jelek), dan membuang waktu unduh/unggah. Dengan FFmpeg di komputer lokal, 150 frame diekstrak dalam **1 detik** tanpa kompresi kualitas sama sekali. |
| **Image-to-3D Generator** | Tripo AI (v2.0) | **Tripo AI 2.5**, **Meshy-4**, atau **TRELLIS / Hunyuan3D** | Tripo masih salah satu yang terbaik untuk pemula karena langsung mengekspor `.glb` dengan tekstur PBR. Namun **Meshy-4** saat ini menghasilkan topology mesh yang lebih rapi (quads, bukan triangles acak) dan ukuran file GLB yang lebih teroptimasi untuk web. |

---

## 3. Alur Kerja Step-by-Step (Dari Nol Sampai Jadi)

### Tahap 1: Persiapan Aset Visual & Pembuatan Video Transisi (AI)

Tujuan tahap ini adalah menghasilkan **1 video sinematik berdurasi ~5 detik** yang menghubungkan dua gambar konsep dengan pergerakan kamera satu tarikan (*one continuous take*).

1. **Mencari/Membuat 2 Gambar Kunci**:
   - **Frame Awal (Frame 1)**: Gambar ruangan dengan pintu terbuka yang menghadap ke luar/lorong.
   - **Frame Akhir (Frame 2)**: Ruangan/lanskap futuristik yang berada di sebelah kanan setelah melewati pintu.
2. **Kesesuaian Aset (PENTING)**:
   - Kedua gambar **harus** memiliki aspek rasio yang sama persis: `16:9` (1920x1080).
   - Palet warna dan pencahayaan harus disesuaikan (misal: nuansa dark sci-fi dengan aksen ungu/emas) agar saat transisi video tidak terjadi perubahan warna yang mendadak.
3. **Membuat Video Menggunakan AI Video Generator**:
   - Pilih mode **Image-to-Video** dengan opsi **Start Frame** dan **End Frame**.
   - Beri instruksi kamera yang spesifik: Kamera bergerak maju menembus pintu, lalu berputar halus ke kanan menuju sudut Frame 2.
   - *Prompt yang digunakan:*
     > *"Seamless continuous cinematic shot between the two reference frames. Start exactly from the first frame. Slowly move the camera forward and pass completely through the open door. Once the camera is fully through the doorway, smoothly turn the camera to the right. The second scene is already there in the environment, completely unchanged and naturally existing outside the camera's view. Reveal it only as the camera turns toward it. Continue the rightward camera movement until the composition matches the second reference frame exactly, then gently settle on it. Natural realistic camera motion, smooth parallax, cinematic depth, subtle environmental movement, no cuts, no dissolve, no morphing, no gradual appearance of the second scene, no teleportation, no sudden transition."*

---

### Tahap 2: Ekstraksi Video Menjadi 150 Frame Gambar

Browser modern tidak bisa memutar file `.mp4` secara mulus jika dimundurkan/dimajukan dengan scroll mouse (*scrubbing video di browser sering patah-patah/stutter*). Karena itu, video harus diubah menjadi rangkaian gambar individu (**Image Sequence**).

1. Ekstrak video menjadi tepat **150 frame** dengan format penamaan standar:
   - `frame-001.png`, `frame-002.png`, ... sampai `frame-150.png`.
2. **Cara Terbaik & Tercepat (Menggunakan FFmpeg)**:
   Buka terminal di folder video, lalu jalankan satu baris perintah:
   ```bash
   ffmpeg -i input_video.mp4 -vf "fps=30,scale=1920:1080" frame-%03d.png
   ```
3. Letakkan seluruh 150 gambar tersebut di folder public proyek web:
   `public/frames/frame-001.png` s/d `frame-150.png` (atau dibungkus dalam zip sesuai preferensi prompt Anda).

---

### Tahap 3: Setup Proyek Frontend

Di video digunakan Next.js, tetapi Anda juga bisa menggunakan React + Vite + TypeScript (yang sudah Anda miliki di workspace ini).

Jika menggunakan Next.js (seperti di video):
```bash
npx create-next-app@latest ./ --typescript --tailwind --eslint --app
```
Jika menggunakan Vite (workspace saat ini):
- Pastikan dependensi styling dan ikon sudah siap (`lucide-react`, Tailwind atau Vanilla CSS).

---

### Tahap 4: Pembuatan Hero Section Awal

Kreator mengambil referensi layout editorial di Pinterest (layout dengan tipografi besar dan kesan majalah/luxury), lalu memberikan screenshot tersebut ke AI Coding Assistant.

**Instruksi kepada AI**:
- Ganti konten portofolio orang dengan produk **DreamFrame** (AI image & video generator).
- Latar belakang gelap futuristik dengan aksen ungu/violet.
- Tulisan merek raksasa **DREAMFRAME** di bagian bawah.
- Badge ketersediaan: `AI IMAGE GENERATOR`.
- Headline tebal dan ringkas, deskripsi singkat, tombol CTA: `Start Creating` & `Explore Models`.
- Hapus semua gambar placeholder di tengah dan efek background statis, agar siap ditimpa oleh Canvas Scroll Animation.

---

### Tahap 5: Implementasi Canvas Scroll Animation (Bagian Kritis!)

Ini adalah **inti teknis terpenting** dari website ini.

#### Mekanisme Kerja:
1. **Container Tinggi**: Hero section diberi tinggi besar, misalnya `h-[400vh]` atau `500vh`. Ini memberikan "jarak gulir" (*scroll distance*) bagi pengguna.
2. **Canvas Lengket (Sticky)**: Di dalam container dibuat canvas HTML5 dengan posisi `sticky top-0 h-screen w-screen`. Canvas ini akan tetap diam di layar selama pengguna melakukan scroll sejauh `400vh`.
3. **Progressive Preloading (Krusial)**:
   - 150 gambar harus dimuat terlebih dahulu ke memori browser menggunakan objek JavaScript `new Image()`.
   - Jika gambar belum selesai dimuat saat pengguna scroll, layar akan berkedip putih/hitam (*flickering*).
4. **Kalkulasi Posisi Scroll**:
   $$\text{progress} = \frac{\text{scrollY} - \text{offsetTop}}{\text{containerHeight} - \text{windowHeight}}$$
   Nilai progress (0.0 sampai 1.0) dikalikan dengan total frame (150) untuk mendapatkan nomor frame aktif:
   $$\text{targetFrame} = \text{round}(\text{progress} \times 149)$$
5. **Lerp Smoothing & Animation Loop**:
   - Jangan langsung mengganti frame secara kaku.
   - Gunakan `requestAnimationFrame` dengan interpolasi linier (*lerp*):
     $$\text{currentFrame} = \text{currentFrame} + (\text{targetFrame} - \text{currentFrame}) \times 0.1$$
   - Ini menghasilkan efek inersia halus (*Apple-level smoothness*).
6. **Support Layar Retina (DPR)**:
   - Canvas harus dikalikan dengan `window.devicePixelRatio` agar di layar MacBook / iPhone / monitor 4K gambar tidak terlihat buram atau pecah.
7. **Cover Fit Proposional**:
   - Gunakan logika matematika *object-fit: cover* di dalam context 2D canvas agar gambar selalu memenuhi layar tanpa terdistorsi saat ukuran browser diubah.

---

### Tahap 6: Memperbaiki Kontras & Keterbacaan Teks (Bagian Penting di Video)

Di menit ~4:00 video, kreator menemukan masalah nyata: **Saat video diputar melalui scroll, ada frame-frame tertentu yang memiliki latar belakang terang atau kontras tinggi, sehingga teks headline dan deskripsi menjadi tidak terbaca (tenggelam)**.

#### Solusi yang Diterapkan di Video:
1. **Atmospheric Dark Vignette Gradient**:
   - Menambahkan lapisan gradien gelap lembut tanpa garis tepi kaku di sisi kiri (mulai pekat di 10–25% sisi kiri, lalu memudar halus di 45–50%).
   - Lapisan ini memastikan teks selalu memiliki kontras tinggi tanpa menutupi keindahan video di bagian tengah dan kanan.
2. **Gradient Typography & Soft Glow**:
   - Warna teks headline diubah menjadi gradien putih ke lavender lembut (`from-white to-purple-200`).
   - Ditambahkan `drop-shadow` dan efek glow halus (`text-shadow: 0 0 30px rgba(168, 85, 247, 0.4)`).
3. **Penyesuaian DREAMFRAME**:
   - Diposisikan tepat di bagian bawah layar dengan lebar sekitar `90vw`, font sans-serif tebal elegan, aksen gradien, dan glow pink/ungu tipis.

---

### Tahap 7: Dua Baris Infinite Logo Carousel (Marquee)

Tepat di bawah hero section, dibuat section logo partner/klien:
1. **Dua Baris Berlawanan Arah**:
   - Baris 1: Bergerak dari kanan ke kiri (`scroll-left`).
   - Baris 2: Bergerak dari kiri ke kanan (`scroll-right`).
2. **Infinite Looping Tanpa Jeda**:
   - Array logo diduplikasi 2x atau 3x di dalam DOM.
   - Menggunakan CSS `@keyframes` yang menggeser container dari `translateX(0)` ke `translateX(-50%)` secara linear dan infinite.
3. **Masking Fade Sisi Kiri & Kanan**:
   - Menggunakan CSS `mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent)` sehingga logo muncul dan menghilang secara halus tanpa terpotong tajam di pinggir layar.
4. **Penyempurnaan Desain di Video**:
   - Awalnya AI menghasilkan logo di dalam kotak kartu (*cards box*). Kreator meminta AI **menghapus semua kotak tersebut** dan mengubah warna logo menjadi **monochrome (grayscale/putih redup)** agar terlihat bersih dan mewah.

---

### Tahap 8: Bento Grid Section & Perbaikan Visual

1. **Konsep Bento Grid**:
   - Layout grid asimetris (misal: 3 kolom dengan tinggi kartu bervariasi: kartu 1 besar lebar 2 kolom, kartu 2 vertikal 1 kolom, dst.).
   - Setiap kartu merepresentasikan kapabilitas AI DreamFrame: *AI Video Generation, Prompt to 3D, High-Res Upscaling, Style Consistency*.
2. **Styling Glassmorphism**:
   - Background kartu: semi-transparan (`bg-zinc-900/40`), border tipis halus (`border border-white/10`), sudut membulat (`rounded-3xl`), dan efek blur di belakang (`backdrop-blur-md`).
3. **Teknik Debugging Visual dengan AI**:
   - Di menit ~5:10 video, beberapa kartu bento memiliki jarak teks yang tidak rapi.
   - **Trik Kreator**: Ambil screenshot dari tampilan web yang bermasalah, lampirkan screenshot tersebut ke AI chat, lalu instruksikan perbaikan spesifik (misal: sejajarkan padding, perbaiki ukuran gambar, buat tata letak serasi).

---

### Tahap 9: Pembuatan Model 3D AI & Integrasi GLB Interaktif

Ini adalah bagian paling memikat dari video. Alih-alih hanya menampilkan gambar 2D, website memiliki **3D Studio Interaktif**.

#### Langkah 9.1: Menyiapkan Gambar 2D
- Kreator memilih konsep gambar: *Astronot yang sedang duduk di atas kendaraan/bus mini oranye*.
- Hapus latar belakang (background), tanah, dan teks yang mengganggu (bisa menggunakan ChatGPT, Remove.bg, atau Photoshop AI) sehingga tersisa objek astronot + kendaraan transparan.

#### Langkah 9.2: Mengonversi Gambar ke 3D (Tripo AI / Meshy)
1. Buka platform Image-to-3D (misalnya **Tripo 3D** atau **Meshy**).
2. Unggah gambar objek transparan.
3. Pilih opsi **Generate Multi-Views** (AI memprediksi bentuk tampak samping, belakang, dan atas).
4. Klik **Generate Smart Mesh** untuk membentuk geometri 3 dimensi.
5. Klik **Texture / PBR Texture** untuk melapisi warna, material metalik, dan pencahayaan realistis.
6. Unduh file model dalam format **`.glb`** (*GL Transmission Format Binary* — standar industri untuk 3D web performa tinggi).

#### Langkah 9.3: Integrasi Model `.glb` ke Web
1. Simpan file model di folder proyek: `public/3d-model/astronaut.glb`.
2. Gunakan library **Three.js** atau **React Three Fiber (`@react-three/fiber` dan `@react-three/drei`)**.
3. Buat komponen Canvas 3D:
   - Tambahkan `<ambientLight intensity={0.8} />` dan `<directionalLight position={[10, 10, 5]} intensity={1.5} />`.
   - Gunakan `<OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />` agar pengunjung bisa memutar objek dengan mouse, dan objek berputar pelan secara otomatis.
   - Gunakan hook `useGLTF('/3d-model/astronaut.glb')` untuk me-render model.
4. Buat antarmuka kontrol pendukung di sekeliling model 3D:
   - Tombol toggle mode tampilan (*Wireframe, Shaded, Textured*).
   - Pengaturan pencahayaan dan tombol *Export GLB / USDZ*.

---

### Tahap 10: Sentuhan Akhir (Footer & Responsivitas Mobile)

- Tambahkan footer minimalis dengan newsletter signup, tautan navigasi, dan hak cipta.
- Pastikan saat dibuka di perangkat mobile:
  - Teks `DREAMFRAME` mengecil secara dinamis menggunakan unit `vw` atau `clamp()`.
  - Canvas scroll tetap responsif dengan mempertahankan rasio aspek gambar.
  - Bento grid bertransformasi dari 3 kolom menjadi 1 kolom (`grid-cols-1 md:grid-cols-3`).

---

## 4. Kompilasi Prompt Asli & Panduan Penggunaannya

Berikut adalah seluruh prompt asli dari video (yang ada di Notion resmi MiladiCode) beserta konteks penggunaannya:

### Prompt 1: Pembuatan Video Sinematik (Runnable / Kling / Runway)
```text
Seamless continuous cinematic shot between the two reference frames.

Start exactly from the first frame. Slowly move the camera forward and pass completely through the open door.

Once the camera is fully through the doorway, smoothly turn the camera to the right. The second scene is already there in the environment, completely unchanged and naturally existing outside the camera's view. Reveal it only as the camera turns toward it.

Continue the rightward camera movement until the composition matches the second reference frame exactly, then gently settle on it.

Natural realistic camera motion, smooth parallax, cinematic depth, subtle environmental movement, no cuts, no dissolve, no morphing, no gradual appearance of the second scene, no teleportation, no sudden transition.
```

---

### Prompt 2: Pembuatan Hero Section Awal
*(Lampirkan gambar referensi layout editorial)*
```text
Recreate this exact hero section for my AI image generator app, keeping the same overall layout, spacing, typography hierarchy, oversized brand text, and premium editorial feel. Replace the existing person and portfolio content with my AI image-generation product. Use a dark futuristic background with subtle purple/violet accents. Replace the large “Dominic” text with my brand name DREAMFRAME. Add a small availability-style badge such as AI IMAGE GENERATOR, a short headline about creating images with AI, a concise supporting description, and an orange/purple CTA button like Start Creating. Keep the design minimal, bold, modern, and highly polished. Make the hero responsive on mobile. Next.js is already installed and configured in the project, so build directly within the existing Next.js setup. Do not install or replace the framework.
```

---

### Prompt 3: Implementasi Canvas Scroll Animation
```text
I already built the hero section and UI. Do not change the layout, text, navbar, buttons, spacing, colors, or styling.

Create only a cinematic scroll-linked image sequence animation behind the existing hero using the image frames already in the project folder.

### CORE INTERACTION
Build a full-screen sticky HTML5 canvas that stays pinned while the user scrolls.
The animation must be driven by scroll progress, not by time.
Use the images inside the folder: /public/frames/
frame-001.png through frame-150.png

The canvas must:
- preload frames progressively
- render the correct frame based on scroll position
- update continuously while scrolling
- never get stuck on the first frame
- use requestAnimationFrame
- use smooth interpolation/lerp between frames
- support retina/DPR screens
- stay fully responsive
- avoid flicker, jumps, or layout shift
- respect prefers-reduced-motion

### SCROLL LOGIC
The hero section should be a tall scroll area, around h-[400vh] or more.
Map scroll progress directly to frame index:
- 0% scroll → frame 1
- 100% scroll → frame 150

Important:
- The frame must recalculate on every scroll change
- The canvas must redraw whenever the target frame changes
- Do not rely on a one-time initial render
- Do not stop updating after the first frame
- Use a persistent animation loop so the current frame eases toward the target frame smoothly

### VISUAL DIRECTION
The animation should feel:
- luxurious, cinematic, futuristic, minimal, ultra-premium, Apple-level smooth
Background:
- deep dark luxury tone
- seamless canvas and background color
- no visible edges, no distracting effects
```

---

### Prompt 4: Memperbaiki Kontras Teks Hero (Contrast Enhancement)
```text
Refine the existing DreamFrame hero only. Keep the current background, layout, navigation, badge, CTA, and all existing content — do not add or remove any elements.

Make the left headline significantly more readable by adding a large, smooth cinematic dark shadow/gradient behind the text, strongest around the left 10–25% of the screen and gradually fading out toward 45–50%. It should have no hard edges or visible box, just a soft atmospheric shadow integrated into the background.

Make the headline slightly bolder with a clean white → subtle lavender gradient and a soft shadow/glow.

Make DREAMFRAME the main visual: centered horizontally, approximately 90vw wide, positioned at the bottom, with large elegant typography, white/lavender gradient, subtle pink glow, and soft depth shadow.

Keep everything minimal, spacious, and cinematic. Do not introduce any new UI elements or redesign the background. The goal is simply to make the existing hero feel more premium and dramatically improve text contrast.
```

---

### Prompt 5: Infinite Logo Carousel & Bento Grid
*(Lampirkan gambar referensi Bento Grid)*
```text
Build the next two sections directly below my existing hero without changing the hero.

1. Infinite Logo Carousel: Create two seamless horizontal logo marquees. The top row moves continuously right → left, and the second row left → right. Use smooth infinite looping, staggered logo spacing, subtle edge fade/masking, and no visible jumps. Keep it minimal and premium. Remove box containers around logos and make logos clean monochrome.

2. Bento Grid: Create the section immediately after the carousels, using the attached image as the exact structural/layout reference. Recreate its asymmetric grid, card proportions, rounded corners, spacing, and visual hierarchy, but adapt the colors, typography, content, and imagery to my existing website design. Do not copy the image's content—only its layout structure.

For both sections, use a dark cosmic background with glassy gradient elements, soft purple/pink/lavender glowing effects, and colors that match the existing DreamFrame hero.
Make both sections fully responsive and visually consistent with the existing hero.
```

---

### Prompt 6: 3D Model Creator Studio Section
```text
Create a new 3D Model Creator section using the attached design as the exact layout reference. Adapt it to my AI image-generation platform DreamFrame.
In the center, embed an interactive 3D model viewer using Three.js / React Three Fiber.
The 3D model file is located at: /3d-model/astronaut.glb

Features for the 3D viewer:
- Auto-rotate slowly
- User can rotate with mouse drag (OrbitControls)
- Cinematic studio lighting with ambient and directional lights
- Surrounding UI controls (preset angles, lighting toggle, wireframe toggle, export button)
Keep the surrounding visual style clean, minimal, and premium.
```

---

## 5. Arsitektur Kode & Contoh Implementasi Kunci

### Komponen Canvas Scroll Frame (Smooth Lerp + DPR Retina)

Berikut adalah logika React + TypeScript untuk merender 150 frame dengan mulus tanpa lag:

```tsx
import React, { useEffect, useRef, useState } from 'react';

interface CanvasScrollProps {
  totalFrames?: number;
  framePrefix?: string;
  frameExtension?: string;
}

export const CanvasScrollHero: React.FC<CanvasScrollProps> = ({
  totalFrames = 150,
  framePrefix = '/frames/frame-',
  frameExtension = '.png',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  // Nilai frame target dan frame saat ini untuk animasi lerp
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);

  // 1. Progressive Image Preloading
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `${framePrefix}${frameNum}${frameExtension}`;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, [totalFrames, framePrefix, frameExtension]);

  // 2. Scroll Event Listener & Animation Loop
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      // Hitung progress scroll antara 0.0 sampai 1.0
      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);

      targetFrameRef.current = Math.min(
        Math.floor(progress * (totalFrames - 1)),
        totalFrames - 1
      );
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 3. Render Canvas dengan Object-Fit: Cover & DPR Retina
    let animationFrameId: number;

    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');

      if (canvas && ctx && imagesRef.current.length > 0) {
        // Interpolasi Linier (Lerp) untuk kehalusan ekstra
        currentFrameRef.current +=
          (targetFrameRef.current - currentFrameRef.current) * 0.12;
        const frameToDraw = Math.round(currentFrameRef.current);

        const img = imagesRef.current[frameToDraw];
        if (img && img.complete && img.naturalWidth > 0) {
          const dpr = window.devicePixelRatio || 1;
          const displayWidth = window.innerWidth;
          const displayHeight = window.innerHeight;

          if (
            canvas.width !== displayWidth * dpr ||
            canvas.height !== displayHeight * dpr
          ) {
            canvas.width = displayWidth * dpr;
            canvas.height = displayHeight * dpr;
          }

          ctx.save();
          ctx.scale(dpr, dpr);

          // Gambar dengan simulasi background-size: cover
          const hRatio = displayWidth / img.naturalWidth;
          const vRatio = displayHeight / img.naturalHeight;
          const ratio = Math.max(hRatio, vRatio);

          const centerShiftX = (displayWidth - img.naturalWidth * ratio) / 2;
          const centerShiftY = (displayHeight - img.naturalHeight * ratio) / 2;

          ctx.clearRect(0, 0, displayWidth, displayHeight);
          ctx.drawImage(
            img,
            0,
            0,
            img.naturalWidth,
            img.naturalHeight,
            centerShiftX,
            centerShiftY,
            img.naturalWidth * ratio,
            img.naturalHeight * ratio
          );

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [totalFrames]);

  return (
    <div ref={containerRef} className="relative h-[450vh] w-full bg-[#0a0a0f]">
      {/* Canvas Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="h-full w-full object-cover" />

        {/* Lapisan Vignette Gelap untuk Memastikan Teks Terbaca (PENTING!) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/90 via-[#0a0a0f]/40 to-transparent w-[55%]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f]/60" />

        {/* Konten Hero Overlay */}
        <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-16">
          {/* Top Bar / Badge */}
          <div className="pt-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-4 py-1.5 text-xs font-semibold tracking-wider text-purple-300 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
              AI IMAGE & VIDEO GENERATOR
            </span>
            <h1 className="mt-6 max-w-2xl text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-100 to-purple-200 md:text-6xl drop-shadow-md">
              Create cinematic visuals with simple text prompts.
            </h1>
            <p className="mt-4 max-w-lg text-base text-zinc-300 md:text-lg">
              Next-generation generative AI model designed for creators, filmmakers, and digital artists.
            </p>
            <div className="mt-8 flex gap-4">
              <button className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-transform hover:scale-105">
                Start Creating
              </button>
              <button className="rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/10">
                Explore Showcase
              </button>
            </div>
          </div>

          {/* Big Typography Brand: DREAMFRAME */}
          <div className="pb-4 text-center">
            <h2 className="select-none font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-purple-100/60 to-purple-400/20 text-[14vw] leading-none drop-shadow-2xl">
              DREAMFRAME
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
```

---

### Komponen 3D Model Viewer (Three.js / React Three Fiber)

Jika Anda ingin mengintegrasikan model `.glb` menggunakan standard React Three Fiber:

```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

```tsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Float } from '@react-three/drei';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.8} />;
}

export const ModelViewerSection = () => {
  return (
    <section className="relative w-full py-24 bg-[#0d0d12] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold">
            Interactive 3D Engine
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2">
            Transform 2D Prompts into 3D Worlds
          </h2>
          <p className="text-zinc-400 mt-3 max-w-xl mx-auto">
            Drag to rotate and explore the real-time GLB model generated directly from an image.
          </p>
        </div>

        {/* 3D Viewport Box */}
        <div className="relative h-[550px] w-full rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl overflow-hidden shadow-2xl">
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center text-zinc-500">
                Loading 3D Engine...
              </div>
            }
          >
            <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }}>
              <ambientLight intensity={0.7} />
              <directionalLight position={[10, 10, 5]} intensity={1.5} />
              <directionalLight position={[-10, -5, -5]} intensity={0.5} color="#c084fc" />

              <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
                <Stage environment="city" intensity={0.6}>
                  <Model url="/3d-model/astronaut.glb" />
                </Stage>
              </Float>

              <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={1.2}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.8}
              />
            </Canvas>
          </Suspense>

          {/* Overlay Badges */}
          <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-1.5 rounded-full text-xs text-zinc-300 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Live WebGL Render
          </div>
          <div className="absolute bottom-6 right-6 text-xs text-zinc-400 bg-black/40 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
            Drag mouse to rotate 360°
          </div>
        </div>
      </div>
    </section>
  );
};
```

---

## 6. Troubleshooting & Solusi Masalah Umum untuk Pemula

| Masalah yang Sering Terjadi | Penyebab Utama | Solusi Praktis |
|---|---|---|
| **Layar berkedip hitam/putih saat di-scroll** | Frame gambar belum selesai diunduh oleh browser saat scroll mencapai frame tersebut. | Pastikan seluruh 150 gambar telah di-*preload* ke memori menggunakan `new Image()` sebelum user berinteraksi, atau tampilkan loading bar singkat. |
| **Animasi scroll terasa patah-patah (lag)** | Resolusi 150 gambar terlalu besar (misal 4K atau PNG uncompressed >5MB per gambar). | Kompres ukuran setiap frame ke format WebP atau gunakan resolusi 1080p (Full HD) terkompresi (~100KB per frame). Total 150 frame sebaiknya di bawah 20MB. |
| **Model 3D (.glb) lama sekali muncul** | Poligon/mesh 3D hasil generate AI terlalu padat (>100k polygon) dan teksturnya 4K. | Di Tripo/Meshy, pilih opsi **Clean Topology / Low-Poly** atau kompres file GLB menggunakan tool gratis online **gltf-transform** (Draco compression). |
| **Teks tidak terbaca di tengah-tengah video** | Frame video memiliki area putih terang tepat di belakang teks putih. | Gunakan teknik di video: pasang layer gradien hitam atmosferik (`bg-gradient-to-r from-black/85 via-black/40 to-transparent`) di sisi kiri container canvas. |
| **Scroll canvas macet di frame pertama** | Event scroll tidak menghitung koordinat offset container dengan benar. | Pastikan container memiliki tinggi minimal `400vh` dan canvas memiliki style `sticky top-0`. |

---

## Kesimpulan & Rekomendasi Langkah Awal Anda
Untuk Anda yang sedang belajar:
1. **Mulai dari hal kecil**: Jangan langsung mencoba membuat semuanya sekaligus. Ikuti urutan di atas:
   - *Hari 1*: Buat 2 gambar referensi dan ekstrak 150 framenya.
   - *Hari 2*: Buat komponen Canvas Scroll sederhana untuk menguji apakah 150 framenya bisa berganti dengan halus saat mouse digulir.
   - *Hari 3*: Pasang tipografi teks Hero DreamFrame dan lapisi dengan gradien kontras.
   - *Hari 4*: Tambahkan Carousel logo dan Bento Grid.
   - *Hari 5*: Coba buat model 3D di Tripo AI dan masukkan ke dalam Three.js viewer.
2. Anda selalu bisa menanyakan kode spesifik pada tahap manapun saat Anda mulai mempraktikkannya!
