import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Lista from '@/views/facturacion/Lista.vue'
import Registro from '@/views/Registro.vue'


const routes = [
  {
    path: '/',
    // component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
    component: Home
  },
  {
    path: '/lista_facturas',
    name: 'lista_facturas',
    component: Lista
    // component: () => import(/* webpackChunkName: "about" */ '../views/facturacion/Lista.vue')
  },
  {
    path: '/registro',
    component: Registro
    // component: () => import(/* webpackChunkName: "about" */ '../views/Registro.vue')
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
