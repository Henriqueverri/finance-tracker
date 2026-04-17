<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/modules/auth/store/authStore'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')

const auth = useAuthStore()
const router = useRouter()

const handleLogin = () => {
  auth.login(email.value, password.value)
  router.push('/')
}
</script>

<template>
  <div class="flex h-screen items-center justify-center">
    <div class="w-80 space-y-4">
      <input v-model="email" placeholder="Email" class="border p-2 w-full" />
      <input v-model="password" type="password" placeholder="Password" class="border p-2 w-full" />

      <button
        @click="handleLogin"
        class="bg-blue-500 text-white w-full py-2 rounded"
      >
        Login
      </button>
    </div>
  </div>
</template>