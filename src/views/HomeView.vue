<script setup lang="ts">
import { useVillagesStore } from '@/stores/store';
import { ref, onMounted } from 'vue';
import type { Village, Pagination } from '@/types/types';

const villagesStore = useVillagesStore();
const villages = ref<Village[]>([]);
const loading = ref<boolean>(false);
const mError = ref<string | null>(null);
const currentPage = ref<number>(1); // Track current page

const handleError = (error: Error) => {
  console.error(error);
  mError.value = error.message || 'An error occurred';
};

const fetchVillages = async (page: number) => {
  loading.value = true;
  try {
    await villagesStore.fetchVillages(page); // Fetch villages from store
    villages.value = villagesStore.villages;
    currentPage.value = page; // Update current page
  } catch (error) {
    handleError(error as Error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchVillages(currentPage.value); // Fetch villages for initial page
});

const changePage = (increment: number) => {
  const newPage = currentPage.value + increment;
  fetchVillages(newPage);
};

const nextPage = () => {
  if (currentPage.value < villagesStore.pagination.total_pages) {
    changePage(1);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    changePage(-1);
  }
};

const exportToJson = () => {
  const dataToExport = JSON.stringify(villages.value, null, 2);
  const blob = new Blob([dataToExport], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.json';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
};
</script>

<template>
  <v-container>
    <div class="text-center">
      <h1> Homabay Villages </h1>
      <button @click="exportToJson" v-if="!loading">Export to JSON</button>
    </div>
    <div>
      <v-progress-linear v-if="loading" indeterminate class="bg-green"></v-progress-linear>
      <v-alert v-else-if="mError" type="error">{{ mError }}</v-alert>
      <v-data-table  :headers="headers" :items="villages" :loading="loading" item-key="id">
        <template v-slot:items="props">
          <td>{{ props.item.org_id }}</td>
          <td>{{ props.item.name }}</td>
          <!-- Add other columns here -->
        </template>
      </v-data-table>
      <!-- Pagination controls -->
      <div class="pagination ">
        <v-btn @click="prevPage" :disabled="currentPage === 1">Previous</v-btn>
        <span>{{ currentPage }} / {{ villagesStore.pagination.total_pages }}</span>
        <v-btn @click="nextPage" :disabled="currentPage === villagesStore.pagination.total_pages">Next</v-btn>
      </div>
    </div>
  </v-container>
</template>


