import { http } from '@/services/http'
import type { Transaction } from '@/modules/transactions/types/transaction'

export const transactionService = {
  async getAll() {
    const { data } = await http.get('/transactions')
    return data
  },

  async create(transaction: Transaction) {
    const { data } = await http.post('/transactions', transaction)
    return data
  },

  async delete(id: string) {
    await http.delete(`/transactions/${id}`)
  },

  async update(transaction: Transaction) {
    const { data } = await http.put(
      `/transactions/${transaction.id}`,
      transaction
    )
    return data
  },
}