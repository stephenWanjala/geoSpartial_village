// store.ts
import { defineStore } from 'pinia'
import { fetchVillages } from '@/viewmodel/viewmodels'
import { ref } from 'vue'
import type { Village } from '@/types/types'

export const useVillagesStore = defineStore({
  id: 'villages',
  state: () => ({
    villages: [] as Village[],
    loading: ref(false),
    mError: ref<string | null>(null),
  }),
  actions: {
    async fetchVillages() {
      try {
        this.loading= true;
        this.villages = await fetchVillages();
      } catch (error) {
        this.mError = (error as Error).message;
      } finally {
        this.loading= false;
      }
    },
  },
});
