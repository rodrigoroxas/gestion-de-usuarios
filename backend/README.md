<p align="center"><img src="https://www.ianlewis.org/assets/images/docker/large_v-trans.png" width="400" alt="Dockers Logo"></a></p>


# Proyecto Laravel con Docker

Este proyecto es una aplicación full-stack que utiliza Laravel para el backend, Vue.js para el frontend, Nginx como servidor web, y Docker para la configuración y gestión del entorno de desarrollo. La autenticación y autorización en el proyecto se manejan mediante JSON Web Tokens (JWT).

## Descripción del Proyecto

Este proyecto es un sistema de gestión de usuarios que incluye las siguientes funcionalidades:
- Formulario de registro de usuarios.
- Formulario de login.
- Vista para listar los usuarios.
- Funcionalidades para añadir, editar y borrar usuarios existentes.

## Requisitos previos

- Docker
- Docker Compose

## Configuración inicial

Sigue los siguientes pasos para configurar y levantar el entorno de desarrollo:

### Paso 1: Construir los contenedores

docker-compose build

### Paso 2: Levantar los contenedores en segundo plano

docker-compose up -d

### Paso 3: Ejecutar las migraciones

docker-compose exec backend php artisan migrate

### Paso 4: Ejecutar las migraciones y los seeders

docker-compose exec backend php artisan migrate --seed

### Paso 5: Iniciar sesión

Para iniciar sesión, utiliza el usuario previamente cargado con el seeder:

- Usuario: admin@lebox.com
- Contraseña: Pass1234

