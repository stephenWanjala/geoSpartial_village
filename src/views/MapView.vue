<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import { onBeforeMount, onBeforeUnmount, onMounted, ref , watch } from 'vue'
import { useCountyStore } from '@/stores/mapstore'
const {
  counties, fetchAdministrativeUnitsByCounty, fetchCounties, mError, loadingCoordinates, administrativeUnits

} = useCountyStore()

const countyStore = useCountyStore()
import axios from 'axios';
import { fetchToken } from '@/viewmodel/Api';

const zoom = ref(10)
const center = ref([-0.5350427, 34.4530968] as [number, number])

const searchQuery = ref('');

const search = async () => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: searchQuery.value,
        format: 'json',
        limit: 10,
      },
    });
    if (response.data.length > 0) {
      console.log(response.data);
      const result = response.data[0];
      center.value = [parseFloat(result.lat), parseFloat(result.lon)];
      zoom.value = 15 ; // Adjust the zoom level as needed
    } else {
      // Handle case when no results are found
      console.log('No results found');
    }
  } catch (error) {
    console.error('Error searching:', error);
  }
};

const searchQuery_selected = ref('')


const search_selected = async (countyName) => {
  try {
    searchQuery_selected.value = countyName  // Update the searchQuery_selected value with the selected county name
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: countyName, // Use the selected county name as the query
        format: 'json',
        limit: 1
      }
    })
    if (response.data.length > 0) {
      const result = response.data[0]
      center.value = [parseFloat(result.lat), parseFloat(result.lon)]
      zoom.value = 15 // Adjust the zoom level as needed
      console.log("working")
      console.log(countyName)

    } else {
      // Handle case when no results are found
      console.log('No results found on search_selected')
      console.log(countyName)
    }
  } catch (error) {
    console.error('Error searching:', error)
  }
}


let parent_org_id = null;
const fetchCountyNameById = async (countyId, isFirstSelection = false) => {
  try {
    const token = await fetchToken();
    let apiUrl = ''; // Initialize the API URL variable
    if (isFirstSelection) {
      // First selection: use default parent ID
      apiUrl = 'https://training.digimal.uonbi.ac.ke/api/get_org_unit_with_children?parent_id=HfVjCurKxh2';
    } else {
      // Subsequent selections: use provided org_id
      apiUrl = `https://training.digimal.uonbi.ac.ke/api/get_org_unit_with_children?parent_id=${parent_org_id}`;
    }
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const counties = response.data.message;

    if (countyId) {
      parent_org_id = countyId;
    }

    const matchingCounty = counties.find(county => county.org_id === countyId);
    if (matchingCounty) {
      return search_selected(matchingCounty.name);
    } else {
      console.log('County not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching county name:', error);
    return null;
  }
};

onMounted(async () => {
  await fetchAdministrativeUnitsByCounty(35) // replace 9 with the actual county id
   await  fetchCounties()
})


const county = ref([]);
const sub_county = ref([]);
const ward = ref([]);
const location = ref([])
const Sublocation = ref([])
const Village = ref([])

const selectedCounty = ref(null); // Initialize selectedCounty as null
const selectedSubCounty = ref(null); // Initialize selectedCounty as null
const selectedWard = ref(null); // Initialize selectedCounty as null
const selectedlocation = ref(null); // Initialize selectedCounty as null
const selectedSublocation = ref(null); // Initialize selectedCounty as null
const selectedVillage = ref(null); // Initialize selectedVillage as null

onMounted(async () => {
  await countyStore.fetchAdministrativeUnitsByCounty(17) // replace 9 with the actual county id
})

const fetchData = async (parentId) => {
  try {
    const token = await fetchToken();
    const response = await axios.get(`https://training.digimal.uonbi.ac.ke/api/get_org_unit_with_children?parent_id=${parentId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.message;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};


onMounted(async () => {
  county.value = await fetchData('HfVjCurKxh2');
});

const watchers = [
  { selectedValue: selectedCounty, setValue: sub_county },
  { selectedValue: selectedSubCounty, setValue: ward },
  { selectedValue: selectedWard, setValue: location },
  { selectedValue: selectedlocation, setValue: Sublocation },
  { selectedValue: selectedSublocation, setValue: Village },
];


watchers.forEach(watcher => {
  watch(watcher.selectedValue, async (newValue, oldValue) => {
    console.log('Selected value:', newValue);
    const data = await fetchData(newValue); // Use newValue as the parentId
    if (data) {
      watcher.setValue.value = data;
    }
  });
});


function refreshPage() {
  window.location.reload();
}

</script>

<style lang="css" src="@/assets/main.css"></style>

<template>
<div class="select-container">
  <select id="county" name="county" :value="selectedCounty" @input="selectedCounty = $event.target.value" @change="fetchCountyNameById(selectedCounty, true)">
  <option value="" disabled hidden> Select County </option>
  <option v-for="countList in county.slice(1)" :key="countList.id" :value="countList.org_id">{{ countList.name }}</option>
</select>

<select id="sub-county"  name="sub-county" :value="selectedSubCounty" @input="selectedSubCounty = $event.target.value" @change="fetchCountyNameById(selectedSubCounty)" >
      <option value="" disabled selected hidden> Select Subcounty </option>
      <option v-for="sub_countyList in sub_county" :key="sub_countyList.id" :value="sub_countyList.org_id">{{ sub_countyList.name }}</option>
    </select>

    <select id="selection" name="location" :value="selectedWard" @input="selectedWard = $event.target.value" @change="fetchCountyNameById(selectedWard)" >
      <option value="" disabled selected hidden>Select ward</option>
      <option v-for="ward_list in ward" :key="ward_list.id" :value="ward_list.org_id">{{ ward_list.name }}</option>
    </select>

    <select id="Sublocation" name="Sublocation" :value="selectedlocation" @input="selectedlocation = $event.target.value" @change="fetchCountyNameById(selectedlocation)" >
      <option value="" disabled selected hidden>Select Location</option>
      <option v-for="locationList in location" :key="locationList.id" :value="locationList.org_id">{{ locationList.name }}</option>
    </select>

    <select id="village" name="village" :value="selectedSublocation" @input="selectedSublocation = $event.target.value" @change="fetchCountyNameById(selectedSublocation)" >
      <option value="" disabled selected hidden>Select Sublocation</option>
      <option v-for="SublocationList in Sublocation" :key="SublocationList.id" :value="SublocationList.org_id">{{ SublocationList.name }}</option>
    </select>

    <select id="village" name="village" :value="selectedVillage" @input="selectedVillage = $event.target.value" @change="fetchCountyNameById(selectedVillage)" >
      <option value="" disabled selected hidden>Select Village</option>
      <option v-for="VillageList in Village" :key="VillageList.id" :value="VillageList.org_id">{{ VillageList.name }}</option>
    </select>

<v-btn type="button" @click="refreshPage">Refresh</v-btn>
</div>


  <v-app style="height: 100vh; width: 100%">
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

    <v-card class="bottom-left-card">
      <v-card-text>
        <v-card-title>Coordinates</v-card-title>
        <!-- Your data goes here -->
        <div><strong>Latitude : </strong>lat-data</div>
        <div><strong>Longitude : </strong> lat-Value</div>
      </v-card-text>
    </v-card>


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
