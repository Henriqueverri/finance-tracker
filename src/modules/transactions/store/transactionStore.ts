import { defineStore } from 'pinia'
import { transactionService } from '../services/transactionService'
import type { Transaction } from '../types/transaction'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [] as Transaction[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchAll() {
      try {
        this.loading = true
        this.error = null

        this.transactions = await transactionService.getAll()
      } catch {
        this.error = 'Failed to load transactions'
      } finally {
        this.loading = false
      }
    },

    async create(transaction: Transaction) {
      await transactionService.create(transaction)
      await this.fetchAll()
    },

    async remove(id: string) {
      await transactionService.delete(id)
      await this.fetchAll()
    },

    async update(transaction: Transaction) {
      await transactionService.update(transaction)
      await this.fetchAll()
    },
  },
})