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
const exportToJson = () => {
  const dataToExport = JSON.stringify(villages.value, null, 2)
  const blob = new Blob([dataToExport], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'data.json'
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
}
</script>


<template>
  <v-container>
    <div class="text-center">
      <h1> Homabay Villages </h1>
      <button @click="exportToJson">Export to JSON</button>
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

