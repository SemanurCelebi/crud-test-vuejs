import { createRouter, createWebHistory } from 'vue-router';
import CustomerAdd from '../components/CustomerAdd.vue'
import CustomerList from '../components/CustomerList.vue'

const routes = [
  {
    path: '/',
    name: 'CustomerAdd',
    component: CustomerAdd,
  },
  {
    path: '/customerList',
    name: 'CustomerList',
    component: CustomerList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;