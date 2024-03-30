
<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import { ref } from 'vue'
const zoom = ref(20);
</script>

<template>

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


