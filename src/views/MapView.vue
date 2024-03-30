<template>
  <div>
    <v-progress-linear v-if="loading" indeterminate class="bg-green"></v-progress-linear>
    <v-alert v-else-if="mError" type="error">{{ mError }}</v-alert>
    <div v-if="!loading && !mError" style="height: 500px; width: 100%">
      <l-map ref="map" :zoom="zoom" :center="[-0.5350427, 34.4530968]" style="height: 100%; width: 100%">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
        <template v-for="village in villages" :key="village.id">
          <l-marker :lat-lng="[village.latitude, village.longitude]">
<!--            <l-popup>{{ // village.name }}</l-popup>-->
          </l-marker>
        </template>
      </l-map>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVillagesStore } from '@/stores/store'
import { onMounted, ref } from 'vue'
import type { County, Village } from '@/types/types'
import 'leaflet/dist/leaflet.css'
import { LMap, LMarker, LTileLayer } from '@vue-leaflet/vue-leaflet'


const villagesStore = useVillagesStore()
const villages = ref<Village[]>([])
const loading = ref<boolean>(false)
const mError = ref<string | null>(null)
const zoom = ref(15) // Adjust the initial zoom level as needed



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
</script>
