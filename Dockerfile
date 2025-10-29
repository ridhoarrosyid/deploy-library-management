# Gunakan base image
FROM richarvey/nginx-php-fpm:latest

# Set direktori kerja
WORKDIR /var/www/html

# Salin semua file proyek
COPY . .

# 1. Install dependensi PHP (Backend)
RUN composer install --no-dev --optimize-autoloader --no-interaction

# 2. Install dependensi Node.js & Build Aset (Frontend)
# INI ADALAH TAMBAHAN BARU UNTUK MEMPERBAIKI ERROR VITE
RUN npm install
RUN npm run build

# 3. Perbaiki Izin Folder
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Image config
ENV SKIP_COMPOSER 1
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1

# Laravel config
ENV APP_ENV production
ENV APP_DEBUG false
ENV LOG_CHANNEL stderr
ENV COMPOSER_ALLOW_SUPERUSER 1

# Perintah start
CMD ["/start.sh"]