<script setup lang="ts">
import { useSubCountiesStore } from "@/stores/store";
import { ref, onMounted } from 'vue';

const subCountiesStore = useSubCountiesStore();
const subCounties = ref<any[]>([]);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);

onMounted(async () => {
  loading.value = true;
  try {
    await subCountiesStore.fetchSubCounties();
    subCounties.value = subCountiesStore.subCounties;
    console.log(subCounties)
  } catch (err ) {
    error.value = error.value || 'An error occurred';
  } finally {
    loading.value = false;
  }
});
</script>



<template>
  <div>
    <h1>Sub Counties</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <ul v-else>
      <li v-for="subCounty in subCounties.message" :key="subCounty.id">{{ subCounty.name }}</li>
    </ul>
  </div>
</template>