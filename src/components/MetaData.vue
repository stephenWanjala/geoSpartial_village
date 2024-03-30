<template>
  <div>
    <h2>Metadata</h2>
    <p><strong>Latitude:</strong> {{ latitude }}</p>
    <p><strong>Longitude:</strong> {{ longitude }}</p>
    <!-- Add more metadata fields as needed -->
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  latitude: Number,
  longitude: Number,
  // Add more metadata fields as needed
})
</script>