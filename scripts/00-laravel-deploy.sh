#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

echo "Running Laravel deployment script..."

# Change directory to the application root
cd /var/www/html

# Run database migrations (Gunakan migrate atau migrate:fresh sesuai pilihan Anda)
echo "Running database migrations..."
php artisan migrate --force
php artisan db:seed --force
# Atau jika Anda tetap ingin menghapus data lama:
# php artisan migrate:fresh --force

# --- AWAL KONDISI SEEDER ---
echo "Checking if database seeding is required..."

# Jalankan perintah PHP singkat menggunakan tinker untuk mengecek data.
# Ganti '\App\Models\RouteAccess' dan 'name', 'admin.dashboard'
# dengan model dan kondisi yang paling sesuai dengan seeder Anda.
# Perintah ini akan exit dengan kode 0 jika data ADA, dan 1 jika TIDAK ADA.
# php artisan tinker --execute='if (\App\Models\RouteAccess::where("name", "admin.dashboard")->exists()) { exit(0); } else { exit(1); }'

# Tangkap exit code dari perintah tinker di atas
# NEEDS_SEEDING=$?

# Periksa exit code. Jika BUKAN 0 (artinya data tidak ada), jalankan seeder.
# if [ $NEEDS_SEEDING -ne 0 ]; then
#     echo "Database appears empty or core data missing. Running seeder..."
    
# else
#     echo "Database already contains seeded data. Skipping seeder."
# fi
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