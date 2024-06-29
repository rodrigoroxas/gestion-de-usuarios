<template>
  <div>
    <header>
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li v-if="!isAuthenticated"><router-link to="/login">Login</router-link></li>
          <li v-if="!isAuthenticated"><router-link to="/register">Register</router-link></li>
          <li v-if="isAuthenticated"><router-link to="/users">Pacientes</router-link></li>
          <li v-if="isAuthenticated"><a href="#" @click.prevent="logout">Logout</a></li>
        </ul>
      </nav>
    </header>
    <router-view @auth-changed="checkAuthStatus"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from './axios'; // Asegúrate de importar la configuración de axios

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
}
nav ul li {
  display: inline;
  margin-right: 1rem;
}
</style>