<template>
  <article class="ms-card" :class="{ 'is-open': isOpen }" @click="toggle">
    <!-- Glow accent top bar -->
    <div class="ms-accent-bar"></div>

    <!-- Number badge (absolute) -->
    <span class="ms-num-badge" v-if="num">#{{ num }}</span>

    <!-- Header -->
    <div class="ms-header">
      <div class="ms-icon-ring">
        <span class="ms-icon">{{ icon }}</span>
      </div>

      <div class="ms-header-text">
        <h3 class="ms-title">{{ title }}</h3>
        <div class="ms-meta-row">
          <span class="ms-date" v-if="date">
            <span class="ms-date-icon">🗓</span>
            {{ date }}
          </span>
          <span class="ms-cat-pill" v-if="cat">{{ cat }}</span>
        </div>
      </div>

      <span class="ms-chevron" :class="{ rotated: isOpen }">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </span>
    </div>

    <!-- Body (collapses) -->
    <div class="ms-body" v-show="isOpen" @click.stop>
      <div class="ms-body-inner">
        <slot />
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title: String,
  date: String,
  icon: String,
  cat: String,
  num: String
})

const isOpen = ref(false)
function toggle() { isOpen.value = !isOpen.value }
</script>

<style scoped>
.ms-card {
  position: relative;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.25s, box-shadow 0.3s, transform 0.2s;
  user-select: none;
}

.ms-card:hover {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 40%, transparent);
  box-shadow: 0 4px 24px color-mix(in srgb, var(--vp-c-brand-1) 10%, transparent);
  transform: translateY(-1px);
}

.ms-card.is-open {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 60%, transparent);
  box-shadow: 0 8px 32px color-mix(in srgb, var(--vp-c-brand-1) 15%, transparent);
}

/* Top accent bar */
.ms-accent-bar {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg,
    transparent 0%,
    var(--vp-c-brand-1) 30%,
    color-mix(in srgb, var(--vp-c-brand-2) 70%, #fff) 50%,
    var(--vp-c-brand-1) 70%,
    transparent 100%
  );
  opacity: 0;
  transition: opacity 0.3s;
}
.ms-card:hover .ms-accent-bar,
.ms-card.is-open .ms-accent-bar {
  opacity: 1;
}

/* Number badge */
.ms-num-badge {
  position: absolute;
  top: 10px;
  left: 14px;
  font-size: 0.65rem;
  font-weight: 800;
  color: var(--vp-c-brand-1);
  letter-spacing: 0.05em;
  opacity: 0.6;
}

/* Header */
.ms-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px 14px 46px;
}

.ms-icon-ring {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 10%, var(--vp-c-bg));
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 20%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
  transition: background 0.3s, transform 0.3s;
}
.ms-card:hover .ms-icon-ring {
  background: color-mix(in srgb, var(--vp-c-brand-1) 18%, var(--vp-c-bg));
  transform: scale(1.08) rotate(-4deg);
}

.ms-header-text {
  flex: 1;
  min-width: 0;
  text-align: right;
}

.ms-title {
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0 0 4px;
  color: var(--vp-c-text-1);
  border: none;
  padding: 0;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ms-meta-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.ms-date {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
}
.ms-date-icon { font-size: 0.75rem; }

.ms-cat-pill {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 100px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
  color: var(--vp-c-brand-1);
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 25%, transparent);
}

/* Chevron */
.ms-chevron {
  color: var(--vp-c-text-3);
  display: flex;
  align-items: center;
  transition: color 0.2s, transform 0.3s;
  flex-shrink: 0;
}
.ms-chevron.rotated {
  transform: rotate(180deg);
  color: var(--vp-c-brand-1);
}
.ms-card:hover .ms-chevron {
  color: var(--vp-c-text-2);
}

/* Body */
.ms-body {
  border-top: 1px solid var(--vp-c-divider);
  cursor: default;
}

.ms-body-inner {
  padding: 18px 22px 18px 22px;
  font-size: 0.9rem;
  line-height: 1.75;
  color: var(--vp-c-text-2);
}

.ms-body-inner :deep(p) { margin: 0.4rem 0; }
.ms-body-inner :deep(code) {
  font-size: 0.82rem;
  background: var(--vp-c-bg-mute);
  padding: 2px 6px;
  border-radius: 4px;
}
.ms-body-inner :deep(strong) { color: var(--vp-c-text-1); }

@media (max-width: 600px) {
  .ms-title { font-size: 0.87rem; }
  .ms-header { gap: 10px; padding: 12px 14px 12px 42px; }
  .ms-icon-ring { width: 38px; height: 38px; font-size: 1.2rem; }
}
</style>
