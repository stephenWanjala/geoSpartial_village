<script setup lang="ts">
import {  useVillagesStore } from '@/stores/store'
import { ref, onMounted } from 'vue';
import type { Village } from '@/types/types'


const villagesStore = useVillagesStore();
const villages = ref<Village[]>([]);
const loading = ref<boolean>(false);
const mError = ref<string | null>(null);

onMounted(async () => {
  loading.value = true;
  try {
    await villagesStore.fetchVillages();
    villages.value = villagesStore.villages;

  } catch (error) {
    mError.value = (error as Error).message || 'An error occurred';
  } finally {
    loading.value = false;
  }
});
villages.value.forEach(value => {console.log(value)})
</script>


<template>
  <v-container>
    <div class="text-center">
      <h1> Homabay Villages</h1>
    </div>
    <div>
      <v-progress-linear v-if="loading" indeterminate class="bg-green"></v-progress-linear>
      <v-alert v-else-if="mError" type="error">{{ mError }}</v-alert>
      <v-data-table v-else :headers="headers" :items="villages" :loading="loading" item-key="id">
        <template v-slot:items="props">
          <td>{{ props.item.org_id }}</td>
          <td>{{ props.item.name }}</td>
          <!-- Add other columns here -->
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

