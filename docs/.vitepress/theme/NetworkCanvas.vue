<!-- NetworkCanvas.vue — The 3D Three.js WebGL canvas -->
<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { NetworkScene } from './NetworkThree.js'

const props = defineProps({
  color: { type: String, default: '#10b981' }
})

const canvasRef = ref(null)
let scene = null

onMounted(() => {
  if (typeof window === 'undefined') return
  // Defer until next frame so canvas has dimensions
  requestAnimationFrame(() => {
    scene = new NetworkScene(canvasRef.value)
    scene.setColor(props.color)
  })
})

watch(() => props.color, (val) => {
  scene?.setColor(val)
})

onUnmounted(() => {
  scene?.destroy()
  scene = null
})
</script>

<template>
  <canvas ref="canvasRef" class="nj-canvas" />
</template>

<style scoped>
.nj-canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  display: block;
}
</style>
