<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-4">Iniciar Sesión</h1>
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <input v-model="email" type="email" placeholder="Correo Electrónico" required
            class="w-full p-2 border rounded" />
        </div>
        <div>
          <input v-model="password" type="password" placeholder="Contraseña" required
            class="w-full p-2 border rounded" />
        </div>
        <div>
          <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Iniciar
            Sesión</button>
        </div>
      </form>
      <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
    </div>
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
        error.value = 'Error al iniciar sesión: ' +
          (err.response?.data?.message
            ? err.response.data.message
            : (err.response?.status === 400
              ? 'Por favor verifica tus credenciales, error 400'
              : err.message));
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

<style scoped></style>
