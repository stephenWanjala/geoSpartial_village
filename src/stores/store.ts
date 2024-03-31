import { defineStore } from 'pinia';
import { fetchVillages as fetchVillagesFromViewModel } from '@/viewmodel/viewmodels';
import { ref } from 'vue';
import type { Village, Pagination } from '@/types/types';

type CacheData = {
  villages: Village[];
  pagination: Pagination;
};

const cache: Record<string, CacheData> = {};

export const useVillagesStore = defineStore({
  id: 'villages',
  state: () => ({
    villages: [] as Village[],
    pagination: {} as Pagination,
    loading: ref(false),
    mError: ref<string | null>(null),
  }),
  actions: {
    async fetchVillages(page: number = 1, county_id:number = 17) {
      const cacheKey = `${county_id}-${page}`;

      // Check if data is in cache
      if (cache[cacheKey]) {
        this.villages = cache[cacheKey].villages;
        this.pagination = cache[cacheKey].pagination;
        return;
      }

      try {
        this.loading = true;
        const { villages, pagination } = await fetchVillagesFromViewModel(page,county_id);
        this.villages = villages;
        this.pagination = pagination;

        // Store data in cache
        cache[cacheKey] = { villages, pagination };
      } catch (error) {
        this.mError = (error as Error).message;
      } finally {
        this.loading = false;
      }
    },
  },
});