<script setup lang="ts">
import { useVillagesStore } from '@/stores/store'
import { onMounted, ref } from 'vue'
import type { County, Village } from '@/types/types'
import 'leaflet/dist/leaflet.css'
import { LMap, LMarker, LTileLayer } from '@vue-leaflet/vue-leaflet'
import { fetchCounties } from '@/viewmodel/MapViewmodel'

const villagesStore = useVillagesStore()
const villages = ref<Village[]>([])
const loading = ref<boolean>(false)
const mError = ref<string | null>(null)

const zoom = ref(8)

onMounted(async () => {
  loading.value = true
  try {
    await villagesStore.fetchVillages()
    villages.value = villagesStore.villages
  } catch (error) {
    mError.value = (error as Error).message || 'An error occurred'
  } finally {
    loading.value = false
  }
})
const counties = ref<County[]>([])
onMounted(async () => {
  try {
    counties.value = await fetchCounties()
  } catch (error) {
    mError.value = (error as Error).message || 'An error occurred'
  }
})



</script>

<template>
    <div class="text-center">
      <!-- Add any text or elements you want to display here -->
    </div>
    <div>
      <v-progress-linear v-if="loading" indeterminate class="bg-green"></v-progress-linear>
      <v-alert v-else-if="mError" type="error">{{ mError }}</v-alert>
      <div style="height:100pc; width:100%">
        <l-map ref="map" v-model:zoom="zoom" :center="[-0.5350427, 34.4530968]">
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
          ></l-tile-layer>
          <!-- Use the template tag and apply the key attribute to it -->
          <template v-for="village in villages" :key="village.id">
            <l-marker :lat-lng="[village.latitude, village.longitude]">
<!--              <l-popup>{{ village.name }}</l-popup>-->
            </l-marker>
          </template>
        </l-map>

      </div>
    </div>

</template>
