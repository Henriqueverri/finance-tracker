<script setup>
import Sidebar from '@/components/layout/Sidebar.vue'
import Header from '@/components/layout/Header.vue'
</script>

<template>
  <div class="flex h-screen">
    <Sidebar />

    <div class="flex flex-1 flex-col">
      <Header />

      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>