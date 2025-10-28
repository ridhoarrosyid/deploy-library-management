# Sistem Manajemen Perpustakaan (Library Management)

Aplikasi web untuk mengelola sumber daya perpustakaan, dibangun menggunakan Laravel, React (dengan Inertia.js), dan Tailwind CSS.

## Tentang Proyek

Proyek ini bertujuan untuk menyediakan platform digital bagi perpustakaan untuk mengelola koleksi buku, anggota, peminjaman, pengembalian, denda, dan pengumuman. Aplikasi ini memiliki antarmuka yang terpisah untuk admin/operator dan anggota perpustakaan.

## Fitur Utama

- Manajemen Buku (CRUD)
- Manajemen Kategori & Penerbit
- Manajemen Pengguna (Admin, Operator, Anggota)
- Manajemen Stok Buku
- Transaksi Peminjaman & Pengembalian Buku
- Manajemen & Pelaporan Denda
- Manajemen Pengumuman
- Statistik Peminjaman
- Manajemen Peran & Izin Akses (Roles & Permissions)
- Autentikasi & Manajemen Profil Pengguna

## Teknologi yang Digunakan

- **Backend:** Laravel 11
- **Frontend:** React.js, Inertia.js, Tailwind CSS
- **Database:** MySQL / MariaDB
- **Lainnya:** Composer, Node.js/NPM

## Prasyarat

Sebelum memulai, pastikan sistem Anda telah terinstal:

- PHP (>= 8.2 direkomendasikan)
- Composer
- Node.js & NPM
- Server Database (Contoh: MySQL atau MariaDB yang berjalan secara lokal, misal dari XAMPP/MAMP)

## Instalasi & Menjalankan di Lokal (Tanpa Docker)

Berikut adalah langkah-langkah untuk menginstal dan menjalankan proyek ini di lingkungan lokal Anda:

1.  **Clone Repository:**

    ```bash
    git clone [https://github.com/ridhoarrosyid/library-management.git](https://github.com/ridhoarrosyid/library-management.git)
    cd library-management
    ```

2.  **Install Dependensi PHP:**

    ```bash
    composer install
    ```

3.  **Install Dependensi JavaScript:**

    ```bash
    npm install
    ```

4.  **Salin File Environment:**

    ```bash
    cp .env.example .env
    ```

5.  **Generate Kunci Aplikasi:**

    ```bash
    php artisan key:generate
    ```

6.  **Konfigurasi Database di `.env`:**
    Buka file `.env` dan atur koneksi database Anda. Anda harus **membuat database baru** secara manual (misal: `library_management`) melalui tools seperti phpMyAdmin atau HeidiSQL.

    Sesuaikan baris berikut:

    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=library_management
    DB_USERNAME=root
    DB_PASSWORD=
    ```

    _(Sesuaikan `DB_USERNAME` dan `DB_PASSWORD` dengan pengaturan server database lokal Anda)._

7.  **Jalankan Migrasi Database:**
    Perintah ini akan membuat semua tabel yang diperlukan di database Anda.

    ```bash
    php artisan migrate
    ```

8.  **Jalankan Seeder Database (Opsional tapi direkomendasikan):**
    Untuk mengisi database dengan data awal (termasuk user admin, operator, member, kategori, dll.):

    ```bash
    php artisan db:seed
    ```

9.  **Jalankan Storage Link:**
    Untuk membuat file yang diupload (seperti cover buku) dapat diakses publik.

    ```bash
    php artisan storage:link
    ```

10. **Jalankan Vite Development Server:**
    Buka terminal **baru** (biarkan terminal sebelumnya tetap terbuka). Perintah ini akan mengkompilasi aset frontend (React/CSS) dan menjalankan _hot-reloading_.

    ```bash
    npm run dev
    ```

11. **Jalankan Server Laravel:**
    Kembali ke terminal **pertama** Anda. Perintah ini akan menjalankan server development PHP.

    ```bash
    php artisan serve
    ```

12. **Akses Aplikasi:**
    Buka browser Anda dan kunjungi alamat yang ditampilkan oleh `php artisan serve`, biasanya:
    `http://127.0.0.1:8000`

## Lisensi

Proyek ini dilisensikan di bawah [MIT license](https://opensource.org/licenses/MIT).
