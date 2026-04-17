import { defineStore } from 'pinia'

interface User {
  name: string
  email: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
  }),

  actions: {
    login(email: string, password: string) {
      // fake login
      this.token = 'fake-jwt-token'
      this.user = {
        name: 'Henrique',
        email,
      }

      localStorage.setItem('token', this.token)
    },

    logout() {
      this.token = null
      this.user = null

      localStorage.removeItem('token')
    },

    loadFromStorage() {
      const token = localStorage.getItem('token')

      if (token) {
        this.token = token
        this.user = {
          name: 'Henrique',
          email: 'henrique@email.com',
        }
      }
    },
  },
})