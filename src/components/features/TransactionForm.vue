<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Transaction, TransactionType } from '@/types/transaction'

const props = defineProps<{
  modelValue?: Transaction | null
}>()

const emit = defineEmits<{
  (e: 'submit', value: Omit<Transaction, 'id' | 'date'>): void
  (e: 'update', value: Transaction): void
}>()

const form = ref({
  title: '',
  amount: 0,
  type: 'expense' as TransactionType,
  category: '',
})

// quando entrar em modo edit
watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      form.value = {
        title: value.title,
        amount: value.amount,
        type: value.type,
        category: value.category,
      }
    }
  },
  { immediate: true }
)

const handleSubmit = () => {
  if (props.modelValue) {
    emit('update', {
      ...props.modelValue,
      ...form.value,
    })
  } else {
    emit('submit', form.value)
  }

  // reset
  form.value = {
    title: '',
    amount: 0,
    type: 'expense',
    category: '',
  }
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
      {{ modelValue ? 'Update' : 'Add' }}
    </button>
  </div>
</template>