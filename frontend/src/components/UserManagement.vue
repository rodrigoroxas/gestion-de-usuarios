<template>
  <div class="user-management-container">
    <h1>Gestión de Usuarios</h1>
    <button @click="showAddUserForm = true">Añadir Usuario</button>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="editUser(user)">Editar</button>
            <button @click="deleteUser(user.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showAddUserForm">
      <h2>Añadir Usuario</h2>
      <form @submit.prevent="addUser">
        <input v-model="newUser.name" placeholder="Nombre" required />
        <span v-if="errors.newUser.name" class="error">{{ errors.newUser.name }}</span>
        <input v-model="newUser.email" placeholder="Correo Electrónico" required />
        <span v-if="errors.newUser.email" class="error">{{ errors.newUser.email }}</span>
        <input v-model="newUser.password" type="password" placeholder="Contraseña" required />
        <span v-if="errors.newUser.password" class="error">{{ errors.newUser.password }}</span>
        <button type="submit">Añadir</button>
        <button @click="showAddUserForm = false">Cancelar</button>
      </form>
    </div>

    <div v-if="showEditUserForm">
      <h2>Editar Usuario</h2>
      <form @submit.prevent="updateUser">
        <input v-model="currentUser.name" placeholder="Nombre" required />
        <span v-if="errors.currentUser.name" class="error">{{ errors.currentUser.name }}</span>
        <input v-model="currentUser.email" placeholder="Correo Electrónico" required />
        <span v-if="errors.currentUser.email" class="error">{{ errors.currentUser.email }}</span>
        <input v-model="currentUser.password" type="password" placeholder="Nueva Contraseña" />
        <span v-if="errors.currentUser.password" class="error">{{ errors.currentUser.password }}</span>
        <button type="submit">Actualizar</button>
        <button @click="showEditUserForm = false">Cancelar</button>
      </form>
    </div>

    <p v-if="message" class="message">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import apiClient from '../axios';

export default {
  data() {
    return {
      users: [],
      showAddUserForm: false,
      showEditUserForm: false,
      newUser: {
        name: '',
        email: '',
        password: ''
      },
      currentUser: {},
      message: null,
      error: null,
      errors: {
        newUser: {},
        currentUser: {}
      }
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await apiClient.get('/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        this.error = 'Error al obtener los usuarios.';
      }
    },
    validateEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    },
    validatePassword(password) {
      const minLength = 8;
      const hasLowerCase = /[a-z]/.test(password);
      const hasUpperCase = /[A-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecialChar = /[!@#$%^&*().,?":{}|<>]/.test(password);
      return password.length >= minLength && hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar;
    },
    async addUser() {
      this.message = null;
      this.error = null;
      this.errors.newUser = {};

      if (!this.validateEmail(this.newUser.email)) {
        this.errors.newUser.email = 'El formato del correo electrónico es inválido.';
        return;
      }
      if (!this.validatePassword(this.newUser.password)) {
        this.errors.newUser.password = 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra minúscula, una letra mayúscula, un número y un carácter especial.';
        return;
      }

      try {
        await apiClient.post('/users', this.newUser);
        this.showAddUserForm = false;
        this.newUser = { name: '', email: '', password: '' };
        this.message = 'El usuario fue agregado satisfactoriamente.';
        this.fetchUsers();
      } catch (error) {
        console.error('Error al añadir el usuario:', error);
        this.error = 'Error al añadir el usuario.';
      }
    },
    editUser(user) {
      this.currentUser = { ...user, password: '' }; // Clear password field
      this.showEditUserForm = true;
    },
    async updateUser() {
      this.message = null;
      this.error = null;
      this.errors.currentUser = {};

      if (!this.validateEmail(this.currentUser.email)) {
        this.errors.currentUser.email = 'El formato del correo electrónico es inválido.';
        return;
      }
      if (this.currentUser.password && !this.validatePassword(this.currentUser.password)) {
        this.errors.currentUser.password = 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra minúscula, una letra mayúscula, un número y un carácter especial.';
        return;
      }

      const userData = {
        name: this.currentUser.name,
        email: this.currentUser.email,
        password: this.currentUser.password || undefined, 
      };

      try {
        await apiClient.put(`/users/${this.currentUser.id}`, userData);
        this.showEditUserForm = false;
        this.currentUser = {};
        this.message = 'El usuario fue actualizado satisfactoriamente.';
        this.fetchUsers();
      } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        this.error = 'Error al actualizar el usuario.';
      }
    },
    async deleteUser(id) {
      this.message = null;
      this.error = null;
      try {
        await apiClient.delete(`/users/${id}`);
        this.message = 'El usuario se eliminó satisfactoriamente.';
        this.fetchUsers();
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        this.error = 'Error al eliminar el usuario.';
      }
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
.user-management-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}
button {
  margin-right: 5px;
}
.message {
  color: green;
}
.error {
  color: red;
}
span.error {
  color: red;
  font-size: 12px;
}
</style>
