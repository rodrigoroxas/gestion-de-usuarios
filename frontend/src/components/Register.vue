<template>
  <div class="register-container">
    <h1>Registrarse</h1>
    <form @submit.prevent="register">
      <input v-model="name" placeholder="Nombre" required />
      <span v-if="errors.name">{{ errors.name }}</span>

      <input v-model="email" placeholder="Correo Electrónico" required />
      <span v-if="errors.email">{{ errors.email }}</span>

      <input v-model="password" type="password" placeholder="Contraseña" required />
      <span v-if="errors.password">{{ errors.password }}</span>

      <input v-model="confirmPassword" type="password" placeholder="Confirmar Contraseña" required />
      <span v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>

      <button type="submit">Registrarse</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">{{ success }}</p>
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
.register-container {
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
.success {
  color: green;
}
span {
  color: red;
  font-size: 12px;
}
</style>