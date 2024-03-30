<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { BEARER_TOKEN } from '@/main';


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

onMounted(async () => {
  try {
    const response = await axios.get('https://training.digimal.uonbi.ac.ke/api/get_org_unit_with_children?parent_id=HfVjCurKxh2', {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`
      }
    });
    county.value = response.data;
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
    sub_county.value = response.data;
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
    ward.value = response.data;
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
    location.value = response.data;
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
    Sublocation.value = response.data;
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
    Village.value = response.data;
  } catch (error) {
    console.error('Error fetching sub location:', error);
  }
});

</script>

<style lang="css" src="@/assets/main.css"></style>
<template>
<div>
  <select id="county" name="county" v-model="selectedCounty">
      <option value="" disabled selected hidden>Select County</option>
      <option v-for="countList in county.message" :key="countList.id" :value="countList.org_id">{{ countList.name }}</option>
    </select>

<select id="sub-county" name="sub-county" v-model="selectedSubCounty">
  <option value="" disabled selected hidden>Select Subcounty</option>
  <option v-for="sub_countyList in sub_county.message" :key="sub_countyList.id" :value="sub_countyList.org_id">{{ sub_countyList.name }}</option>
</select>

<select id="selection" name="location" v-model="selectedWard">
  <option value="" disabled selected hidden>Select ward</option>
  <option v-for="ward_list in ward.message" :key="ward_list.id" :value="ward_list.org_id">{{ ward_list.name }}</option>

</select>

<select id="Sublocation" name="Sublocation" v-model="selectedlocation">
  <option value="" disabled selected hidden>Select Location</option>
  <option v-for="locationList in location.message" :key="locationList.id" :value="locationList.org_id">{{ locationList.name }}</option>

</select>

<select id="village" name="village" v-model="selectedSublocation">
  <option value="" disabled selected hidden>Select Sublocation</option>
  <option v-for="SublocationList in Sublocation.message" :key="SublocationList.id" :value="SublocationList.org_id">{{ SublocationList.name }}</option>

</select>

<select id="village" name="village">
  <option value="" disabled selected hidden>Select Village</option>
  <option v-for="VillageList in Village.message" :key="VillageList.id" :value="VillageList.org_id">{{ VillageList.name }}</option>

</select>

</div>
  <div style="height: 100vh; width: 100%">
    <l-map ref="map" v-model:zoom="zoom" :center="[-0.5350427, 34.4530968]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>

      <!-- Add markers -->
      <l-marker v-for="(marker, index) in markers" :key="index" :lat-lng="marker.latLng">
        <l-popup>{{ marker.description }}</l-popup>

      </l-marker>
    </l-map>
  </div>
</template>
