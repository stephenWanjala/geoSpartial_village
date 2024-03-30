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
            prepend-avatar="https://training.digimal.uonbi.ac.ke/img/coat_of_arms.8d015f76.png"
            subtitle="household distribution and registration"
            title="DigiMal-KE"
            style="font-weight: bold; color: #22c997; font-size: 24px; font-family: Inter, sans-serif;"
          ></v-list-item>
      </v-list>


        <v-divider>  </v-divider>

        <v-list density="compact" nav>
          <RouterLink to="/" class="nav-link"><v-list-item prepend-icon="mdi-home" title="Home" value="home"></v-list-item></RouterLink>
          <RouterLink to="/map" class="nav-link"><v-list-item prepend-icon="mdi-map" title="map" value="map"></v-list-item></RouterLink>
          <v-list-item prepend-icon="mdi-car" title="Dist" value="dist"></v-list-item>

        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-app-bar app color="#20c997">
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-toolbar-title> DigiMal-KE</v-toolbar-title>
        </v-app-bar>
        <v-container>
          <RouterView/>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>