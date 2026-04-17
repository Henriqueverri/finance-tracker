<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTransactionStore } from '@/modules/transactions/store/transactionStore'
import TransactionForm from '../features/TransactionForm.vue'
import type { Transaction } from '@/modules/transactions/types/transaction'

const store = useTransactionStore()

const editing = ref<Transaction | null>(null)

onMounted(() => {
  store.fetchAll()
})

const startEdit = (transaction: Transaction) => {
  editing.value = transaction
}

const addTransaction = async (data: Omit<Transaction, 'id' | 'date'>) => {
  const newTransaction: Transaction = {
    id: crypto.randomUUID(),
    ...data,
    date: new Date().toISOString(),
  }

  await store.create(newTransaction)
}

const updateTransaction = async (transaction: Transaction) => {
  await store.update(transaction)
  editing.value = null
}

const remove = async (id: string) => {
  await store.remove(id)
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Transactions</h1>

    <TransactionForm
      :modelValue="editing"
      @submit="addTransaction"
      @update="updateTransaction"
    />

    <div v-if="store.loading" class="mt-4">Loading...</div>
    <div v-if="store.error" class="text-red-500 mt-2">
      {{ store.error }}
    </div>

    <ul class="space-y-2 mt-6">
      <li
        v-for="t in store.transactions"
        :key="t.id"
        class="p-4 border rounded flex justify-between"
      >
        <span>{{ t.title }} - {{ t.amount }}</span>

        <div class="space-x-2">
          <button @click="startEdit(t)" class="text-blue-500">
            Edit
          </button>
          <button @click="remove(t.id)" class="text-red-500">
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>