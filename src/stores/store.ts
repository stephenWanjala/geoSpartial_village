// store.ts
import { defineStore } from 'pinia';
import axios from 'axios';
import { BEARER_TOKEN } from '@/main'

interface SubCounty {
  id: number;
  name: string;
  // Add other properties as needed
}

export const useSubCountiesStore = defineStore({
  id: 'subCounties',
  state: () => ({
    subCounties: [] as SubCounty[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchSubCounties() {
      try {
        this.loading = true;
        const response = await axios.get('https://training.digimal.uonbi.ac.ke/api/get_sub_counties_list?parent_id=OU314032', {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`
          }
        });
        this.subCounties = response.data;
      } catch (error) {
        this.error = (error as Error).message || 'An error occurred';
      } finally {
        this.loading = false;
      }
    },
  },
});
