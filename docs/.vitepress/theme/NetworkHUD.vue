<!-- NetworkHUD.vue — The floating, animated text overlay for each concept -->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  concept: { type: Object, required: true },
  index:   { type: Number, required: true },
  total:   { type: Number, required: true }
})
</script>

<template>
  <transition name="hud" mode="out-in">
    <div class="hud-root" :key="concept.id">

      <!-- Top-left: Group & Stage counter -->
      <div class="hud-corner hud-top-left">
        <div class="hud-group-badge" :style="`border-color: ${concept.color}; color: ${concept.color}`">
          {{ concept.groupLabel }}
        </div>
        <div class="hud-counter">
          <span class="hud-count-current" :style="`color: ${concept.color}`">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="hud-count-sep"> / </span>
          <span class="hud-count-total">{{ String(total).padStart(2, '0') }}</span>
        </div>
      </div>

      <!-- Center-left: Main title -->
      <div class="hud-center-left">
        <div class="hud-icon" :style="`text-shadow: 0 0 30px ${concept.color}`">
          {{ concept.icon }}
        </div>
        <div class="hud-titles">
          <h1 class="hud-title" :style="`color: ${concept.color}`">{{ concept.title }}</h1>
          <h2 class="hud-subtitle">{{ concept.subtitle }}</h2>
          <div class="hud-short" :style="`background: ${concept.color}22; border-color: ${concept.color}66`">
            {{ concept.shortTitle }}
          </div>
        </div>
      </div>

      <!-- Center-right: Description -->
      <div class="hud-center-right">
        <div class="hud-desc-card" :style="`--c: ${concept.color}`">
          <p>{{ concept.description }}</p>
        </div>
      </div>

      <!-- Bottom-right: Analogy -->
      <div class="hud-corner hud-bottom-right">
        <div class="hud-analogy" :style="`border-right-color: ${concept.color}`">
          <h4>{{ concept.analogy.icon }} {{ concept.analogy.text }}</h4>
        </div>
      </div>

      <!-- Progress bar at very bottom -->
      <div class="hud-progress-bar">
        <div
          class="hud-progress-fill"
          :style="`width: ${((index + 1) / total) * 100}%; background: ${concept.color}`"
        ></div>
      </div>

    </div>
  </transition>
</template>

<style scoped>
.hud-root {
  position: fixed;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr 1fr;
  padding: var(--hud-pad, 2.5rem);
  gap: 1rem;
  box-sizing: border-box;
}

/* ── TOP LEFT ── */
.hud-top-left {
  grid-column: 1; grid-row: 1;
  display: flex; flex-direction: column; gap: 0.5rem;
}
.hud-group-badge {
  display: inline-flex;
  align-items: center;
  border: 1px solid;
  border-radius: 999px;
  padding: 0.25rem 1rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(6px);
  transition: color 0.8s, border-color 0.8s;
  width: fit-content;
}
.hud-counter {
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  font-weight: bold;
}
.hud-count-current {
  font-size: 2.5rem;
  line-height: 1;
  transition: color 0.8s;
}
.hud-count-sep, .hud-count-total {
  color: rgba(255,255,255,0.3);
  font-size: 1.2rem;
}

/* ── CENTER LEFT ── */
.hud-center-left {
  grid-column: 1; grid-row: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
}
.hud-icon {
  font-size: 5rem;
  line-height: 1;
  animation: iconFloat 3s ease-in-out infinite;
  transition: text-shadow 0.8s;
}
@keyframes iconFloat {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}
.hud-titles { display: flex; flex-direction: column; gap: 0.4rem; }
.hud-title {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  transition: color 0.8s;
  text-shadow: 0 0 40px currentColor;
  line-height: 1.1;
}
.hud-subtitle {
  margin: 0;
  font-size: 1rem;
  color: rgba(255,255,255,0.5);
  font-weight: 400;
}
.hud-short {
  display: inline-block;
  padding: 0.3rem 0.9rem;
  border-radius: 8px;
  border: 1px solid;
  font-size: 0.85rem;
  font-weight: 700;
  font-family: 'Courier New', monospace;
  width: fit-content;
  transition: all 0.8s;
}

/* ── CENTER RIGHT ── */
.hud-center-right {
  grid-column: 2; grid-row: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.hud-desc-card {
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.1);
  border-right: 3px solid var(--c, #10b981);
  border-radius: 16px;
  padding: 1.75rem;
  max-width: 420px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
  transition: border-right-color 0.8s;
}
.hud-desc-card p {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.8;
  color: #cbd5e1;
}

/* ── BOTTOM RIGHT ── */
.hud-bottom-right {
  grid-column: 2; grid-row: 3;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
.hud-analogy {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.07);
  border-right: 3px solid;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  max-width: 360px;
  transition: border-right-color 0.8s;
}
.hud-analogy h4 {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.7);
  font-weight: 400;
}

/* ── PROGRESS BAR ── */
.hud-progress-bar {
  grid-column: 1 / -1; grid-row: 4;
  position: fixed;
  bottom: 0; left: 0; right: 0;
  height: 3px;
  background: rgba(255,255,255,0.08);
  z-index: 100;
}
.hud-progress-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1), background 0.8s;
  box-shadow: 0 0 12px currentColor;
}

/* ── HUD Transition ── */
.hud-enter-active, .hud-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.hud-enter-from { opacity: 0; transform: translateY(20px) scale(0.97); }
.hud-leave-to   { opacity: 0; transform: translateY(-20px) scale(0.97); }

/* ── Mobile ── */
@media (max-width: 768px) {
  .hud-root {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
    --hud-pad: 1.25rem;
    gap: 0.75rem;
  }
  .hud-center-left { grid-column: 1; grid-row: 2; }
  .hud-center-right { grid-column: 1; grid-row: 3; justify-content: flex-start; }
  .hud-bottom-right { grid-column: 1; grid-row: 4; justify-content: flex-start; }
  .hud-desc-card { max-width: 100%; }
  .hud-analogy { max-width: 100%; }
  .hud-icon { font-size: 3rem; }
  .hud-title { font-size: 2rem; }
}
</style>
