<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://training.digimal.uonbi.ac.ke/img/coat_of_arms.8d015f76.png"
            style="font-weight: bold; color: #22c997; font-size: 24px; font-family: Inter, sans-serif;"
            subtitle="household distribution and registration"
            title="DigiMal-KE"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <RouterLink class="nav-link" to="/">
            <v-list-item :class="{ 'active-link': isActive('/') }" prepend-icon="mdi-home" title="Home" value="home"></v-list-item>
          </RouterLink>
          <RouterLink class="nav-link" to="/map">
            <v-list-item :class="{ 'active-link': isActive('/map') }" prepend-icon="mdi-map" title="map" value="map"></v-list-item>
          </RouterLink>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-app-bar app color="#20c997" elevation="0">
          <v-toolbar-title> DigiMal-KE</v-toolbar-title>
        </v-app-bar>

        <RouterView />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

// Function to determine if a route is active
const isActive = (to: string) => {
  return route.path === to
}
</script>

<style scoped>
.nav-link {
  text-decoration: none;
  color: inherit;
}

.active-link {
  color: #22c997;
}
</style>
