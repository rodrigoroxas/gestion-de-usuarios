# Dockerfile

FROM php:8.2-fpm

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libonig-dev \
    libxml2-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd

# Instalar extensiones de PHP
RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configurar el directorio de trabajo
WORKDIR /var/www

# Copiar archivos de la aplicación
COPY . /var/www

# Instalar dependencias de Composer
RUN composer install --no-dev --optimize-autoloader

# Copiar configuración de PHP
COPY docker/php/php.ini /usr/local/etc/php/

# Establecer permisos correctos
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Cambiar usuario a wwww
USER www-data

#Expone el puerto y inicializa php-fpm server
EXPOSE 9000
CMD ["php-fpm"]