<script setup>
import Sidebar from '@/components/layout/Sidebar.vue'
</script>

<template>
  <div class="flex h-screen">
    <Sidebar />

    <div class="flex flex-1 flex-col">
      <header class="h-16 border-b flex items-center px-6">
        Header
      </header>

      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>