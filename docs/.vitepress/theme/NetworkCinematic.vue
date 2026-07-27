<!-- NetworkCinematic.vue — Cinematic Journey Mode -->
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { concepts, groups } from './NetworkData.js'

const emit = defineEmits(['close'])

const activeIndex = ref(0)
const activeConcept = computed(() => concepts[activeIndex.value] || concepts[0])
const activeGroup   = computed(() => groups[activeConcept.value.group])

const activeBg = computed(() => activeConcept.value.img || activeGroup.value?.bg || '')

// ── Auto-play ──────────────────────────────────────────
const autoSpeed    = ref(5)        // seconds
const isAutoPlay   = ref(false)
const speedOptions = [3, 5, 8, 12]
let autoTimer = null

function startAuto() {
  stopAuto()
  autoTimer = setInterval(() => {
    if (activeIndex.value < concepts.length - 1) {
      goTo(activeIndex.value + 1)
    } else {
      stopAuto()
    }
  }, autoSpeed.value * 1000)
}

function stopAuto() {
  clearInterval(autoTimer)
  autoTimer = null
  isAutoPlay.value = false
}

function toggleAuto() {
  if (isAutoPlay.value) {
    stopAuto()
  } else {
    isAutoPlay.value = true
    startAuto()
  }
}

function setSpeed(s) {
  autoSpeed.value = s
  if (isAutoPlay.value) startAuto()  // restart with new speed
}

// ── Scroll progress ────────────────────────────────────
const scrollProgress = ref(0)
const rootEl = ref(null)

const onScroll = () => {
  if (!rootEl.value) return
  const el = rootEl.value
  const isDesktop = window.innerWidth > 768

  if (isDesktop) {
    const max = el.scrollWidth - el.clientWidth
    scrollProgress.value = max > 0 ? (Math.abs(el.scrollLeft) / max) * 100 : 0
  } else {
    const max = el.scrollHeight - el.clientHeight
    scrollProgress.value = max > 0 ? (el.scrollTop / max) * 100 : 0
  }
}

// ── Section tracking via IntersectionObserver ──────────
const sectionRefs = []
const setRef = (el, i) => { if (el) sectionRefs[i] = el }
let observer = null

// ── Navigation ─────────────────────────────────────────
const goTo = (index) => {
  if (index < 0 || index >= concepts.length) return
  if (sectionRefs[index]) {
    sectionRefs[index].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
  }
}
const next = () => goTo(activeIndex.value + 1)
const prev = () => goTo(activeIndex.value - 1)

// ── Keyboard ───────────────────────────────────────────
const onKey = (e) => {
  if (e.key === 'Escape')      emit('close')
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown')  next()
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')    prev()
  if (e.key === ' ')           { e.preventDefault(); toggleAuto() }
}

onMounted(() => {
  if (rootEl.value) rootEl.value.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeIndex.value = parseInt(entry.target.getAttribute('data-index'), 10)
      }
    })
  }, { root: rootEl.value, threshold: 0.5 })

  sectionRefs.forEach(r => { if (r) observer.observe(r) })

  // Reset scroll to the very beginning (hero section)
  // For desktop RTL horizontal: scrollLeft must go to the far right (max)
  // For mobile vertical: scrollTop = 0
  // Reset to beginning
  requestAnimationFrame(() => {
    if (!rootEl.value) return
    rootEl.value.scrollLeft = 0
    rootEl.value.scrollTop = 0
    activeIndex.value = 0
  })
})

onUnmounted(() => {
  if (rootEl.value) rootEl.value.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
  if (observer) observer.disconnect()
  stopAuto()
})
</script>

