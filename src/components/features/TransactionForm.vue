<script setup lang="ts">
import { ref } from 'vue'
import type { Transaction, TransactionType } from '@/types/transaction'

const emit = defineEmits<{
  (e: 'submit', value: Omit<Transaction, 'id' | 'date'>): void
}>()

const form = ref({
  title: '',
  amount: 0,
  type: 'expense' as TransactionType,
  category: '',
})

const handleSubmit = () => {
  emit('submit', form.value)
}
</script>

<template>
  <div class="space-y-2">
    <input v-model="form.title" placeholder="Title" class="border p-2 w-full" />
    <input v-model.number="form.amount" type="number" placeholder="Amount" class="border p-2 w-full" />

    <select v-model="form.type" class="border p-2 w-full">
      <option value="income">Income</option>
      <option value="expense">Expense</option>
    </select>

    <input v-model="form.category" placeholder="Category" class="border p-2 w-full" />

    <button
      @click="handleSubmit"
      class="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Add Transaction
    </button>
  </div>
</template>