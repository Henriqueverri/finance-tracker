<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { transactionService } from '@/services/transactionService'
import TransactionForm from '@/components/features/TransactionForm.vue'
import type { Transaction } from '@/types/transaction'

const transactions = ref<Transaction[]>([])

const load = async () => {
  transactions.value = await transactionService.getAll()
}

onMounted(load)

const addTransaction = async (data: Omit<Transaction, 'id' | 'date'>) => {
  const newTransaction: Transaction = {
    id: crypto.randomUUID(),
    ...data,
    date: new Date().toISOString(),
  }

  await transactionService.create(newTransaction)
  await load()
}
const remove = async (id: string) => {
  await transactionService.delete(id)
  await load()
}
const editing = ref<Transaction | null>(null)
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Transactions</h1>

    <TransactionForm @submit="addTransaction" />

    <ul class="space-y-2 mt-6">
      <li
        v-for="t in transactions"
        :key="t.id"
        class="p-4 border rounded flex justify-between"
      >
        <span>{{ t.title }} - {{ t.amount }}</span>
        <button
          @click="remove(t.id)"
          class="text-red-500"
        >
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>