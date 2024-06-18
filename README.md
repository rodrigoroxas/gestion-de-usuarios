# Sistema de Gestión de Usuarios

## Descripción General
El objetivo de este proyecto es evaluar las habilidades técnicas de los candidatos en el desarrollo de aplicaciones web mediante la creación de un sistema de gestión de usuarios. El sistema debe permitir a los usuarios registrarse, iniciar sesión, y gestionar una lista de usuarios con funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar). El proyecto debe seguir buenas prácticas de desarrollo, incluyendo la seguridad de las contraseñas, manejo de errores y diseño estructurado.

## Requisitos Técnicos
1. **Tecnologías:**
   - Backend: Laravel como API REST (sin usar Laravel Auth)
   - Frontend: Vue.js con Vite

2. **Autenticación y Autorización:**
   - Implementar un sistema de registro y login.
   - El login debe incluir buenas prácticas de seguridad y manejo de errores.
   - Las contraseñas deben ser seguras y deben mostrar mensajes informativos sobre los requisitos de seguridad (ej. incluir mayúsculas, números, caracteres especiales).
   - Implementar el manejo de tokens de autenticación siguiendo buenas prácticas (ej. JWT).

3. **CRUD de Usuarios:**
   - Implementar un menú que permita listar, crear, leer, actualizar y eliminar usuarios.
   - Asegurarse de que se siguen buenas prácticas al manejar la información sensible, como contraseñas.

4. **Buenas Prácticas:**
   - Usar un patrón de diseño (ej. MVC, MVVM).
   - Implementar control de errores apropiado con mensajes claros y códigos de estado HTTP adecuados.
   - Incluir validaciones de parámetros tanto en el frontend como en el backend.
   - Incluir documentación en el código donde sea necesario.

5. **Testing:**
   - Incluir tests unitarios tanto para el frontend como para el backend.
   - Usar Vitest para los tests unitarios del frontend.
   - Lograr al menos un 50% de cobertura de código.

6. **Dockerización:**
   - Proveer un archivo Dockerfile y un archivo docker-compose.yml para levantar el entorno de desarrollo.
   - Incluir instrucciones claras y probadas en el archivo README.md.

## Tareas a Realizar
1. **Configuración del Repositorio:**
   - Crear un repositorio en GitHub.
   - Crear una nueva rama con tu nombre para el desarrollo del proyecto.

2. **Desarrollo de la Aplicación:**
   - Implementar el sistema de registro y login.
   - Crear el menú de gestión de usuarios con las funcionalidades CRUD.
   - Asegurar que las contraseñas sean seguras y mostrar mensajes informativos al usuario.
   - Manejar adecuadamente los errores con mensajes y códigos HTTP.
   - Implementar el manejo de tokens de autenticación siguiendo buenas prácticas.
   - Aplicar un patrón de diseño adecuado.
   - Incluir validaciones de parámetros tanto en el frontend como en el backend.

3. **Testing:**
   - Escribir tests unitarios para el frontend y backend.
   - Usar Vitest para los tests unitarios del frontend.
   - Asegurarse de tener al menos un 50% de cobertura de código.

4. **Dockerización:**
   - Configurar los archivos Dockerfile y docker-compose.yml.
   - Incluir instrucciones detalladas en el archivo README.md sobre cómo levantar el proyecto.

5. **Documentación:**
   - Actualizar el README.md con todas las instrucciones necesarias para ejecutar y probar el proyecto.

## Criterios de Evaluación
1. **Funcionalidad:**
   - ¿El sistema de registro y login funciona correctamente?
   - ¿Las funcionalidades CRUD están implementadas correctamente?

2. **Seguridad:**
   - ¿Las contraseñas cumplen con los requisitos de seguridad?
   - ¿Se manejan los tokens de autenticación siguiendo buenas prácticas?
   - ¿Se manejan los errores adecuadamente con mensajes claros y códigos de estado HTTP?

3. **Buenas Prácticas:**
   - ¿Se sigue un patrón de diseño adecuado?
   - ¿Se realizan validaciones de parámetros en el frontend y backend?
   - ¿El código está documentado y es fácil de entender?

4. **Testing:**
   - ¿Los tests cubren al menos el 50% del código?
   - ¿Los tests son significativos y validan correctamente las funcionalidades?

5. **Dockerización y Documentación:**
   - ¿El proyecto se puede levantar fácilmente con Docker?
   - ¿Las instrucciones en el README.md son claras y completas?

## Entrega
- **Fecha límite:** [Fecha límite]
- **Repositorio:** [Enlace al repositorio]
- **Instrucciones de entrega:** Realiza un pull request a la rama principal con tu rama de desarrollo.
