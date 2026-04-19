<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const menu = [
  { name: 'Dashboard', path: '/' },
  { name: 'Transactions', path: '/transactions' },
  { name: 'Categories', path: '/categories' },
]

const isActive = (path: string) => route.path === path

const navigate = (path: string) => {
  router.push(path)
}
</script>

<template>
  <aside class="w-64 bg-gray-900 text-white flex flex-col">
    <div class="p-4 text-lg font-bold border-b border-gray-800">
      Finance
    </div>

    <nav class="flex-1 p-2 space-y-1">
      <button
        v-for="item in menu"
        :key="item.path"
        @click="navigate(item.path)"
        class="w-full text-left px-4 py-2 rounded transition"
        :class="isActive(item.path)
          ? 'bg-gray-800'
          : 'hover:bg-gray-800/50'"
      >
        {{ item.name }}
      </button>
    </nav>
  </aside>
</template>