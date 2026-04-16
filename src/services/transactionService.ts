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
}