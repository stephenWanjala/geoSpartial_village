import axios from 'axios';
import { BEARER_TOKEN } from '@/main';
import type { SubCounty } from '@/stores/store'

export async function fetchSubCounties(): Promise<SubCounty[]> {
  try {
    const response = await axios.get('https://training.digimal.uonbi.ac.ke/api/get_sub_counties_list?parent_id=OU314032', {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`
      }
    });
    return response.data.message;
  } catch (error) {
    throw new Error((error as Error).message || 'An error occurred');
  }
}
