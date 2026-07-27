<script setup>
import { shallowRef } from 'vue'

const modules = import.meta.glob('../../hisn/milestones/[0-9]*.md', { eager: true })

const milestones = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b)) // oldest first
  .map(([path, mod]) => {
    const fileName = path.split('/').pop()
    const num = fileName.match(/^(\d+)/)?.[1] || ''
    return {
      path,
      num,
      component: mod.default,
      frontmatter: mod.__pageData?.frontmatter || {}
    }
  })

const total = milestones.length
</script>

<template>
  <div class="msp-root">

    <!-- Header -->
    <header class="msp-header">
      <div class="msp-badge">
        <span class="badge-dot"></span>
        <span>HISN-SEL4 DEVELOPMENT LOG</span>
      </div>

      <div class="msp-icon-wrap">
        <div class="ring ring-1"></div>
        <div class="ring ring-2"></div>
        <span class="msp-main-icon">🏆</span>
      </div>

      <h1 class="msp-title">سجل <span class="gold-text">الإنجازات</span></h1>
      <p class="msp-sub">
        كل خطوة في رحلة بناء نظام <strong>Hisn-seL4</strong> — من الفكرة إلى النواة الأمنية المُثبتة رياضياً
      </p>

      <!-- Counter -->
      <div class="msp-counter-bar">
        <div class="msp-counter-item">
          <span class="msp-counter-num">{{ total }}</span>
          <span class="msp-counter-label">إنجازاً موثقاً</span>
        </div>
        <div class="msp-counter-divider"></div>
        <div class="msp-counter-item">
          <span class="msp-counter-num">seL4</span>
          <span class="msp-counter-label">Formally Verified Kernel</span>
        </div>
        <div class="msp-counter-divider"></div>
        <div class="msp-counter-item">
          <span class="msp-counter-num">🦀</span>
          <span class="msp-counter-label">100% Rust Userspace</span>
        </div>
      </div>
    </header>

    <!-- Milestones list -->
    <main class="msp-list">
      <div class="msp-timeline-line"></div>
      <Milestone
        v-for="(item, index) in milestones"
        :key="index"
        :title="item.frontmatter.title || 'Untitled'"
        :date="item.frontmatter.date || ''"
        :icon="item.frontmatter.icon || '📌'"
        :cat="item.frontmatter.cat || ''"
        :num="item.num"
      >
        <component :is="item.component" />
      </Milestone>
    </main>
  </div>
</template>

<style scoped>
.msp-root {
  position: relative;
  min-height: 100vh;
  padding: calc(var(--vp-nav-height) + 2.5rem) 1rem 6rem;
  font-family: 'Cairo', 'Inter', system-ui, sans-serif;
  max-width: 860px;
  margin: 0 auto;
  overflow: hidden;
}

/* Ambient decoration via pseudo-elements */
.msp-root::before {
  content: '';
  position: absolute;
  width: 600px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245,158,11,0.15), transparent 70%);
  filter: blur(80px);
  top: -200px; right: -200px;
  pointer-events: none;
  z-index: 0;
}
.msp-root::after {
  content: '';
  position: absolute;
  width: 500px; height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(139,92,246,0.12), transparent 70%);
  filter: blur(80px);
  bottom: -150px; left: -200px;
  pointer-events: none;
  z-index: 0;
}

/* Header */
.msp-header {
  position: relative;
  z-index: 1;
  text-align: center;
  margin-bottom: 3rem;
}

.msp-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  color: var(--vp-c-text-3);
  border: 1px solid var(--vp-c-divider);
  border-radius: 100px;
  padding: 0.35rem 1rem;
  margin-bottom: 1.5rem;
  background: var(--vp-c-bg-soft);
}
.badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #f59e0b;
  box-shadow: 0 0 8px #f59e0b;
  animation: pulse-gold 2s infinite;
}
@keyframes pulse-gold {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.msp-icon-wrap {
  position: relative;
  width: 90px; height: 90px;
  margin: 0 auto 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid;
}
.ring-1 {
  border-color: color-mix(in srgb, #f59e0b 30%, transparent);
  animation: spin 20s linear infinite;
}
.ring-2 {
  inset: -10px;
  border-style: dashed;
  border-color: color-mix(in srgb, #f59e0b 15%, transparent);
  animation: spin 35s linear infinite reverse;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.msp-main-icon {
  font-size: 3rem;
  filter: drop-shadow(0 0 20px rgba(245, 158, 11, 0.5));
}

.msp-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  margin: 0 0 0.75rem;
  color: var(--vp-c-text-1);
  border: none;
  padding: 0;
  line-height: 1.2;
}
.gold-text {
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.msp-sub {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  max-width: 560px;
  margin: 0 auto 1.75rem;
  line-height: 1.7;
}

.msp-counter-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 0.85rem 2rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 100px;
  width: fit-content;
  margin: 0 auto;
}
.msp-counter-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
}
.msp-counter-num {
  font-size: 1.1rem;
  font-weight: 900;
  color: #f59e0b;
}
.msp-counter-label {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}
.msp-counter-divider {
  width: 1px; height: 24px;
  background: var(--vp-c-divider);
}

/* List */
.msp-list {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.msp-timeline-line {
  position: absolute;
  right: 22px;
  top: 0; bottom: 0;
  width: 1px;
  background: linear-gradient(
    180deg,
    transparent,
    color-mix(in srgb, #f59e0b 30%, transparent) 20%,
    color-mix(in srgb, #f59e0b 15%, transparent) 80%,
    transparent
  );
  pointer-events: none;
}

@media (max-width: 600px) {
  .msp-counter-bar { flex-wrap: wrap; border-radius: 20px; gap: 1rem; }
  .msp-counter-divider { display: none; }
  .msp-timeline-line { display: none; }
}
</style>
