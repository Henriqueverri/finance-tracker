import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/pages/Dashboard.vue'
import Transactions from '../modules/transactions/pages/Transactions.vue'
import { useAuthStore } from '@/modules/auth/store/authStore'
import Login from '@/modules/auth/pages/Login.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/', component: Dashboard },
  { path: '/transactions', component: Transactions },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  const isProtected = to.path !== '/login'

  if (isProtected && !auth.token) {
    return '/login'
  }
})