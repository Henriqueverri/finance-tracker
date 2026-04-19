import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTransactionStore } from './transactionStore'
import { transactionService } from '../services/transactionService'

vi.mock('../services/transactionService')

describe('transactionStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetchAll should load transactions', async () => {
    const mockData = [{ id: '1', title: 'Test' }]

    ;(transactionService.getAll as any).mockResolvedValue(mockData)

    const store = useTransactionStore()

    await store.fetchAll()

    expect(store.transactions).toEqual(mockData)
    expect(store.loading).toBe(false)
  })

  it('create should add transaction', async () => {
    const newTransaction = { id: '1', title: 'Test' }

    ;(transactionService.create as any).mockResolvedValue(newTransaction)

    const store = useTransactionStore()

    await store.create(newTransaction as any)

    expect(store.transactions).toContainEqual(newTransaction)
  })
})