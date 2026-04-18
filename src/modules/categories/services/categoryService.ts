import { http } from '@/services/http'
import type { Category } from '../types/category'

export const categoryService = {
  async getAll() {
    const { data } = await http.get('/categories')
    return data
  },

  async create(category: Category) {
    const { data } = await http.post('/categories', category)
    return data
  },
}