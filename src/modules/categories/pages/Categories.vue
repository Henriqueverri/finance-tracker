<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCategoryStore } from '@/modules/categories/store/categoryStore'
import type { Category } from '@/modules/categories/types/category'

const store = useCategoryStore()

const name = ref('')

onMounted(() => {
  store.fetchAll()
})

const addCategory = async () => {
  if (!name.value.trim()) return

  const newCategory: Category = {
    id: crypto.randomUUID(),
    name: name.value,
  }

  await store.create(newCategory)
  name.value = ''
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Categories</h1>

    <!-- Form -->
    <div class="flex gap-2 mb-6">
      <input
        v-model="name"
        placeholder="New category"
        class="border p-2 flex-1"
      />

      <button
        @click="addCategory"
        class="bg-blue-500 text-white px-4 rounded"
      >
        Add
      </button>
    </div>

    <!-- Loading -->
    <div v-if="store.loading">Loading...</div>

    <!-- Error -->
    <div v-if="store.error" class="text-red-500">
      {{ store.error }}
    </div>

    <!-- List -->
    <ul class="space-y-2">
      <li
        v-for="c in store.categories"
        :key="c.id"
        class="p-3 border rounded"
      >
        {{ c.name }}
      </li>
    </ul>
  </div>
</template>