<template>
  <div class="nc-overlay">

    <!-- ── Fixed Nav: PREV (Left) ── -->
    <button
      class="nc-side-btn nc-side-prev"
      :disabled="activeIndex === 0"
      @click="prev"
      aria-label="السابق"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
    </button>

    <!-- ── Fixed Nav: NEXT (Right) ── -->
    <button
      class="nc-side-btn nc-side-next"
      :disabled="activeIndex === concepts.length - 1"
      @click="next"
      aria-label="التالي"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
    </button>

    <!-- ── Top Control Bar (Desktop only) ── -->
    <div class="nc-top-bar">
      <!-- Close -->
      <button class="nc-close-btn" @click="$emit('close')">
        ✕ إغلاق
      </button>

      <!-- Spacer -->
      <div style="flex:1"></div>

      <!-- Progress label -->
      <span class="nc-progress-label">
        {{ activeIndex + 1 }} / {{ concepts.length }}
      </span>

      <!-- Auto-play controls -->
      <div class="nc-auto-controls">
        <!-- Speed selector -->
        <div class="nc-speed-group">
          <span class="nc-speed-label">التلقائي:</span>
          <button
            v-for="s in speedOptions"
            :key="s"
            class="nc-speed-btn"
            :class="{ active: autoSpeed === s }"
            @click="setSpeed(s)"
          >{{ s }}s</button>
        </div>

        <!-- Play / Pause toggle -->
        <button class="nc-play-btn" :class="{ playing: isAutoPlay }" @click="toggleAuto">
          <span v-if="isAutoPlay">⏸ إيقاف</span>
          <span v-else>▶ تشغيل تلقائي</span>
        </button>
      </div>
    </div>

    <!-- ── Mobile Bottom Bar ── -->
    <div class="nc-mobile-bar">
      <span class="nc-mob-counter">{{ activeIndex + 1 }} / {{ concepts.length }}</span>
      <div class="nc-mob-wire">
        <div class="nc-mob-wire-fill" :style="{ width: scrollProgress + '%', background: activeGroup?.color || '#10b981' }"></div>
      </div>
      <button class="nc-mob-close" @click="$emit('close')">✕</button>
    </div>
    <!-- ── Main Scroll Area ── -->
    <div class="nc-root" ref="rootEl">

      <!-- Cinematic Fixed Background -->
      <div class="nc-bg-container">
        <transition name="fade-bg">
          <div :key="activeBg" class="nc-bg-image" :style="{ backgroundImage: `url(${activeBg})` }"></div>
        </transition>
        <div class="nc-bg-overlay"></div>
      </div>

      <!-- Fixed Wire / Timeline -->
      <div
        class="nc-wire-container"
        :style="{ '--progress': scrollProgress + '%', '--active-color': activeGroup?.color || '#10b981' }"
      >
        <div class="nc-wire-bg"></div>
        <div class="nc-wire-fill"></div>
        <div class="nc-packet">
          <div class="nc-packet-inner"></div>
        </div>
      </div>

      <!-- Scrolling Content -->
      <main class="nc-scroll-content">

        <!-- Hero -->
        <section class="nc-section nc-hero">
          <h1 class="hero-title">الرحلة السينمائية للبيانات</h1>
          <p class="hero-subtitle">{{ concepts.length }} محطة · مرر أو استخدم الأسهم جانباً</p>
          <div class="scroll-indicator"><div class="mouse"></div></div>
        </section>

        <!-- 29 Stations -->
        <section
          v-for="(c, i) in concepts"
          :key="c.id"
          :ref="el => setRef(el, i)"
          :data-index="i"
          class="nc-section"
        >
          <div class="glass-card" :class="{ 'is-active': activeIndex === i }">
            <div class="nc-branch" :class="{ lit: activeIndex === i }"></div>

            <div class="card-header">
              <span class="card-icon">{{ c.icon }}</span>
              <div class="card-titles">
                <span class="card-subtitle" :style="{ color: activeGroup?.color }">{{ c.subtitle }}</span>
                <h2 class="card-title">{{ c.title || c.shortTitle }}</h2>
              </div>
            </div>

            <p class="card-desc">{{ c.description }}</p>

            <div v-if="c.analogy" class="analogy-box" :style="{ borderColor: (activeGroup?.color || '#10b981') + '44' }">
              <span class="analogy-icon">{{ c.analogy.icon }}</span>
              <p class="analogy-text">{{ c.analogy.text }}</p>
            </div>

            <div class="card-meta">
              <div class="meta-tag">
                <span class="meta-label">الطبقة:</span>
                <span class="meta-value" :style="{ color: activeGroup?.color }">{{ activeGroup?.name }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- End -->
        <section class="nc-section nc-footer">
          <h2 class="hero-title">🎉 نهاية الرحلة</h2>
          <p class="hero-subtitle">لقد أكملت رحلة {{ concepts.length }} محطة عبر طبقات الشبكة</p>
        </section>

      </main>
    </div>
  </div>
</template>

<style scoped>
/* ── Overlay Root ── */
.nc-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #000;
}

