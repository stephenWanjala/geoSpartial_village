<template>
  <v-app style="height: 500px; width: 100%">
    <Suspense>
      <template #default>
        <l-map ref="map" :zoom="zoom" :center="center" style="height: 100%; width: 100%">
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
          ></l-tile-layer>
          <l-marker
            v-for="unit in countyStore.administrativeUnits"
            :key="unit.village_id"
            :lat-lng="[unit.latitude, unit.longitude]"
          >

            <l-popup>
              <p><strong>Village:</strong> {{ unit.village }}</p>
              <p><strong>Latitude:</strong> {{ unit.latitude }}</p>
              <p><strong>Longitude:</strong> {{ unit.longitude }}</p>
            </l-popup>
          </l-marker>
        </l-map>
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </v-app>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import { ref, onMounted } from 'vue'
import { useCountyStore } from '@/stores/mapstore'

const zoom = ref(10)
const center = ref([-0.5350427, 34.4530968])
const countyStore = useCountyStore()

onMounted(async () => {
  await countyStore.fetchAdministrativeUnitsByCounty(9) // replace 9 with the actual county id
})
</script>