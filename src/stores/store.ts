import { defineStore } from 'pinia';
import { fetchVillages } from '@/viewmodel/viewmodels';
import { ref } from 'vue';
import type { Village, Pagination } from '@/types/types';

export const useVillagesStore = defineStore({
  id: 'villages',
  state: () => ({
    villages: [] as Village[],
    pagination: {} as Pagination,
    loading: ref(false),
    mError: ref<string | null>(null),
  }),
  actions: {
    async fetchVillages(page: number = 79) {
      try {
        this.loading = true;
        const { villages, pagination } = await fetchVillages(page);
        this.villages = villages;
        this.pagination = pagination;
      } catch (error) {
        this.mError = (error as Error).message;
      } finally {
        this.loading = false;
      }
    },
  },
});
