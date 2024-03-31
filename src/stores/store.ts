import { defineStore } from 'pinia';
import { fetchVillages as fetchVillagesFromViewModel } from '@/viewmodel/viewmodels';
import { ref } from 'vue';
import type { Village, Pagination } from '@/types/types';

type CacheData = {
  villages: Village[];
  pagination: Pagination;
};

const CACHE_KEY_PREFIX = 'villages_cache';

export const useVillagesStore = defineStore({
  id: 'villages',
  state: () => ({
    villages: [] as Village[],
    pagination: {} as Pagination,
    loading: ref(false),
    mError: ref<string | null>(null),
  }),
  actions: {
    async fetchVillages(page: number = 1, county_id: number = 9) {
      const cacheKey = `${county_id}-${page}`;

      // Check if data is in cache
      const cachedData = localStorage.getItem(`${CACHE_KEY_PREFIX}_${cacheKey}`);
      if (cachedData) {
        const { villages, pagination } = JSON.parse(cachedData) as CacheData;
        this.villages = villages;
        this.pagination = pagination;
        return;
      }

      try {
        this.loading = true;
        const { villages, pagination } = await fetchVillagesFromViewModel(page, county_id);
        this.villages = villages;
        this.pagination = pagination;

        // Store data in cache
        localStorage.setItem(`${CACHE_KEY_PREFIX}_${cacheKey}`, JSON.stringify({ villages, pagination }));
      } catch (error) {
        this.mError = (error as Error).message;
      } finally {
        this.loading = false;
      }
    },
  },
});
