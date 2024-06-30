<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-4">Registrarse</h1>
      <form @submit.prevent="register" class="space-y-4">
        <div>
          <input v-model="name" placeholder="Nombre" required class="w-full p-2 border rounded" />
          <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
        </div>
        <div>
          <input v-model="email" placeholder="Correo Electrónico" required class="w-full p-2 border rounded" />
          <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
        </div>
        <div>
          <input v-model="password" type="password" placeholder="Contraseña" required class="w-full p-2 border rounded" />
          <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
        </div>
        <div>
          <input v-model="confirmPassword" type="password" placeholder="Confirmar Contraseña" required class="w-full p-2 border rounded" />
          <span v-if="errors.confirmPassword" class="text-red-500 text-sm">{{ errors.confirmPassword }}</span>
        </div>
        <div>
          <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Registrarse</button>
        </div>
      </form>
      <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
      <p v-if="success" class="text-green-500 mt-4">{{ success }}</p>
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
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const error = ref(null);
    const success = ref(null);
    const errors = ref({});

    const validateEmail = (email) => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    };

    const register = async () => {
      errors.value = {};
      error.value = null;
      success.value = null;

      if (!name.value) {
        errors.value.name = 'El nombre es requerido.';
      }
      if (!email.value) {
        errors.value.email = 'El correo electrónico es requerido.';
      } else if (!validateEmail(email.value)) {
        errors.value.email = 'El formato del correo electrónico es inválido.';
      }
      if (!password.value) {
        errors.value.password = 'La contraseña es requerida.';
      } else if (password.value.length < 8) {
        errors.value.password = 'La contraseña debe tener al menos 8 caracteres.';
      } else if (!/[a-z]/.test(password.value)) {
        errors.value.password = 'La contraseña debe contener al menos una letra minúscula.';
      } else if (!/[A-Z]/.test(password.value)) {
        errors.value.password = 'La contraseña debe contener al menos una letra mayúscula.';
      } else if (!/[0-9]/.test(password.value)) {
        errors.value.password = 'La contraseña debe contener al menos un número.';
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password.value)) {
        errors.value.password = 'La contraseña debe contener al menos un carácter especial.';
      }
      if (password.value !== confirmPassword.value) {
        errors.value.confirmPassword = 'Las contraseñas no coinciden.';
      }

      if (Object.keys(errors.value).length > 0) {
        return;
      }

      try {
        const response = await axios.post('/register', {
          name: name.value,
          email: email.value,
          password: password.value,
        });
        success.value = 'Usuario registrado correctamente.';
        setTimeout(() => {
          emit('auth-changed'); // Emitir evento
          router.push('/login'); // Redirigir al login después de 2 segundos
        }, 2000);
        name.value = '';
        email.value = '';
        password.value = '';
        confirmPassword.value = '';
        errors.value = {};
      } catch (err) {
        if (err.response && err.response.data) {
          error.value = 'Error al registrarse: ' + (err.response.data.message || 'Datos inválidos');
          errors.value = err.response.data.errors || {};
        } else {
          error.value = 'Error al registrarse: ' + err.message;
        }
      }
    };

    return {
      name,
      email,
      password,
      confirmPassword,
      error,
      success,
      errors,
      register,
    };
  },
};
</script>

<style scoped>
</style>
