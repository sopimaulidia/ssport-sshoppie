# Shoppie Sport 🏃‍♂️

Website e-commerce perlengkapan olahraga — proyek tugas mata kuliah (Program Studi Administrasi Bisnis, S1). Dibangun dengan HTML, CSS, dan JavaScript murni (vanilla), tanpa framework maupun library eksternal.

**Live demo:** `https://<username-github>.github.io/<nama-repo>/` — *ganti dengan URL GitHub Pages setelah deploy.*

---

## Daftar Isi

1. [Ringkasan Proyek](#ringkasan-proyek)
2. [Fitur Teknis](#fitur-teknis)
3. [Struktur Folder](#struktur-folder)
4. [Cara Menjalankan Secara Lokal](#cara-menjalankan-secara-lokal)
5. [Cara Deploy ke GitHub Pages](#cara-deploy-ke-github-pages)
6. [Business Overview](#business-overview)

---

## Ringkasan Proyek

Shoppie Sport adalah simulasi toko online yang menjual perlengkapan olahraga: sepatu, apparel, bola, alat gym, dan aksesoris pendukung latihan. Situs ini dibuat sebagai studi kasus untuk memahami bagaimana sisi teknis (frontend) dan sisi bisnis (strategi produk, harga, dan pemasaran) sebuah e-commerce saling terhubung.

Seluruh transaksi pada situs ini adalah **simulasi** — tidak ada pembayaran nyata yang diproses.

## Fitur Teknis

- **Navbar + Hero Banner** dengan CTA menuju katalog.
- **Katalog produk** (13 produk) lengkap dengan gambar, kategori, dan harga.
- **Filter & pencarian**: berdasarkan nama, kategori, dan urutan harga.
- **Modal detail produk**: deskripsi, rating, dan pemilihan jumlah sebelum ditambah ke keranjang.
- **Keranjang belanja**: tambah, ubah jumlah, hapus produk, total otomatis — tersimpan di `localStorage` sehingga tetap ada walau halaman di-refresh.
- **Checkout**: form data pengiriman, pemilihan metode pembayaran, validasi input (nama, email, no. telepon, alamat), dan **simulasi payment gateway** (skenario Midtrans) dengan status *processing* lalu *success* beserta ID transaksi acak.
- **Newsletter dummy** dengan validasi email sederhana.
- **Smooth scroll** antar-section dan **scroll-reveal animation** ringan pada kartu produk.
- **Responsive design** penuh: breakpoint untuk desktop, tablet (≤980px), dan mobile (≤720px & ≤460px) menggunakan Flexbox & CSS Grid.
- **Google Analytics (dummy)**: snippet `gtag.js` dengan Measurement ID placeholder, mengirim event `view_item`, `add_to_cart`, `begin_checkout`, dan `purchase` — dijelaskan lebih lanjut di bagian [Rencana Data Analytics](#8-rencana-penggunaan-data-analytics).

## Struktur Folder

```
shoppie-sport/
├── index.html      # Struktur halaman: navbar, hero, katalog, modal, cart, checkout, footer
├── style.css       # Seluruh styling, desain responsive, dan animasi
├── app.js          # Data produk & seluruh logika interaktif (cart, filter, checkout, dsb.)
├── images/         # Foto 13 produk (format .jpg)
└── README.md       # Dokumentasi teknis & business overview (file ini)
```

> Catatan: seluruh 13 produk memakai foto asli yang disimpan di folder `images/`. Jika ingin mengganti atau menambah produk, cukup taruh file gambar baru di folder `images/` lalu perbarui nilai `image` pada array `PRODUCTS` di `app.js` agar path-nya sesuai.

## Cara Menjalankan Secara Lokal

1. Clone atau download repository ini.
2. Buka `index.html` langsung di browser, **atau** jalankan local server (disarankan agar semua fitur berjalan konsisten):
   ```bash
   npx serve .
   # atau
   python3 -m http.server 8080
   ```
3. Akses `http://localhost:8080` di browser.

## Cara Deploy ke GitHub Pages

1. Push seluruh isi folder ini ke repository GitHub (branch `main`).
2. Buka **Settings → Pages** pada repository.
3. Pada bagian **Source**, pilih branch `main` dan folder `/root`.
4. Simpan, tunggu beberapa menit, lalu salin URL yang muncul (format `https://<username>.github.io/<repo>/`).
5. Tempelkan URL tersebut di bagian atas README ini dan pada laporan tugas.

Disarankan melakukan commit bertahap dan bermakna, misalnya:
`init project`, `add navbar & hero`, `add product catalog`, `add cart logic`, `add checkout simulation`, `add responsive styling`, `add business overview`, `final polish`.

---

## Business Overview

### 1. Nama Bisnis, Deskripsi, dan Value Proposition

**Nama bisnis:** Shoppie Sport
**Deskripsi:** Toko online yang berfokus pada perlengkapan olahraga fungsional — sepatu, apparel, bola, dan alat latihan — dengan kurasi produk yang relevan untuk pemula hingga penggiat olahraga rutin, khususnya kalangan mahasiswa dan pekerja muda.

**Value proposition:**
- Harga kompetitif untuk kategori kebutuhan olahraga sehari-hari (bukan barang premium/branded mahal).
- Kurasi produk berdasarkan kebutuhan latihan nyata (lari, basket, futsal, gym), bukan sekadar tren.
- Pengalaman belanja sederhana: dari melihat produk sampai checkout hanya butuh beberapa klik.
- Transparansi deskripsi produk — tidak ada klaim berlebihan.

### 2. Target Market dan Segmentasi Pelanggan

| Segmen | Karakteristik | Kebutuhan Utama |
|---|---|---|
| Mahasiswa & pelajar | Usia 17–24 tahun, budget terbatas, aktif di UKM/olahraga kampus | Harga terjangkau, sepatu & apparel dasar |
| Pekerja muda pemula gym/lari | Usia 22–35 tahun, mulai rutin olahraga | Alat latihan rumahan, sepatu training |
| Komunitas olahraga (futsal/basket) | Bermain rutin mingguan, membeli sebagai tim | Bola, jersey, aksesoris dalam jumlah menengah |

Segmentasi dilakukan berdasarkan **perilaku olahraga** (jenis aktivitas) dan **sensitivitas harga**, bukan hanya demografi, karena keduanya paling menentukan produk mana yang relevan ditawarkan.

### 3. Analisis Pasar Singkat dan Kompetitor

Pasar perlengkapan olahraga online di Indonesia didorong oleh tren gaya hidup aktif (lari, gym, olahraga komunitas) serta kemudahan belanja lewat marketplace. Kompetisi datang dari dua arah:

- **Marketplace besar (Tokopedia, Shopee, dsb.):** pilihan sangat luas dan harga bersaing, tetapi kurasi produk minim dan pengalaman belanja generik.
- **Brand olahraga besar (toko resmi Nike/Adidas/Specs, dsb.):** kualitas dan branding kuat, tetapi harga jauh lebih tinggi untuk sebagian segmen mahasiswa.

Posisi Shoppie Sport berada di celah keduanya: **kurasi yang lebih fokus dibanding marketplace umum**, dengan **harga yang lebih ramah dibanding brand besar**.

### 4. Strategi Manajemen Produk dan Katalog

- Produk dikelompokkan ke dalam 4 kategori: **Sepatu, Pakaian, Peralatan, Aksesoris** — memudahkan navigasi dan filter.
- Setiap produk memiliki deskripsi singkat yang menjelaskan *manfaat penggunaan*, bukan hanya spesifikasi teknis.
- Foto produk menggunakan gaya visual konsisten (latar gelap, aksen warna brand) supaya katalog terasa satu identitas.
- Katalog dirancang dapat berkembang: penambahan produk baru cukup menambah data pada satu sumber (`PRODUCTS` di `app.js`) tanpa mengubah struktur halaman.

### 5. Model Bisnis dan Revenue Stream

Model bisnis utama adalah **retail online langsung ke konsumen (B2C)** dengan sumber pendapatan:

1. **Margin penjualan produk** — selisih harga beli dari supplier/distributor dengan harga jual.
2. **Penjualan paket/bundel** (mis. jersey + kaos kaki) untuk menaikkan rata-rata nilai transaksi (AOV).
3. **Potensi kerja sama komunitas/kampus** — penjualan jersey/bola dalam jumlah menengah ke UKM atau komunitas olahraga.

### 6. Strategi Harga, Promosi, dan Diskon

- **Strategi harga:** *competitive pricing* — harga ditempatkan sedikit di bawah brand besar sejenis, dengan margin tetap sehat karena volume kategori "kebutuhan dasar" (sepatu training, kaos kaki, botol minum) cenderung tinggi.
- **Promosi:** memanfaatkan bagian *Best Seller* di hero section dan highlight kategori di footer untuk mengarahkan perhatian ke produk dengan margin baik atau stok banyak.
- **Diskon:** direncanakan berbasis musiman (mis. awal semester, bulan olahraga nasional) dan diskon bundel, bukan diskon acak yang bisa menurunkan persepsi kualitas produk.

### 7. Proses Checkout dan Simulasi Payment Gateway

Alur checkout pada situs ini:

1. Pengguna menekan **Checkout** dari keranjang.
2. Mengisi data pengiriman (nama, email, no. telepon, alamat) — divalidasi langsung di browser sebelum dikirim.
3. Memilih metode pembayaran: **Transfer Bank (Virtual Account)**, **E-Wallet**, atau **Kartu Kredit/Debit** — merepresentasikan kanal yang umum tersedia di payment gateway seperti **Midtrans**.
4. Sistem menampilkan status *"menghubungkan ke payment gateway"* selama beberapa detik (simulasi proses autentikasi & konfirmasi pembayaran).
5. Setelah simulasi selesai, ditampilkan halaman sukses dengan **ID transaksi** unik dan ringkasan pesanan.

Pada implementasi produksi, langkah 3–5 akan digantikan dengan Midtrans Snap API: server membuat *transaction token*, frontend memanggil `snap.pay(token)`, dan status transaksi dikonfirmasi lewat webhook/notifikasi dari Midtrans ke server — bukan hanya di sisi klien seperti pada simulasi ini.

### 8. Rencana SEO, Keamanan, dan Pemeliharaan

**SEO:**
- Judul dan meta description halaman memuat kata kunci relevan ("perlengkapan olahraga", "sepatu lari", dll.).
- Struktur heading (`h1`–`h3`) mengikuti hierarki konten, bukan sekadar gaya visual.
- Nama file gambar dan atribut `alt` deskriptif agar terindeks pencarian gambar.
- Ke depannya: sitemap.xml, structured data (schema.org Product), dan URL per kategori/produk saat backend tersedia.

**Keamanan:**
- Validasi input dilakukan di sisi klien (demo) dan **wajib divalidasi ulang di server** pada implementasi nyata.
- Data pembayaran tidak boleh disimpan di frontend/localStorage — pada produksi, seluruh proses sensitif ditangani payment gateway (PCI-DSS compliant) seperti Midtrans/Xendit.
- Transaksi produksi wajib menggunakan HTTPS dan verifikasi webhook bertanda tangan (signature) dari payment gateway.

**Pemeliharaan:**
- Data produk terpusat di satu array (`app.js`) agar mudah diperbarui tanpa menyentuh HTML.
- Perubahan visual terpusat lewat CSS custom properties (`:root`) di `style.css`, memudahkan konsistensi saat rebranding.

### 9. Rencana Penggunaan Data Analytics untuk Pengambilan Keputusan

Situs ini menyertakan snippet Google Analytics (`gtag.js`) dengan Measurement ID placeholder (`G-XXXXXXXXXX`) beserta 4 event kustom yang dikirim dari `app.js`:

| Event | Terpicu Saat | Insight Bisnis |
|---|---|---|
| `view_item` | Produk dibuka di modal detail | Produk mana yang paling menarik minat, meski belum tentu dibeli |
| `add_to_cart` | Produk ditambahkan ke keranjang | Mengukur minat beli awal per produk/kategori |
| `begin_checkout` | Form checkout dibuka | Mendeteksi titik mulai proses pembelian |
| `purchase` | Simulasi pembayaran berhasil | Konversi akhir, nilai transaksi, metode pembayaran favorit |

Dari kombinasi event tersebut, metrik utama yang akan dipantau:

- **Bounce rate** — apakah pengunjung langsung pergi tanpa membuka satu pun produk.
- **Conversion rate** — rasio `purchase` dibanding total sesi, serta rasio `add_to_cart` ke `purchase` (funnel drop-off).
- **Produk terlaris** — dari frekuensi `add_to_cart` dan `purchase` per `item_id`.
- **Metode pembayaran favorit** — dari parameter `payment_method` pada event `purchase`, untuk menentukan kanal mana yang perlu diprioritaskan atau diberi promo tambahan.

Data ini digunakan untuk mengambil keputusan bisnis seperti: produk mana yang perlu distok lebih banyak, kategori mana yang perlu promosi tambahan, dan apakah proses checkout perlu disederhanakan lagi jika drop-off tinggi di tahap `begin_checkout`.

---

*Dokumen ini disusun sebagai bagian dari tugas mata kuliah dan dapat disesuaikan lebih lanjut sesuai instruksi dosen.*
