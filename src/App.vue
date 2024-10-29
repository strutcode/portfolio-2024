<template>
  <Navigation />
  <RouterView v-slot="{ Component }">
    <transition name="fade">
      <div class="body">
        <component :is="Component" />
      </div>
    </transition>
  </RouterView>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import Navigation from './components/Navigation.vue'
</script>

<style>
  .body {
    padding-top: 60px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
