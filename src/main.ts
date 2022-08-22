import { createApp } from 'vue';
import './style.css';
import router from './router';
import WujieVue from 'wujie-vue3';
import App from './App.vue';

const app = createApp(App);
app.use(WujieVue);
app.use(router);
app.mount('#app');
