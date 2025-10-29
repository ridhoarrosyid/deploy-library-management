#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

echo "Running Laravel deployment script..."

# Change directory to the application root
cd /var/www/html

# Run database migrations (Gunakan migrate atau migrate:fresh sesuai pilihan Anda)
echo "Running database migrations..."
php artisan migrate:fresh --force # <-- Menghapus semua tabel dan migrasi ulang
php artisan db:seed --force      # <-- Menjalankan seeder setelah migrasi

# Atau jika Anda tetap ingin menghapus data lama:
# php artisan migrate:fresh --force

# --- AWAL KONDISI SEEDER ---
# Bagian ini sudah Anda komentari (tidak aktif)
echo "Checking if database seeding is required..."
# ... (kode pengecekan yang dikomentari) ...
# --- AKHIR KONDISI SEEDER ---

# Link storage directory
echo "Linking storage directory..."
php artisan storage:link

# Clear caches
echo "Clearing caches..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Laravel deployment script finished."