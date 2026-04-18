import { describe, it, expect, vi } from 'vitest'
import { transactionService } from './transactionService'
import { http } from '@/services/http'

vi.mock('@/services/http')

describe('transactionService', () => {
  it('should fetch transactions', async () => {
    const mockData = [{ id: '1', title: 'Test' }]

    ;(http.get as any).mockResolvedValue({ data: mockData })

    const result = await transactionService.getAll()

    expect(result).toEqual(mockData)
    expect(http.get).toHaveBeenCalledWith('/transactions')
  })
})