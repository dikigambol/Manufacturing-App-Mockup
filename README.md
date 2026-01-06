# Mesin Industri App

A modern web application for managing industrial machines, built with **React** and **Vite**.

## Deskripsi Project

Mesin Industri App adalah aplikasi web yang dirancang untuk membantu pengelolaan mesin industri secara efisien. Dengan antarmuka yang responsif dan fitur modular, aplikasi ini diharapkan memudahkan pengguna dalam mengakses data, mengatur layout, dan monitoring sumber data.

## Apa itu Mesin Industri App?

Mesin Industri App adalah platform web canggih yang dikembangkan untuk memfasilitasi pengelolaan dan monitoring mesin-mesin industri dalam lingkungan pabrik atau fasilitas produksi. Aplikasi ini menyediakan antarmuka pengguna yang intuitif dan responsif, memungkinkan operator, teknisi, dan manajer untuk:

- **Monitoring Real-time**: Melihat status mesin secara langsung melalui dashboard interaktif dengan grafik dan KPI cards.
- **Manajemen Data**: Mengakses dan mengelola sumber data terkait performa mesin, seperti konsumsi energi, waktu operasi, dan metrik produktivitas.
- **Layout Kustomisasi**: Mengatur tata letak dashboard sesuai kebutuhan pengguna dengan komponen modular.
- **Alert dan Notifikasi**: Menerima peringatan otomatis tentang kondisi mesin yang memerlukan perhatian.
- **Analisis Data**: Menggunakan berbagai jenis chart (area, bar, pie, gauge) untuk analisis mendalam.

Aplikasi ini terdiri dari beberapa komponen utama:
- **Dashboard Utama**: Halaman beranda yang menampilkan ringkasan KPI, grafik performa, dan widget interaktif.
- **Halaman Data Resources**: Untuk mengelola dan melihat sumber data mesin, termasuk tabel data dan filter.
- **Sistem Alert**: Mekanisme notifikasi untuk kondisi abnormal mesin, seperti overheating atau kegagalan operasi.
- **Layout Modular**: Komponen seperti sidebar navigasi, header, dan sheet untuk pengaturan kustom.

Dibangun dengan teknologi modern seperti React untuk frontend yang dinamis, Vite untuk pengembangan cepat, dan Tailwind CSS untuk styling yang konsisten, aplikasi ini dirancang untuk meningkatkan efisiensi operasional dan mengurangi downtime mesin industri. Dengan menggunakan Context API untuk manajemen state global dan hooks kustom untuk logika bisnis, aplikasi ini memastikan performa tinggi dan skalabilitas.

## Fitur Project

- ⚡ Pengembangan cepat dengan Vite
- 🔥 Hot Module Replacement (HMR)
- 🧩 Komponen React yang modular
- 🎨 UI kustom dengan Tailwind CSS
- 🛡️ Manajemen state berbasis Context
- 📦 Struktur proyek yang terorganisir
- 🚦 Halaman dashboard, error, dan data source

## Instalasi

Pastikan Node.js dan npm sudah terpasang di komputer Anda.

```bash
npm install
```

## Cara Penggunaan

### Menjalankan Aplikasi

```bash
npm run dev
```

Buka [http://localhost:5173](http://localhost:5173) di browser Anda.

### Build untuk Produksi

```bash
npm run build
```

## Struktur Proyek

```
src/
  ├── assets/         # Gambar dan CSS
  ├── components/     # Komponen UI dan custom
  ├── contexts/       # Context provider React
  ├── hooks/          # Custom hooks
  ├── layouts/        # Komponen layout
  ├── pages/          # Halaman aplikasi (dashboard, errors, dll)
  ├── requests/       # Handler API request
  ├── utils/          # Fungsi utilitas
  └── main.jsx        # Entry point aplikasi
```

## Kontribusi

Silakan fork repository ini dan ajukan pull request untuk kontribusi.

## Lisensi

MIT

---

Dibuat dengan ❤️ menggunakan React & Vite.
