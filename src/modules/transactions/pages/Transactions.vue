<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTransactionStore } from '@/modules/transactions/store/transactionStore'
import TransactionForm from '../features/TransactionForm.vue'
import type { Transaction } from '@/modules/transactions/types/transaction'
import { useCategoryStore } from '@/modules/categories/store/categoryStore'

const store = useTransactionStore()
const categoryStore = useCategoryStore()

const editing = ref<Transaction | null>(null)

onMounted(() => {
  store.fetchAll()
  categoryStore.fetchAll()
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

const handleTypeChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  store.setTypeFilter(target.value as any)
}

const handleSearch = (event: Event) => {
  const target = event.target as HTMLInputElement
  store.setSearchFilter(target.value)
}

const handleCategoryChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  store.setCategoryFilter(target.value)
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

    <div class="flex gap-2 mb-4">
      <select
        @change="handleTypeChange"
        class="border p-2"
      >
        <option value="">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        @change="handleCategoryChange"
        class="border p-2"
      >
        <option value="">All categories</option>

        <option
          v-for="c in categoryStore.categories"
          :key="c.id"
          :value="c.name"
        >
          {{ c.name }}
        </option>
      </select>

      <input
        type="text"
        placeholder="Search..."
        @input="handleSearch"
        class="border p-2 flex-1"
      />
    </div>

    <ul class="space-y-2 mt-6">
      <li
        v-for="t in store.filteredTransactions"
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