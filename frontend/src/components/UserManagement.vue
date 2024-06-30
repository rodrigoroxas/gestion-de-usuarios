<template>
  <div class="user-management-container p-4 bg-white shadow-md rounded-lg">
    <h1 class="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
    <button @click="showAddUserForm = true" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Añadir Usuario</button>
    <table class="min-w-full mt-4 bg-white shadow-md rounded-lg overflow-hidden">
      <thead class="bg-gray-200">
        <tr>
          <th class="p-4 text-left">ID</th>
          <th class="p-4 text-left">Nombre</th>
          <th class="p-4 text-left">Email</th>
          <th class="p-4 text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="border-t">
          <td class="p-4">{{ user.id }}</td>
          <td class="p-4">{{ user.name }}</td>
          <td class="p-4">{{ user.email }}</td>
          <td class="p-4">
            <button @click="editUser(user)" class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700">Editar</button>
            <button @click="deleteUser(user.id)" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showAddUserForm" class="mt-4">
      <h2 class="text-xl font-bold mb-2">Añadir Usuario</h2>
      <form @submit.prevent="addUser" class="space-y-4">
        <div>
          <input v-model="newUser.name" placeholder="Nombre" required class="w-full p-2 border rounded" />
          <span v-if="errors.newUser.name" class="text-red-500">{{ errors.newUser.name }}</span>
        </div>
        <div>
          <input v-model="newUser.email" placeholder="Correo Electrónico" required class="w-full p-2 border rounded" />
          <span v-if="errors.newUser.email" class="text-red-500">{{ errors.newUser.email }}</span>
        </div>
        <div>
          <input v-model="newUser.password" type="password" placeholder="Contraseña" required class="w-full p-2 border rounded" />
          <span v-if="errors.newUser.password" class="text-red-500">{{ errors.newUser.password }}</span>
        </div>
        <div class="flex space-x-2">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Añadir</button>
          <button @click="showAddUserForm = false" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">Cancelar</button>
        </div>
      </form>
    </div>

    <div v-if="showEditUserForm" class="mt-4">
      <h2 class="text-xl font-bold mb-2">Editar Usuario</h2>
      <form @submit.prevent="updateUser" class="space-y-4">
        <div>
          <input v-model="currentUser.name" placeholder="Nombre" required class="w-full p-2 border rounded" />
          <span v-if="errors.currentUser.name" class="text-red-500">{{ errors.currentUser.name }}</span>
        </div>
        <div>
          <input v-model="currentUser.email" placeholder="Correo Electrónico" required class="w-full p-2 border rounded" />
          <span v-if="errors.currentUser.email" class="text-red-500">{{ errors.currentUser.email }}</span>
        </div>
        <div>
          <input v-model="currentUser.password" type="password" placeholder="Nueva Contraseña" class="w-full p-2 border rounded" />
          <span v-if="errors.currentUser.password" class="text-red-500">{{ errors.currentUser.password }}</span>
        </div>
        <div class="flex space-x-2">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Actualizar</button>
          <button @click="showEditUserForm = false" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">Cancelar</button>
        </div>
      </form>
    </div>

    <p v-if="message" class="message text-green-500">{{ message }}</p>
    <p v-if="error" class="error text-red-500">{{ error }}</p>
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
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
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
        const response = await apiClient.post('/users', {
          name: this.newUser.name,
          email: this.newUser.email,
          password: this.newUser.password
        });
        this.showAddUserForm = false;
        this.newUser = { name: '', email: '', password: '' };
        this.message = 'El usuario fue agregado satisfactoriamente.';
        this.fetchUsers();
      } catch (error) {
        console.error('Error al añadir el usuario:', error);
        if (error.response && error.response.data && error.response.data.errors) {
          this.errors.newUser = error.response.data.errors;
        } else if (error.response && error.response.data) {
          this.error = 'Error al añadir el usuario: ' + error.response.data.message;
        } else {
          this.error = 'Error al añadir el usuario: ' + error.message;
        }
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
        password: this.currentUser.password || undefined, // Send password only if it's provided
      };

      try {
        const response = await apiClient.put(`/users/${this.currentUser.id}`, userData);
        this.showEditUserForm = false;
        this.currentUser = {};
        this.message = 'El usuario fue actualizado satisfactoriamente.';
        this.fetchUsers();
      } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        if (error.response && error.response.data && error.response.data.errors) {
          this.errors.currentUser = error.response.data.errors;
        } else if (error.response && error.response.data) {
          this.error = 'Error al actualizar el usuario: ' + error.response.data.message;
        } else {
          this.error = 'Error al actualizar el usuario: ' + error.message;
        }
      }
    },
    async deleteUser(id) {
      this.message = null;
      this.error = null;
      try {
        const response = await apiClient.delete(`/users/${id}`);
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
  margin-top: 20px;
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
