// store.ts
import { defineStore } from 'pinia'
import { fetchSubCounties } from '@/viewmodel/viewmodels'
import { ref } from 'vue'
import type { SubCounty } from '@/types/types'


export const useSubCountiesStore = defineStore({
  id: 'subCounties',
  state: () => ({
    subCounties: [] as SubCounty[],
    loading: ref(false),
    mError: ref<string | null>(null)
  }),
  actions: {
    async fetchSubCounties() {
      try {
        this.loading = true
        this.subCounties = await fetchSubCounties()
      } catch (error) {
        this.mError = (error as Error).message
      } finally {
        this.loading = false
      }
    }
  }
})
