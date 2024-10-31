<template>
  <Navigation />
  <div class="body">
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import Navigation from './components/Navigation.vue'
</script>

<style scoped>
  .body {
    padding: 8rem 5rem;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.18s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
