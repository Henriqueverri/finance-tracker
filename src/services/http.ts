import { useAuthStore } from '@/modules/auth/store/authStore'
import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://localhost:3000', // vamos usar fake API
})

http.interceptors.request.use((config) => {
  const auth = useAuthStore()

  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }

  return config
})