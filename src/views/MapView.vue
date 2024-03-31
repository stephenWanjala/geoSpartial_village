<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import { ref, onMounted } from 'vue'
import { useCountyStore } from '@/stores/mapstore'

const zoom = ref(10)
const center = ref([-0.5350427, 34.4530968] as [number, number])
const countyStore = useCountyStore()

onMounted(async () => {
  await countyStore.fetchAdministrativeUnitsByCounty(17) // replace 9 with the actual county id
})
</script>

<style lang="css" src="@/assets/main.css"></style>

<template>
  <v-app style="height: 500px; width: 100%">
    <v-progress-linear v-if="countyStore.loadingCoordinates" indeterminate class="bg-green"></v-progress-linear>
    <v-alert v-else-if="countyStore.mError" type="error">{{ countyStore.mError }}</v-alert>
    <Suspense>
      <div style="position: relative; height: 100%; width: 100%;">
        <!-- Map -->
        <l-map ref="map" :zoom="zoom" :center="center" style="height: calc(100% - 40px); width: 100%; z-index: 0;">
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
              <v-card>
                <v-card-title>
                  <h5><strong>Village:</strong> {{ unit.village }}</h5>
                </v-card-title>
                <v-card-text>
                  <p><strong>Latitude:</strong> {{ unit.latitude }}</p>
                  <p><strong>Longitude:</strong> {{ unit.longitude }}</p>
                  <p><strong>County:</strong> {{ unit.county }}</p>
                  <p><strong>Sub-County:</strong> {{ unit.subcounty_id }}</p>
                  <p><strong>Ward:</strong> {{ unit.ward }}</p>
                </v-card-text>
              </v-card>
            </l-popup>
          </l-marker>
        </l-map>

        <!-- Floating search box -->
        <div class="search_bar">
          <v-text-field v-model="searchQuery" placeholder="Search for village..." outlined></v-text-field>
          <v-btn @click="search" text>Search</v-btn>
        </div>
      </div>
      <template #fallback>
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </template>
    </Suspense>
  </v-app>
</template>
