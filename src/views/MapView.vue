<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import { ref } from 'vue';

const zoom = ref(20);
const markers = ref([
  { latLng: [-0.5350427,	34.4530968], description: "Homa Bay County\tHoma Bay Town Sub County\tHoma Bay Central Ward\tKalanya Kanyango Location\tKalanya Kanyango Sub Location\tKuja - A Village" },
  // Add more markers with descriptions as needed
]);
</script>
<style lang="css" src="@/assets/main.css"></style>
<template>
<div>
  <select id="county" name="county">
  <option value="" disabled selected hidden>Select County</option>
  <option value="kisumu">Kisumu</option>
  <option value="homabay">Homabay</option>
  <option value="homabay">Homabay</option>
  <option value="homabay">Homabay</option>
  <option value="homabay">Homabay</option>
</select>

<select id="sub-county" name="sub-county">
  <option value="" disabled selected hidden>Select Subcounty</option>
  <option value="kisumu">Kisumu</option>
  <option value="homabay">Homabay</option>
  <option value="homabay">Homabay</option>
  <option value="homabay">Homabay</option>
  <option value="homabay">Homabay</option>
</select>

<select id="ward" name="ward">
  <option value="" disabled selected hidden>Select Ward</option>
  <option value="kisumu">Kisumu</option>
  <option value="homabay">Homabay</option>
  <option value="homabay">Homabay</option>
  <option value="homabay">Homabay</option>
  <option value="homabay">Homabay</option>
</select>

<select id="selection" name="location">
  <option value="" disabled selected hidden>Select Location</option>
  <option value="kisumu">Kisumu</option>
  <option value="homabay">Homabay</option>
  <option value="homabay">Homabay</option>
  <option value="homabay">Homabay</option>
  <option value="homabay">Homabay</option>
</select>

<select id="Sublocation" name="Sublocation">
  <option value="" disabled selected hidden>Select Sublocation</option>
  <option value="kisumu">Kisumu</option>
  <option value="homabay">Homabay</option>
  <option value="homabay">Homabay</option>
  <option value="homabay">Homabay</option>
  <option value="homabay">Homabay</option>
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
