<script setup lang="ts">
import {  useSubCountiesStore } from '@/stores/store'
import { ref, onMounted } from 'vue';
import type { SubCounty } from '@/types/types'


const subCountiesStore = useSubCountiesStore();
const subCounties = ref<SubCounty[]>([]);
const loading = ref<boolean>(false);
const mError = ref<string | null>(null);

onMounted(async () => {
  loading.value = true;
  try {
    await subCountiesStore.fetchSubCounties();
    subCounties.value = subCountiesStore.subCounties;

  } catch (error) {
    mError.value = (error as Error).message || 'An error occurred';
  } finally {
    loading.value = false;
  }
});
subCounties.value.forEach(value => {console.log(value)})
</script>



<template>
  <v-container>
    <h1>Sub Counties</h1>
    <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
    <v-alert v-else-if="mError" type="error">{{ mError }}</v-alert>
    <ul v-else>
      <li v-for="subCounty in subCounties" :key="subCounty.id">
        Org_id->{{ subCounty.org_id}}  VillageName:{{subCounty.name}}
      </li>
    </ul>
  </v-container>
</template>

