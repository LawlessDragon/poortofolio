# Portofolio Fotografer Murreki

Website portofolio interaktif untuk fotografer Murreki dengan konsep presentasi vertikal dan animasi berbasis GSAP.

## Fitur

- Desain fullscreen vertikal dengan slide per bagian (100vh)
- Transisi smooth dengan GSAP dan ScrollTrigger
- Animasi interaktif untuk teks dan gambar
- Efek parallax pada background
- Efek partikel di bagian kontak
- Tampilan responsif untuk berbagai ukuran layar

## Fitur Dokumentasi

Website ini memiliki section "Dokumentasi" yang berfungsi sebagai tempat menampilkan hasil foto-foto event tertentu. Fitur ini memiliki mekanisme unik untuk mempermudah update dokumentasi:

### Cara Akses Mode Edit

1. Buka halaman web di section "Dokumentasi"
2. Ketik kata "murreki" di keyboard (tanpa tanda kutip, tidak akan muncul di layar)
3. Modal edit akan muncul untuk mengubah data

### Yang Bisa Diubah

- Judul Event
- Tanggal Event
- Link Google Drive
- Background Image URL

### Menyimpan Perubahan

Semua perubahan akan disimpan di localStorage browser. Untuk update permanen:

1. Klik tombol "Ekspor JSON" di modal edit
2. File `data-dokumentasi.json` akan diunduh
3. Upload file tersebut ke repository website Anda

### Struktur File

File konfigurasi untuk dokumentasi terletak di `data-dokumentasi.json` dengan format:

```json
{
  "judul": "Nama Event",
  "tanggalEvent": "Tanggal Event",
  "linkDrive": "URL Google Drive",
  "backgroundImage": "URL Gambar Background"
}
```

**Catatan:** Jika field `backgroundImage` kosong (""), background default akan digunakan.

## Teknologi yang Digunakan

- HTML5
- CSS3 (vanilla)
- JavaScript
- GSAP (GreenSock Animation Platform)
- ScrollTrigger
- Particles.js

## Struktur Proyek

```
.
├── index.html              # Halaman utama
├── assets/
│   ├── css/
│   │   └── style.css       # Stylesheet utama
│   ├── js/
│   │   ├── main.js         # Script JavaScript utama
│   │   └── particles.min.js # Library particles.js
│   └── images/             # Direktori untuk gambar
└── README.md               # Dokumentasi proyek
```

## Cara Penggunaan

1. Clone repositori ini
2. Buka file `index.html` di browser Anda
3. Gulir ke bawah untuk melihat animasi antar slide

## Gambar

Untuk menggunakan portofolio ini, Anda perlu menambahkan gambar Anda sendiri di direktori `assets/images/` dengan nama file berikut:
- `murreki-portrait.jpg` - Untuk foto profil di bagian Tentang
- `work-1.jpg` hingga `work-4.jpg` - Untuk galeri karya
- `testimonial-bg.jpg` - Untuk background bagian testimoni
- `client-1.jpg` hingga `client-3.jpg` - Untuk avatar klien di testimoni

## Lisensi

Silakan gunakan proyek ini untuk keperluan pribadi atau komersial.

---

Dibuat dengan 💛 untuk Murreki 