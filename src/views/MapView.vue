<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { LMap, LMarker, LPopup, LTileLayer } from '@vue-leaflet/vue-leaflet'
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue'
import { useCountyStore } from '@/stores/mapstore'
const {
  counties, fetchAdministrativeUnitsByCounty, fetchCounties, mError, loadingCoordinates, administrativeUnits

} = useCountyStore()
import axios from 'axios'

const zoom = ref(10)
const center = ref([-0.5350427, 34.4530968] as [number, number])


const searchQuery = ref('')

const search = async () => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: searchQuery.value,
        format: 'json',
        limit: 1
      }
    })
    if (response.data.length > 0) {
      const result = response.data[0]
      center.value = [parseFloat(result.lat), parseFloat(result.lon)]
      zoom.value = 15 // Adjust the zoom level as needed
    } else {
      // Handle case when no results are found
      console.log('No results found')
    }
  } catch (error) {
    console.error('Error searching:', error)
  }
}


onMounted(async () => {
  await fetchAdministrativeUnitsByCounty(35) // replace 9 with the actual county id
   await  fetchCounties()
})




</script>

<style lang="css" src="@/assets/main.css"></style>

<template>
  <v-app style="height: 100vh; width: 100%">
    <v-progress-linear v-if="loadingCoordinates" indeterminate class="bg-green"></v-progress-linear>
    <v-alert v-else-if="mError" type="error">{{ mError }}</v-alert>
<!--    <v-alert v-else-if="administrativeUnits.length === 0" type="info">No data found</v-alert>-->
    <v-row class="d-flex justify-center ml-1">
      <v-col cols="24" md="2" class="mt-2">
        <v-select
          clearable
          label="Select County"
          :items="counties"
          item-text="name"
        item-value="id"
        variant="solo"
        ></v-select>
      </v-col>

      <v-col cols="2" md="2">
        <v-select
          clearable
          label="Select Sub_county"
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
          variant="solo"
        ></v-select>
      </v-col>
      <v-col cols="6" md="2">
        <v-select
          clearable
          label="Select Ward"
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
          variant="solo"
        ></v-select>
      </v-col>
      <v-col cols="6" md="2">
        <v-select
          clearable
          label="Select Location"
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
          variant="solo"
        ></v-select>
      </v-col>
      <v-col cols="6" md="2">
        <v-select
          clearable
          label="Select Sub Location"
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
          variant="solo"
        ></v-select>
      </v-col>

      <v-col cols="6" md="2">
        <v-select
          clearable
          label="Select Village"
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
          variant="solo"
        ></v-select>
      </v-col>


    </v-row>
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
            v-for="unit in administrativeUnits"
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
          <v-text-field v-model="searchQuery" placeholder="Search..." outlined></v-text-field>
          <v-btn @click="search" text>Search</v-btn>
        </div>
      </div>
      <template #fallback>
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </template>
    </Suspense>
  </v-app>
</template>
