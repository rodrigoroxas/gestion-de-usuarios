<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md text-center">
      <h1 class="text-3xl font-bold mb-4">Bienvenido al Sistema de Gestión de Usuarios</h1>
      <p class="mb-6">Utiliza el menú de navegación para acceder a las funcionalidades del sistema.</p>
      <router-link to="/users" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Ir a Gestión de Usuarios</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
</style>