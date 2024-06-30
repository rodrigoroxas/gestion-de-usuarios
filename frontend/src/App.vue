<template>
  <div>
    <header class="bg-gray-100 p-4 shadow">
      <nav>
        <ul class="flex space-x-4 justify-center">
          <li><router-link to="/" class="text-blue-500 hover:text-blue-700">Inicio</router-link></li>
          <li v-if="!isAuthenticated"><router-link to="/login" class="text-blue-500 hover:text-blue-700">Iniciar sesión</router-link></li>
          <li v-if="!isAuthenticated"><router-link to="/register" class="text-blue-500 hover:text-blue-700">Regístrate</router-link></li>
          <li v-if="isAuthenticated"><router-link to="/users" class="text-blue-500 hover:text-blue-700">Gestionar usuarios</router-link></li>
          <li v-if="isAuthenticated"><a href="#" @click.prevent="logout" class="text-blue-500 hover:text-blue-700">Cerrar sesión</a></li>
        </ul>
      </nav>
    </header>
    <router-view @auth-changed="checkAuthStatus"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from './axios';

const router = useRouter();
const isAuthenticated = ref(false);

const checkAuthStatus = () => {
  isAuthenticated.value = !!localStorage.getItem('token');
};

const logout = async () => {
  try {
    await axios.post('/logout');
    localStorage.removeItem('token');
    isAuthenticated.value = false;
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

onMounted(checkAuthStatus);
</script>

<style scoped>
header {
  background-color: #f8f9fa;
  padding: 1rem;
}
nav ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: center; /* Centra los elementos horizontalmente */
  gap: 1.5rem; /* Ajusta el espacio entre los elementos */
}
nav ul li {
  display: inline;
}
</style>
