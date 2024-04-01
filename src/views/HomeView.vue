<script setup lang="ts">
import { useVillagesStore } from '@/stores/store'
import { onMounted, ref, watch } from 'vue'
import type { Village, County } from '@/types/types'

const villagesStore = useVillagesStore()
const villages = ref<Village[]>([])
const loading = ref<boolean>(false)
const mError = ref<string | null>(null)
const currentPage = ref<number>(1)
const counties = ref<County[]>([])
const SELECTED_COUNTY_KEY = 'selected_county'
const selectedCounty = ref<number>(parseInt(localStorage.getItem(SELECTED_COUNTY_KEY) || '9'))

const handleError = (error: Error) => {
  console.error(error)
  mError.value = error.message || 'An error occurred'
}

const fetchVillages = async (page: number, county_id: number = 9) => {
  loading.value = true
  try {
    await villagesStore.fetchVillages(page, county_id)
    villages.value = villagesStore.villages
    currentPage.value = page
  } catch (error) {
    handleError(error as Error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await villagesStore.fetchAllCounties()
  counties.value = villagesStore.counties
  console.log('Counties..', villagesStore.counties)
  await fetchVillages(currentPage.value, selectedCounty.value)
})

watch(selectedCounty, (newCountyId) => {
  fetchVillages(currentPage.value, newCountyId)
  localStorage.setItem(SELECTED_COUNTY_KEY, newCountyId.toString())
})

const changePage = (increment: number) => {
  const newPage = currentPage.value + increment
  fetchVillages(newPage)
}

const nextPage = () => {
  if (currentPage.value < villagesStore.pagination.total_pages) {
    changePage(1)
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    changePage(-1)
  }
}

const exportToJson = () => {
  const selectedCountyName = counties.value.find(county => county.id === selectedCounty.value)?.name || 'data'
  const dataToExport = JSON.stringify(villages.value, null, 2)
  const blob = new Blob([dataToExport], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${selectedCountyName}.json`
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="container">
    <div class="text-center mt-3 align-content-center">
      <v-row>
        <v-col cols="12" md="6">
          <select class="form-select" v-model="selectedCounty">
            <option v-for="county in counties" :value="county.id" :key="county.id">{{ county.name }}</option>
          </select>
        </v-col>
        <v-col cols="12" md="6">
          <v-btn @click="exportToJson" v-if="!loading && villages.length > 0" class="btn btn-primary mt-2">Export to JSON</v-btn>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-progress-linear v-if="loading" indeterminate class="bg-green"></v-progress-linear>
      <v-alert v-else-if="mError" type="error">{{ mError }}</v-alert>
      <v-data-table :items="villages" :loading="loading" item-key="id" auto-width>
        <template v-slot:items="props">
          <td>{{ props.item.org_id }}</td>
          <td>{{ props.item.name }}</td>
        </template>
      </v-data-table>
      <v-row class="d-flex justify-center">
        <v-btn @click="prevPage" :disabled="currentPage === 1">Previous</v-btn>
        <span>Page {{ currentPage }} of {{ villagesStore.pagination.total_pages }}</span>
        <v-btn @click="nextPage" :disabled="currentPage === villagesStore.pagination.total_pages">Next</v-btn>
      </v-row>
    </div>
  </div>
</template>

<style scoped>
.select {
  width: 200px;
  margin: 20px auto;
}
</style>