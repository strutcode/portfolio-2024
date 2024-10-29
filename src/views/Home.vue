<template>
  <div>
    <canvas ref="canvas"></canvas>
    <h1>Home</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, useTemplateRef } from 'vue'
  import HomeScene from '../webgl/scenes/HomeScene'
  import type Scene from '../webgl/Scene'

  const canvas = useTemplateRef('canvas')
  let scene: Scene | null = null

  onMounted(() => {
    if (!canvas.value) return

    scene = new HomeScene(canvas.value)
  })

  onUnmounted(() => {
    // Cleanup
    if (scene) {
      scene.dispose()
    }
  })
</script>

<style scoped>
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
