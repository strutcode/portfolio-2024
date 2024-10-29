<template>
  <canvas ref="canvas"></canvas>
  <h1>Home</h1>
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
