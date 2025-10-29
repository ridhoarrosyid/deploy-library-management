FROM richarvey/nginx-php-fpm:latest

WORKDIR /var/www/html
COPY . .

# 1. Install dependensi PHP (Backend)
# Kita sudah tidak butuh "npm install" atau "npm run build" di sini
RUN composer install --no-dev --optimize-autoloader --no-interaction

# 2. Perbaiki Izin Folder
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# --- Sisanya tetap sama ---
ENV SKIP_COMPOSER 1
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1
ENV APP_ENV production
ENV APP_DEBUG false
ENV LOG_CHANNEL stderr
ENV COMPOSER_ALLOW_SUPERUSER 1

CMD ["/start.sh"]