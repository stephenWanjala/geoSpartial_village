import { defineStore } from 'pinia';
import { fetchVillages as fetchVillagesFromViewModel } from '@/viewmodel/viewmodels';
import { ref } from 'vue';
import type { Village, Pagination, County } from '@/types/types'
import { fetchCounties } from '@/viewmodel/MapViewmodel'

type CacheData = {
  villages: Village[];
  pagination: Pagination;
};

const CACHE_KEY_PREFIX = 'villages_cache';
const COUNTIES_CACHE_KEY = 'counties_cache';

export const useVillagesStore = defineStore({
  id: 'villages',
  state: () => ({
    villages: [] as Village[],
    pagination: {} as Pagination,
    loading: ref(false),
    mError: ref<string | null>(null),
    counties:[] as County[],
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

    async fetchAllCounties() {
      // Check if counties data is in cache
      const cachedCounties = localStorage.getItem(COUNTIES_CACHE_KEY);
      if (cachedCounties) {
        this.counties = JSON.parse(cachedCounties);
        return;
      }

      try {
        this.counties = await fetchCounties();

        // Store counties data in cache
        localStorage.setItem(COUNTIES_CACHE_KEY, JSON.stringify(this.counties));
      } catch (error) {
        console.error('Error fetching counties:', error);
        this.mError = (error as Error).message;
        throw error;
      }
    }
  },
});