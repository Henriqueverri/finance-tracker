<script setup lang="ts">
import { onMounted } from 'vue'
import { useTransactionStore } from '@/modules/transactions/store/transactionStore'
import { formatCurrency } from '@/utils/format'
import TransactionChart from '@/modules/transactions/components/TransactionChart.vue'

const store = useTransactionStore()

onMounted(() => {
  if (!store.transactions.length) {
    store.fetchAll()
  }
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>

    <div v-if="!store.transactions.length" class="text-gray-500">
      No data to display yet
    </div>
    
    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <!-- Income -->
        <div class="p-4 bg-green-100 rounded">
          <p class="text-sm text-gray-600">Income</p>
          <p class="text-xl font-bold text-green-700">
            {{ formatCurrency(store.totalIncome) }}
          </p>
        </div>
  
        <!-- Expense -->
        <div class="p-4 bg-red-100 rounded">
          <p class="text-sm text-gray-600">Expense</p>
          <p class="text-xl font-bold text-red-700">
            {{ formatCurrency(store.totalExpense) }}
          </p>
        </div>
  
        <!-- Balance -->
        <div class="p-4 bg-blue-100 rounded">
          <p class="text-sm text-gray-600">Balance</p>
          <p class="text-xl font-bold text-blue-700">
            {{ formatCurrency(store.balance) }}
          </p>
        </div>
  
      </div>
      <div class="mt-6">
        <TransactionChart />
      </div>
    </div>
  </div>
</template>