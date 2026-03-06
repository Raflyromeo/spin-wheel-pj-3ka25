# 🎡 3KA25 PJ Spin Wheel

Halo! Ini adalah *official repository* untuk aplikasi **3KA25 PJ Spin Wheel**, sebuah web interaktif modern yang dibuat khusus untuk menentukan Penanggung Jawab (PJ) Mata Kuliah di kelas 3KA25 Sistem Informasi secara adil, transparan, dan pastinya seru. 😁

Sistem ini memakai mekanisme dua putaran rolet sekaligus (*dual spin logic*): satu untuk milih nama mahasiswa, dan satu lagi untuk milih mata kuliahnya. 

## ✨ Fitur Keren

- **Dual Spin Engine:** Putar roda nama & mata kuliah secara rapi. Pas roda berhenti, hasil otomatis disandingkan.
- **Data Fleksibel:** Kamu bisa langsung masukin, edit, atau hapus daftar mahasiswa dan mata kuliah dari tampilan utamanya.
- **Dark/Light Mode:** Bisa ganti tema antar mode terang dan gelap lewat tombol yang desainnya estetik layaknya Liquid Glass ala Apple.
- **Animasi Mulus:** Dibangun pakai intervensi animasi tingkat lanjut (GSAP dan Framer Motion) biar *scroll* dan transisi *loading*-nya memanjakan mata.
- **Suara & Efek Spesial:** Dilengkapi efek suara rolet yang bisa dimatikan/dinyalakan, serta ledakan *Confetti* waktu dapet hasil pemilihannya. 🎉
- **Super Responsif:** Tampilannya proporsional dan enak dilihat mau dibuka dari HP, iPad, ataupun layarnya PC/Laptop.

## 🚀 Teknologi yang Dipakai

Biar dapet *feel* sistem yang cepat dan kekinian, web ini dibangun pakai:
- **[Next.js](https://nextjs.org/)** (App Router)
- **[Tailwind CSS](https://tailwindcss.com/)** buat urusan *styling* antarmuka
- **[GSAP](https://gsap.com/)** untuk animasi transisi *scroll* elemen-elemen cantik
- **[Framer Motion](https://www.framer.com/motion/)** buat hal-hal detail kayak pop-up modal
- **[Zustand / Hooks](https://react.dev/)** untuk manajemen putaran spin wheel-nya
- **[Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)** buat letusan kertas setelah dapat PJ!

## � Struktur Folder

Berikut adalah gambaran bagaimana struktur file diatur di dalam proyek ini:

```text
📦 spin-wheel/
├── 📂 public/               # Gambar, audio, icon, dan aset publik lainnya
├── 📂 src/
│   ├── 📂 app/              # Konfigurasi routing Next.js (App Router)
│   │   ├── globals.css      # Custom styling Tailwind & tema CSS
│   │   ├── layout.tsx       # Layout utama web (termasuk Navbar & Footer)
│   │   └── page.tsx         # Halaman utama aplikasi (Hero, Spin Wheel, FAQ)
│   │
│   ├── 📂 components/       # Kumpulan komponen antarmuka yang bisa dipakai ulang
│   │   ├── ui/              # Komponen kecil/atom (biasanya dari shadcn/aceternity)
│   │   ├── Countdown.tsx    # Komponen hitung mundur tanggal pemilu
│   │   ├── FAQ.tsx          # Bagian informasi sistem & tata cara
│   │   ├── Hero.tsx         # Bagian selamat datang di paling atas halaman
│   │   ├── InputForm.tsx    # Formulir input nama/matkul dari pengguna
│   │   ├── ResultModal.tsx  # Pop-up modal pas hasil spin sudah keluar
│   │   ├── SpinWheel.tsx    # Logika visual & rotasi roda putar (Roulette)
│   │   ├── TutorialAnimation.tsx # Simulasi cara pakai di bagian FAQ
│   │   └── ...              # (Navbar, Footer, MagneticButton, GsapScrollReveal dll.)
│   │
│   ├── 📂 hooks/            # Custom React Hooks
│   │   └── useSpinWheel.ts  # State management utama pakai Zustand untuk Spin Wheel
│   │
│   └── 📂 lib/              # Fungsi-fungsi utility/bantuan
│       ├── spinLogic.ts     # Menghitung durasi, target indeks, & matematika putaran
│       └── tts.ts           # Logika Text-To-Speech (suara sistem)
│
├── next.config.ts           # Konfigurasi Next.js
├── tailwind.config.ts       # Konfigurasi styling Tailwind CSS
└── package.json             # Daftar dependencies proyek
```

## �🛠️ Cara Jalankan Sendiri (Local Development)

Kalo kamu penasaran dan pengen nyoba nge-*run* file proyektor ini di laptop kamu sendiri, gampang banget:

1. Pastikan udah ada [Node.js](https://nodejs.org/) terinstall.
2. *Clone* atau sedia file repo ini, buka pakai terminal, lalu ketik perintah berikut:
   ```bash
   # install dulu semua paket persiapannya
   npm install

   # jalanin server lokalnya
   npm run dev
   ```
3. Buka browser kamu dan akses alamat `http://localhost:3000`. Webnya langsung nyala deh!

## 📜 Catatan Tambahan

Proyek ini dirancang secara spesial untuk mempermudah ekosistem kelas 3KA25 supaya nggak ada lagi drama milih PJ kelas. Proyek ini 100% menggunakan kode yang bersih (*Clean Code*) dan optimasi dari segi performa maupun tampilan grafis/UX.

---

*Dibuat untuk sistem pemilihan PJ kelas yang keren dan tanpa drama.* 🚀
