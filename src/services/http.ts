import axios from 'axios'
import { useAuthStore } from '@/modules/auth/store/authStore'
import { handleError } from './errorHandler'

export const http = axios.create({
  baseURL: 'http://localhost:3000',
})

/**
 * REQUEST INTERCEPTOR
 */
http.interceptors.request.use((config) => {
  const auth = useAuthStore()

  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }

  return config
})

/**
 * RESPONSE INTERCEPTOR
 */
http.interceptors.response.use(
  (response) => response,
  (error) => {
    const auth = useAuthStore()

    // 🔐 auto logout se token inválido
    if (error.response?.status === 401) {
      auth.logout()
      window.location.href = '/login'
    }

    const message = handleError(error)

    return Promise.reject({
      original: error,
      message,
    })
  }
)