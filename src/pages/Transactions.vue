<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { transactionService } from '@/services/transactionService'
import TransactionForm from '@/components/features/TransactionForm.vue'
import type { Transaction } from '@/types/transaction'

// state
const transactions = ref<Transaction[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const editing = ref<Transaction | null>(null)

// load data
const load = async () => {
  try {
    loading.value = true
    error.value = null

    transactions.value = await transactionService.getAll()
  } catch (e) {
    error.value = 'Failed to load transactions'
  } finally {
    loading.value = false
  }
}

onMounted(load)

// create
const addTransaction = async (data: Omit<Transaction, 'id' | 'date'>) => {
  try {
    loading.value = true

    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      ...data,
      date: new Date().toISOString(),
    }

    await transactionService.create(newTransaction)
    await load()
  } catch (e) {
    error.value = 'Failed to create transaction'
  } finally {
    loading.value = false
  }
}

// delete
const remove = async (id: string) => {
  try {
    loading.value = true

    await transactionService.delete(id)
    await load()
  } catch (e) {
    error.value = 'Failed to delete transaction'
  } finally {
    loading.value = false
  }
}

const startEdit = (transaction: Transaction) => {
  editing.value = transaction
}

const updateTransaction = async (updated: Transaction) => {
  try {
    loading.value = true

    await transactionService.update(updated)
    editing.value = null
    await load()
  } catch {
    error.value = 'Failed to update transaction'
  } finally {
    loading.value = false
  }
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

    <div v-if="loading" class="mt-4">Loading...</div>
    <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>

    <ul class="space-y-2 mt-6">
      <li
        v-for="t in transactions"
        :key="t.id"
        class="p-4 border rounded flex justify-between"
      >
        <span>{{ t.title }} - {{ t.amount }}</span>

        <div class="space-x-2">
          <button
            @click="startEdit(t)"
            class="text-blue-500"
          >
            Edit
          </button>
          <button
            @click="remove(t.id)"
            class="text-red-500"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>