/* ── Top Control Bar ── */
.nc-top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10001;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.nc-close-btn {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.15);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 99px;
  cursor: pointer;
  font-family: 'Cairo', sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.2s;
}
.nc-close-btn:hover { background: rgba(255,255,255,0.2); }

.nc-progress-label {
  color: rgba(255,255,255,0.5);
  font-size: 0.85rem;
  font-weight: 600;
  font-family: 'Cairo', sans-serif;
  white-space: nowrap;
}

/* Auto-play controls */
.nc-auto-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.nc-speed-group {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 99px;
  padding: 0.25rem 0.75rem;
}

.nc-speed-label {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.4);
  font-family: 'Cairo', sans-serif;
  white-space: nowrap;
}

.nc-speed-btn {
  background: transparent;
  border: 1px solid transparent;
  color: rgba(255,255,255,0.4);
  padding: 0.2rem 0.5rem;
  border-radius: 99px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 700;
  transition: all 0.2s;
}
.nc-speed-btn:hover { color: #fff; }
.nc-speed-btn.active {
  border-color: rgba(255,255,255,0.3);
  color: #fff;
  background: rgba(255,255,255,0.12);
}

.nc-play-btn {
  background: rgba(16,185,129,0.15);
  border: 1px solid rgba(16,185,129,0.35);
  color: #10b981;
  padding: 0.4rem 1rem;
  border-radius: 99px;
  cursor: pointer;
  font-family: 'Cairo', sans-serif;
  font-weight: 700;
  font-size: 0.82rem;
  transition: all 0.25s;
  white-space: nowrap;
}
.nc-play-btn:hover { background: rgba(16,185,129,0.3); }
.nc-play-btn.playing {
  background: rgba(239,68,68,0.15);
  border-color: rgba(239,68,68,0.35);
  color: #ef4444;
}

/* ── Fixed Side Navigation Arrows ── */
.nc-side-btn {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10001;
  width: 52px; height: 52px;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.25s ease;
}
.nc-side-btn:hover:not(:disabled) {
  background: rgba(255,255,255,0.15);
  transform: translateY(-50%) scale(1.1);
}
.nc-side-btn:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}
.nc-side-prev { left: 16px; }
.nc-side-next { right: 16px; }

/* ── Main scroll container ── */
.nc-root {
  position: absolute;
  inset: 0;
  padding-top: 60px; /* height of top bar */
  background: #000;
  color: #fff;
  font-family: 'Cairo', sans-serif;
  direction: rtl;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  /* NOTE: no scroll-behavior:smooth here — it fights snap on mobile */
  box-sizing: border-box;
}

/* ── Background ── */
.nc-bg-container {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}
.nc-bg-image {
  position: absolute;
  inset: -5%;
  background-size: cover;
  background-position: center;
  animation: slowZoom 25s infinite alternate linear;
}
@keyframes slowZoom {
  0%   { transform: scale(1); }
  100% { transform: scale(1.1); }
}
.nc-bg-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.85)),
    radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.5) 100%);
}
.fade-bg-enter-active, .fade-bg-leave-active { transition: opacity 1.5s ease; }
.fade-bg-enter-from, .fade-bg-leave-to { opacity: 0; }

