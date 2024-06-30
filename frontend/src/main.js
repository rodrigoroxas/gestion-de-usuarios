import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import router from './router'; // Importa el router configurado
import apiClient from './axios'; // Importa la configuración de Axios

const app = createApp(App);

// Agrega Axios al prototipo de Vue para que esté disponible en todos los componentes
app.config.globalProperties.$axios = apiClient;

app.use(router);

app.mount('#app');
