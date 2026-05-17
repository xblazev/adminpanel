# Planning Pengembangan Dashboard dan Halaman Equipment

## Tujuan
Melanjutkan pengembangan admin dashboard dengan menambahkan identitas pengguna yang sedang login pada area dashboard serta membuat halaman baru bernama **Equipment** untuk menampilkan dan mengelola data equipment.

## Ruang Lingkup Utama
- Menampilkan profile picture dan username pengguna yang sedang login pada dashboard menggunakan data dummy.
- Menambahkan halaman baru **Equipment** ke dalam navigasi aplikasi.
- Menampilkan data equipment dalam bentuk data table.
- Menyediakan interaksi dasar untuk tambah, edit, dan hapus data equipment.
- Menampilkan feedback visual setelah aksi edit atau hapus berhasil dilakukan.

## Fitur yang Diharapkan
### 1. Informasi Pengguna di Dashboard
- Tampilkan avatar/profile picture pengguna.
- Tampilkan username pengguna yang sedang login.
- Gunakan data dummy terlebih dahulu karena belum ada integrasi backend nyata.
- Letakkan informasi pengguna di area yang mudah terlihat dan konsisten dengan layout dashboard.

### 2. Halaman Equipment
- Buat halaman baru bernama **Equipment**.
- Tambahkan menu navigasi menuju halaman tersebut.
- Tampilkan data equipment dalam data table yang rapi dan mudah dibaca.
- Gunakan struktur data berdasarkan response berikut:

```json
{
  "equipments": [
    {
      "equipment_id": "AD_ARM006",
      "created": 0,
      "mst_equipment_id": 3325982510,
      "favorite": 0,
      "elv": 0,
      "slv": 0,
      "potential": 0,
      "is_complete_auto_potential_composite": 0,
      "auto_potential_composite": 0,
      "awaked": 0,
      "is_awake": 0,
      "endAwakeCount": 0,
      "endAwakeRemain": 0,
      "end_remain": 0,
      "start_remain": 0,
      "evolve_start_time": 0,
      "_id": "69f99a6ab45de554ac10e906"
    }
  ]
}
```

- Buat juga data dummy dalam jumlah cukup banyak agar tabel terlihat terisi dan mudah diuji secara visual.
- Kolom tabel sebaiknya mengikuti field utama dari struktur data tersebut, dengan tampilan yang tetap nyaman dibaca.

### 3. Aksi Data Equipment
- Sediakan tombol **Tambah**, **Edit**, dan **Hapus**.
- Tombol **Tambah** digunakan untuk menambahkan data equipment baru.
- Saat tombol **Edit** ditekan:
  - Tampilkan modal dengan efek dropdown.
  - Modal berisi form yang memuat data sesuai baris yang dipilih.
  - Pengguna dapat mengubah nilai lalu menyimpan perubahan.
- Saat tombol **Hapus** ditekan:
  - Tampilkan modal konfirmasi sebelum data benar-benar dihapus.
- Setelah proses edit atau hapus berhasil:
  - Tampilkan toast notification sebagai konfirmasi tindakan berhasil.

## Arah Desain
- Pertahankan gaya visual dashboard yang sudah ada.
- Pastikan halaman Equipment tetap konsisten dengan komponen Vuetify yang digunakan di aplikasi.
- Prioritaskan keterbacaan tabel, kejelasan aksi, dan alur interaksi yang mudah dipahami.
- Modal dan toast notification perlu terasa halus, ringkas, dan tidak mengganggu fokus pengguna.

## Batasan
- Tidak perlu terhubung ke backend nyata pada tahap ini.
- Semua data equipment dapat menggunakan dummy data lokal terlebih dahulu.
- Fokus utama adalah tampilan, alur interaksi, dan kesiapan struktur untuk pengembangan lanjutan.

## Hasil Akhir yang Diharapkan
- Dashboard menampilkan avatar dan username pengguna login.
- Halaman Equipment tersedia dan dapat diakses dari navigasi utama.
- Data table equipment menampilkan banyak data dummy berdasarkan struktur response yang diberikan.
- Pengguna dapat membuka form edit dalam modal dropdown, menghapus data lewat modal konfirmasi, dan menerima toast notification setelah aksi berhasil.
- Struktur implementasi tetap cukup rapi agar mudah diteruskan oleh developer berikutnya.

## Kriteria Selesai
- Profile picture dan username tampil di dashboard.
- Halaman Equipment berhasil dibuat dan terhubung ke routing aplikasi.
- Data table menampilkan field equipment yang relevan beserta beberapa data dummy.
- Tombol Tambah, Edit, dan Hapus tersedia.
- Modal edit dengan form berfungsi.
- Modal konfirmasi hapus berfungsi.
- Toast notification muncul setelah edit atau hapus berhasil.
- Tampilan tetap responsif dan konsisten dengan desain dashboard yang sudah ada.

## Urutan Pengerjaan yang Disarankan
1. Tambahkan informasi user dummy ke layout dashboard.
2. Tambahkan route dan menu navigasi menuju halaman Equipment.
3. Siapkan dummy data equipment berdasarkan struktur response yang diberikan.
4. Bangun data table untuk menampilkan daftar equipment.
5. Tambahkan aksi tambah, edit, dan hapus.
6. Tambahkan modal edit, modal konfirmasi hapus, dan toast notification.
7. Rapikan tampilan serta uji alur penggunaan utama.
