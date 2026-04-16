import type { Transaction } from '@/types/transaction'

let transactions: Transaction[] = []

export const transactionService = {
  getAll() {
    return Promise.resolve(transactions)
  },

  create(transaction: Transaction) {
    transactions.push(transaction)
    return Promise.resolve(transaction)
  },

  delete(id: string) {
    transactions = transactions.filter(t => t.id !== id)
    return Promise.resolve()
  },
  
  update(updated: Transaction) {
    transactions = transactions.map(t =>
      t.id === updated.id ? updated : t
    )
    return Promise.resolve(updated)
  }
}