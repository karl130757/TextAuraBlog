import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { QuillEditor } from '@vueup/vue-quill';
import Vue3Toastify, { toast } from 'vue3-toastify';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import 'vue3-toastify/dist/index.css';
import App from './App.vue';
import router from './router';
import '../src/assets/style.css';

const app = createApp(App);

app.use(createPinia());
app.use(Vue3Toastify, { autoClose: 1000 });
app.component('QuillEditor', QuillEditor);
app.use(router);

app.mount('#app');