/* ── Wire / Timeline ── */
.nc-wire-container {
  position: fixed;
  z-index: 20;
  pointer-events: none;
  /* Mobile: right vertical strip */
  top: 60px; bottom: 0; right: 12px; width: 4px;
}
.nc-wire-bg {
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.08);
  border-radius: 2px;
}
.nc-wire-fill {
  position: absolute;
  border-radius: 2px;
  background: var(--active-color);
  transition: background 0.5s ease;
  /* Mobile: vertical fill */
  top: 0; left: 0; right: 0; height: var(--progress);
}
.nc-packet {
  position: absolute;
  background: #0f172a;
  border: 3px solid var(--active-color);
  box-shadow: 0 0 15px var(--active-color);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  transition: border-color 0.5s, box-shadow 0.5s;
  z-index: 21;
  /* Mobile: rides the vertical fill */
  right: 50%; top: var(--progress);
  transform: translateY(-50%) translateX(50%);
  width: 18px; height: 18px;
}
.nc-packet-inner {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--active-color);
  transition: background 0.5s;
  animation: pulse 1.5s infinite;
}
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(0.5); opacity: 0.5; }
}

/* ── Scroll Content ── */
.nc-scroll-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding-right: 30px;
  padding-left: 10px;
}

/* ── Sections ── */
.nc-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  scroll-snap-align: start;
  scroll-snap-stop: always; /* prevent multi-section skip on fast swipe */
  padding: 1.5rem 0;
}

