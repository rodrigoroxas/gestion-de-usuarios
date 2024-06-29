import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue'; // Ruta relativa correcta
import Register from '../components/Register.vue'; // Ruta relativa correcta
import UserManagement from '../components/UserManagement.vue'; // Ruta relativa correcta
import Home from '../components/Home.vue'; // Ruta relativa correcta

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/users',
    name: 'UserManagement',
    component: UserManagement,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
