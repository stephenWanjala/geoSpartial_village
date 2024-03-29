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
    <div class="text-center"> <!-- Added class text-center here -->
      <h1>Villages</h1>
    </div>
    <div>
      <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
      <v-alert v-else-if="mError" type="error">{{ mError }}</v-alert>
      <v-data-table v-else :headers="headers" :items="subCounties" :loading="loading" item-key="id">
        <template v-slot:items="props">
          <td>{{ props.item.org_id }}</td>
          <td>{{ props.item.name }}</td>
          <!-- Add other columns here -->
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

