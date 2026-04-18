import { defineStore } from 'pinia'
import { transactionService } from '../services/transactionService'
import type { Transaction } from '../types/transaction'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [] as Transaction[],
    loading: false,
    error: null as string | null,
    filters: {
      type: '' as 'income' | 'expense' | '',
      search: '',
    },
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

    setTypeFilter(type: 'income' | 'expense' | '') {
      this.filters.type = type
    },

    setSearchFilter(search: string) {
      this.filters.search = search
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

    filteredTransactions: (state) => {
      return state.transactions.filter((t) => {
        const matchesType =
          !state.filters.type || t.type === state.filters.type

        const matchesSearch =
          t.title.toLowerCase().includes(state.filters.search.toLowerCase())

        return matchesType && matchesSearch
      })
    },
  }
})