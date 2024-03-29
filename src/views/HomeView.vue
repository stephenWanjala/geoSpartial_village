<template>
  <v-container>
    <h1>Sub Counties</h1>

    <!-- Loading dialog -->
    <v-dialog v-model="loadingDialog" max-width="290">
      <v-card>
        <v-card-text>
          <v-row justify="center">
            <v-progress-circular
              indeterminate
              size="64"
              color="primary"
            ></v-progress-circular>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Data table -->
    <v-data-table
      :headers="headers"
      :items="subCounties"
      :loading="loading"
      item-key="id"
    >
      <!-- Name column -->
      <template #item.name="{ item }">
        {{ item.name }}
      </template>

      <!-- Org ID column -->
      <template #item.org_id="{ item }">
        {{ item.org_id }}
      </template>

      <!-- Latitude column -->
      <template #item.latitude="{ item }">
        <template v-if="item.latitude === undefined">
          <v-skeleton-loader type="text" width="40"></v-skeleton-loader>
        </template>
        <template v-else>
          {{ item.latitude }}
        </template>
      </template>

      <!-- Longitude column -->
      <template #item.longitude="{ item }">
        <template v-if="item.longitude === undefined">
          <v-skeleton-loader type="text" width="40"></v-skeleton-loader>
        </template>
        <template v-else>
          {{ item.longitude }}
        </template>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { useSubCountiesStore } from '@/stores/store';
import { ref, onMounted } from 'vue';

const { subCounties, loading, error, fetchSubCounties } = useSubCountiesStore();
const loadingDialog = ref(false);

// Fetch sub-counties on component mount
onMounted(async () => {
  loadingDialog.value = true;
  await fetchSubCounties();
  loadingDialog.value = false;
});

const headers = [
  { text: 'Name', value: 'name' },
  { text: 'Organization ID', value: 'org_id' },
  { text: 'Latitude', value: 'latitude' },
  { text: 'Longitude', value: 'longitude' },
];
</script>

<style>
.v-data-table__progress {
  display: none;
}
</style>
