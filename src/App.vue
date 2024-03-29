<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'





</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg" style="background-color: #20c997;">
      <div class="container">
        <RouterLink class="navbar-brand" to="/">Table Visualization</RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/about">Map</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <RouterView />
</template>