/* ── Branch connector ── */
.nc-branch {
  position: absolute;
  background: rgba(255,255,255,0.1);
  transition: all 0.5s ease;
  z-index: -1;
  opacity: 0.2;
  /* Mobile: right line to wire */
  top: 50%; right: -24px;
  width: 24px; height: 2px;
  transform: translateY(-50%);
}
.nc-branch.lit {
  opacity: 1;
  background: var(--active-color, #10b981);
  box-shadow: 0 0 8px var(--active-color, #10b981);
}

/* ──────────────────── Desktop ────────────────── */
@media (min-width: 769px) {
  .nc-side-prev { left: 30px; }
  .nc-side-next { right: 30px; }

  .nc-root {
    overflow-y: hidden;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
  }

  .nc-scroll-content {
    flex-direction: row; /* hero first at scrollLeft=0 */
    padding-right: 0;
    padding-left: 0;
    padding-bottom: 80px; /* space for bottom timeline */
    width: max-content;
    height: 100%;
    align-items: center;
  }

  .nc-section {
    width: 100vw;
    height: 100%;
    padding: 0;
    align-items: center;
  }

  /* Timeline at bottom */
  .nc-wire-container {
    top: auto; bottom: 28px;
    right: 80px; left: 80px;
    width: auto; height: 4px;
  }
  .nc-wire-fill {
    top: 0; bottom: 0; left: 0; right: auto;
    height: auto;
    width: var(--progress);
  }
  .nc-packet {
    top: 50%; left: var(--progress); right: auto;
    transform: translateY(-50%) translateX(-50%);
    width: 22px; height: 22px;
  }

  /* Branch drops down from card to timeline */
  .nc-branch {
    top: auto; bottom: -54px; right: 50%;
    width: 2px; height: 54px;
    transform: translateX(50%);
  }
}

/* ──── Mobile Typography ──── */
@media (max-width: 768px) {
  /* Hide desktop elements */
  .nc-top-bar      { display: none; }
  .nc-auto-controls { display: none; }
  .nc-side-btn     { display: none; }

  /* Root padding: no top bar on mobile, leave room for bottom bar */
  .nc-root { padding-top: 0; padding-bottom: 52px; }

  /* Show mobile bottom bar */
  .nc-mobile-bar {
    display: flex;
    position: fixed;
    bottom: 0; left: 0; right: 0;
    z-index: 10002;
    align-items: center;
    gap: 0.75rem;
    padding: 0 1rem;
    height: 52px;
    background: rgba(0,0,0,0.85);
    backdrop-filter: blur(16px);
    border-top: 1px solid rgba(255,255,255,0.08);
  }

  .nc-mob-counter {
    font-size: 0.78rem;
    font-weight: 700;
    color: rgba(255,255,255,0.45);
    font-family: 'Inter', monospace;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .nc-mob-wire {
    flex: 1;
    height: 3px;
    background: rgba(255,255,255,0.1);
    border-radius: 2px;
    overflow: hidden;
  }
  .nc-mob-wire-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 0.3s ease, background 0.5s ease;
  }

  .nc-mob-close {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.6);
    width: 34px; height: 34px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 0.9rem;
    transition: all 0.2s;
    flex-shrink: 0;
  }
  .nc-mob-close:hover { background: rgba(255,255,255,0.15); color: #fff; }

  /* Card & text */
  .glass-card { padding: 1.5rem; border-radius: 16px; }
  .hero-title  { font-size: 2.2rem; }
  .card-title  { font-size: 1.6rem; }
  .card-icon   { font-size: 2.2rem; }
  .card-desc   { font-size: 0.95rem; }
}

/* Hide mobile bar on desktop */
.nc-mobile-bar { display: none; }

/* ── Card ── */
.glass-card {
  position: relative;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 24px;
  padding: 2.5rem;
  max-width: 680px;
  width: calc(100% - 2rem);
  box-shadow: 0 20px 40px rgba(0,0,0,0.6);
  margin: 0 auto;
  opacity: 0.15;
  transform: translateY(40px) scale(0.95);
  transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.glass-card.is-active {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
}
.card-icon {
  font-size: 2.8rem;
  filter: drop-shadow(0 0 10px rgba(255,255,255,0.3));
  flex-shrink: 0;
}
.card-titles { display: flex; flex-direction: column; }
.card-subtitle {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 0.2rem;
}
.card-title {
  font-size: 2rem;
  font-weight: 800;
  margin: 0;
  line-height: 1.2;
  color: #fff;
}

.card-desc {
  font-size: 1.05rem;
  line-height: 1.8;
  color: rgba(255,255,255,0.85);
  margin-bottom: 1.5rem;
}

/* Analogy Box */
.analogy-box {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  border: 1px solid;
  border-radius: 14px;
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
  background: rgba(255,255,255,0.04);
}
.analogy-icon { font-size: 1.6rem; flex-shrink: 0; margin-top: 0.1rem; }
.analogy-text {
  font-size: 0.92rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.75);
  margin: 0;
}

.card-meta { display: flex; gap: 0.75rem; flex-wrap: wrap; }
.meta-tag {
  background: rgba(255,255,255,0.08);
  padding: 0.3rem 0.9rem;
  border-radius: 99px;
  display: flex; gap: 0.4rem;
  font-size: 0.82rem;
}
.meta-label { color: rgba(255,255,255,0.4); }
.meta-value { font-weight: 700; }

/* Hero & Footer */
.nc-hero, .nc-footer { text-align: center; }
.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
  text-shadow: 0 0 30px rgba(255,255,255,0.2);
}
.hero-subtitle { font-size: 1.2rem; color: rgba(255,255,255,0.6); }

/* Mouse scroll indicator */
.scroll-indicator { margin-top: 2.5rem; display: flex; justify-content: center; }
.mouse {
  width: 28px; height: 46px;
  border: 2px solid rgba(255,255,255,0.5);
  border-radius: 14px;
  position: relative;
}
.mouse::before {
  content: '';
  position: absolute;
  top: 8px; left: 50%;
  transform: translateX(-50%);
  width: 5px; height: 5px;
  background: rgba(255,255,255,0.6);
  border-radius: 50%;
  animation: scrollAnim 1.5s infinite;
}
@keyframes scrollAnim {
  0%   { transform: translate(-50%, 0); opacity: 1; }
  100% { transform: translate(-50%, 18px); opacity: 0; }
}
</style>
