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

<style>
  .body {
    padding-top: 60px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.12s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
