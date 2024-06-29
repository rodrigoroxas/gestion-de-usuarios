<template>
    <div class="login-container">
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="login">
        <input v-model="email" placeholder="Correo Electrónico" required />
        <input v-model="password" type="password" placeholder="Contraseña" required />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../axios';

export default {
  setup(props, { emit }) {
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const error = ref(null);

    const login = async () => {
      try {
        const response = await axios.post('/login', {
          email: email.value,
          password: password.value,
        });
        localStorage.setItem('token', response.data.token);
        emit('auth-changed'); // Emitir evento
        router.push('/users');
      } catch (err) {
        error.value = 'Error al iniciar sesión: ' + (err.response?.data?.message || err.message);
      }
    };

    return {
      email,
      password,
      error,
      login,
    };
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}
button {
  width: 100%;
  padding: 10px;
}
.error {
  color: red;
}
</style>