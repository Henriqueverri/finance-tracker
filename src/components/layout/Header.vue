<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isOpen = ref(false)

const getTitle = () => {
  switch (route.path) {
    case '/':
      return 'Dashboard'
    case '/transactions':
      return 'Transactions'
    default:
      return 'Finance Tracker'
  }
}

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <header class="h-16 border-b flex items-center justify-between px-6 bg-white">
    <!-- Left -->
    <h1 class="text-lg font-semibold">
      {{ getTitle() }}
    </h1>

    <!-- Right -->
    <div class="relative">
      <button
        @click="toggleMenu"
        class="flex items-center gap-2 focus:outline-none"
      >
        <div class="w-8 h-8 rounded-full bg-gray-300" />
        <span class="text-sm font-medium">Henrique</span>
      </button>

      <!-- Dropdown -->
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md"
      >
        <button class="w-full text-left px-4 py-2 hover:bg-gray-100">
          Profile
        </button>
        <button class="w-full text-left px-4 py-2 hover:bg-gray-100">
          Logout
        </button>
      </div>
    </div>
  </header>
</template>