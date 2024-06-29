<template>
    <div class="home-container">
      <h1>Bienvenido al Sistema de Gestión de Usuarios</h1>
      <p>Utiliza el menú de navegación para acceder a las funcionalidades del sistema.</p>
      <router-link to="/users">Ir a Gestión de Usuarios</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home',
  };
  </script>
  
  <style scoped>
  .home-container {
    max-width: 800px;
    margin: auto;
    text-align: center;
    padding: 20px;
  }
  </style>
  