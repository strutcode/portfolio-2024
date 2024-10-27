<template>
  <Navigation />
  <div class="body">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import Navigation from './components/Navigation.vue'
</script>

<style>
  .body {
    padding-top: 60px;
  }
</style>
