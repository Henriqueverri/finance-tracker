import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/pages/Dashboard.vue'
import Transactions from '@/pages/Transactions.vue'

const routes = [
  { path: '/', component: Dashboard },
  { path: '/transactions', component: Transactions },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})