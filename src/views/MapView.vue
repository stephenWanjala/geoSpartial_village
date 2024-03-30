<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { BEARER_TOKEN } from '@/main';
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";




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
const zoom=ref(20)

onMounted(async () => {
  try {
    const response = await axios.get('https://training.digimal.uonbi.ac.ke/api/get_org_unit_with_children?parent_id=HfVjCurKxh2', {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`
      }
    });
    county.value = response.data.message.slice(1);
  } catch (error) {
    console.error('Error fetching county:', error);
  }
});

// Watch for changes in selectedCounty and log the selected country
watch(selectedCounty, async (newValue, oldValue) => {
  console.log('Selected county:', newValue);
  try {
    const response = await axios.get(`https://training.digimal.uonbi.ac.ke/api/get_org_unit_with_children?parent_id=${newValue}`, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`
      }
    });
    sub_county.value = response.data.message;
  } catch (error) {
    console.error('Error fetching sub county:', error);
  }
});

watch(selectedSubCounty, async (newValue, oldValue) => {
  console.log('Selected county:', newValue);
  try {
    const response = await axios.get(`https://training.digimal.uonbi.ac.ke/api/get_org_unit_with_children?parent_id=${newValue}`, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`
      }
    });
    ward.value = response.data.message;
  } catch (error) {
    console.error('Error fetching sub location:', error);
  }
});

watch(selectedWard, async (newValue, oldValue) => {
  console.log('Selected county:', newValue);
  try {
    const response = await axios.get(`https://training.digimal.uonbi.ac.ke/api/get_org_unit_with_children?parent_id=${newValue}`, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`
      }
    });
    location.value = response.data.message;
  } catch (error) {
    console.error('Error fetching sub location:', error);
  }
});

watch(selectedlocation, async (newValue, oldValue) => {
  console.log('Selected county:', newValue);
  try {
    const response = await axios.get(`https://training.digimal.uonbi.ac.ke/api/get_org_unit_with_children?parent_id=${newValue}`, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`
      }
    });
    Sublocation.value = response.data.message;
  } catch (error) {
    console.error('Error fetching sub location:', error);
  }
});

watch(selectedSublocation, async (newValue, oldValue) => {
  console.log('Selected county:', newValue);
  try {
    const response = await axios.get(`https://training.digimal.uonbi.ac.ke/api/get_org_unit_with_children?parent_id=${newValue}`, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`
      }
    });
    Village.value = response.data.message;
  } catch (error) {
    console.error('Error fetching sub location:', error);
  }
});

</script>

<style lang="css" src="@/assets/main.css"></style>
<template>
  <div class="select-container">
    <select id="county" name="county" :value="selectedCounty" @input="selectedCounty = $event.target.value">
      <option value="" disabled hidden>Select County</option>
      <option v-for="countList in county" :key="countList.id" :value="countList.org_id">{{ countList.name }}</option>
    </select>

    <select id="sub-county"  name="sub-county" :value="selectedSubCounty" @input="selectedSubCounty = $event.target.value" v-if="sub_county.length > 0">
      <option value="" disabled selected hidden>Select Subcounty</option>
      <option v-for="sub_countyList in sub_county" :key="sub_countyList.id" :value="sub_countyList.org_id">{{ sub_countyList.name }}</option>
    </select>

    <select id="selection" name="location" :value="selectedWard" @input="selectedWard = $event.target.value" v-if="ward.length > 0">
      <option value="" disabled selected hidden>Select ward</option>
      <option v-for="ward_list in ward" :key="ward_list.id" :value="ward_list.org_id">{{ ward_list.name }}</option>
    </select>

    <select id="Sublocation" name="Sublocation" :value="selectedlocation" @input="selectedlocation = $event.target.value" v-if="location.length > 0">
      <option value="" disabled selected hidden>Select Location</option>
      <option v-for="locationList in location" :key="locationList.id" :value="locationList.org_id">{{ locationList.name }}</option>
    </select>

    <select id="village" name="village" :value="selectedSublocation" @input="selectedSublocation = $event.target.value" v-if="Sublocation.length > 0">
      <option value="" disabled selected hidden>Select Sublocation</option>
      <option v-for="SublocationList in Sublocation" :key="SublocationList.id" :value="SublocationList.org_id">{{ SublocationList.name }}</option>
    </select>

    <select id="village" name="village" :value="selectedVillage" @input="selectedVillage = $event.target.value" v-if="Village.length > 0">
      <option value="" disabled selected hidden>Select Village</option>
      <option v-for="VillageList in Village" :key="VillageList.id" :value="VillageList.org_id">{{ VillageList.name }}</option>
    </select>

    <v-btn>Refresh</v-btn>
  </div>
  <div style="height:100pc; width:100%">
    <l-map ref="map" v-model:zoom="zoom" :center="[-0.5350427	,34.4530968]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
    </l-map>
  </div>
</template>

