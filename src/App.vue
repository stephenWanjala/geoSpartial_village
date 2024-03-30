<script setup lang="ts">

import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

onMounted(() => {
  const navbarToggle = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  if (navbarToggle && navbarCollapse) {
    navbarToggle.addEventListener('click', () => {
      navbarCollapse.classList.toggle('show');
    });
  }
});

</script>
<style src="@/assets/main.css" lang="css"></style>
<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="sandra_a88@gmailcom"
            title="DigiMal KE"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <RouterLink to="/" class="nav-link"><v-list-item prepend-icon="mdi-home" title="Home" value="home"></v-list-item></RouterLink>
          <RouterLink to="/about" class="nav-link"><v-list-item prepend-icon="mdi-map" title="map" value="map"></v-list-item></RouterLink>
          <v-list-item prepend-icon="mdi-car" title="Dist" value="dist"></v-list-item>

        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 250px"></v-main>
    </v-layout>
  </v-card>
  <RouterView/>
</template>