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
      } catch (e: unknown) {
        this.error = (e as any).message
      } finally {
        this.loading = false
      }
    },

    async create(transaction: Transaction) {
      try {
        this.loading = true
        this.error = null

        const created = await transactionService.create(transaction)

        this.transactions.push(created)
      } catch (e: unknown) {
        this.error = (e as any).message
      } finally {
        this.loading = false
      }
    },

    async remove(id: string) {
      try {
        this.loading = true
        this.error = null

        await transactionService.delete(id)

        this.transactions = this.transactions.filter(t => t.id !== id)
      } catch (e: unknown) {
        this.error = (e as any).message
      } finally {
        this.loading = false
      }
    },

    async update(transaction: Transaction) {
      try {
        this.loading = true
        this.error = null

        const updated = await transactionService.update(transaction)

        this.transactions = this.transactions.map(t =>
          t.id === updated.id ? updated : t
        )
      } catch (e: unknown) {
        this.error = (e as any).message
      } finally {
        this.loading = false
      }
    },
  },

  getters: {
    totalIncome: (state) =>
      state.transactions
        .filter(t => t.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0),

    totalExpense: (state) =>
      state.transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0),

    balance(): number {
      return this.totalIncome - this.totalExpense
    },
  }
})