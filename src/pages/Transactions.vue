<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { transactionService } from '@/services/transactionService'
import type { Transaction } from '@/types/transaction'

const transactions = ref<Transaction[]>([])

const form = ref({
  title: '',
  amount: 0,
  type: 'expense',
  category: '',
})

const load = async () => {
  transactions.value = await transactionService.getAll()
}

onMounted(load)

const addTransaction = async () => {
  const newTransaction: Transaction = {
    id: crypto.randomUUID(),
    ...form.value,
    date: new Date().toISOString(),
  }

  await transactionService.create(newTransaction)
  await load()
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Transactions</h1>

    <!-- Form -->
    <div class="mb-6 space-y-2">
      <input v-model="form.title" placeholder="Title" class="border p-2 w-full" />
      <input v-model.number="form.amount" type="number" placeholder="Amount" class="border p-2 w-full" />

      <select v-model="form.type" class="border p-2 w-full">
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input v-model="form.category" placeholder="Category" class="border p-2 w-full" />

      <button
        @click="addTransaction"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </div>

    <!-- List -->
    <ul class="space-y-2">
      <li
        v-for="t in transactions"
        :key="t.id"
        class="p-4 border rounded"
      >
        {{ t.title }} - {{ t.amount }}
      </li>
    </ul>
  </div>
</template>