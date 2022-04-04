import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/style.scss';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import es from 'element-plus/es/locale/lang/es'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

createApp(App).use(router).use(ElementPlus, {locale: es}).use(VueSweetalert2).mount('#app')
