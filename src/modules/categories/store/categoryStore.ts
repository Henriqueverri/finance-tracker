import { defineStore } from 'pinia'
import { categoryService } from '../services/categoryService'
import type { Category } from '../types/category'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [] as Category[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchAll() {
      try {
        this.loading = true
        this.categories = await categoryService.getAll()
      } catch (e: any) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    },

    async create(category: Category) {
      const created = await categoryService.create(category)
      this.categories.push(created)
    },
  },
})