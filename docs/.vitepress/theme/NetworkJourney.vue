<!-- NetworkJourney.vue — Main Orchestrator: Journey along the wire -->
<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { concepts } from './NetworkData.js'
import NetworkStation from './NetworkStation.vue'

const scrollEl   = ref(null)
const activeIdx  = ref(0)
const fillHeight = ref(0)

function onScroll() {
  const el = scrollEl.value
  if (!el) return
  
  // Calculate fill height to exactly match the center of the viewport
  const viewportCenter = el.scrollTop + el.clientHeight / 2
  fillHeight.value = viewportCenter

  // Determine active index based on scroll position
  // We approximate: hero is 100vh, end is 80vh, stations are equally spaced
  const maxScroll = el.scrollHeight - el.clientHeight
  if (maxScroll <= 0) return
  
  const pct = Math.min(Math.max(el.scrollTop / maxScroll, 0), 1)
  const idx = Math.min(Math.floor(pct * concepts.length), concepts.length - 1)
  activeIdx.value = idx
}

onMounted(() => {
  scrollEl.value?.addEventListener('scroll', onScroll, { passive: true })
  onScroll() // init
})
onUnmounted(() => {
  scrollEl.value?.removeEventListener('scroll', onScroll)
})

const activeConcept = computed(() => concepts[activeIdx.value] || concepts[0])
</script>

<template>
  <div class="nj-root" ref="scrollEl">

    <!-- ─── Scrollable Content ─── -->
    <main class="nj-content">

      <!-- ─── Absolute Wire Container (spans full scroll height) ─── -->
      <div class="nj-wire-container">
        <div class="nj-wire-bg"></div>
        <div class="nj-wire-fill" :style="{ height: fillHeight + 'px', background: activeConcept.color }"></div>
        
        <!-- The Packet: Sticky in the middle of the viewport -->
        <div class="nj-packet" :style="{ borderColor: activeConcept.color, boxShadow: `0 0 15px ${activeConcept.color}` }">
          <div class="nj-packet-inner" :style="{ background: activeConcept.color }"></div>
        </div>
      </div>

      <!-- Opening hero -->
      <div class="nj-hero">
        <h1>رحلة الرزمة 📦</h1>
        <p>من جهازك إلى الخادم وعبر 29 محطة مرسومة — <strong>مرِّر للأسفل</strong> لتبدأ الرحلة</p>
        <div class="nj-scroll-hint">↓</div>
      </div>

      <!-- One station per concept -->
      <NetworkStation
        v-for="(c, i) in concepts"
        :key="c.id"
        :concept="c"
        :index="i"
        :isActive="i === activeIdx"
      />

      <!-- End -->
      <div class="nj-end">
        <div class="nj-end-icon">🌍</div>
        <h2>وصلت! أنت الآن تفهم كيف تسافر بياناتك عبر العالم.</h2>
      </div>

    </main>
  </div>
</template>

<style scoped>
.nj-root {
  height: calc(100vh - var(--vp-nav-height));
  background: #08090f;
  color: #e2e8f0;
  font-family: 'Cairo', 'Segoe UI', sans-serif;
  direction: rtl;
  overflow-y: scroll;
  scroll-behavior: smooth;
  position: relative;
}

/* ─── Absolute Wire Track ─── */
.nj-wire-container {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 20px; /* Inside the content wrapper's padding */
  width: 4px;
  z-index: 10;
  pointer-events: none;
}

@media (max-width: 768px) {
  .nj-wire-container { right: 10px; }
}

.nj-wire-bg {
  position: absolute;
  top: 0; bottom: 0; left: 0; right: 0;
  background: rgba(255,255,255,0.05);
  border-radius: 2px;
}

.nj-wire-fill {
  position: absolute;
  top: 0; left: 0; right: 0;
  border-radius: 2px;
  transition: background 0.5s ease; /* Only color transitions, height is instant to stick with scroll */
}

.nj-packet {
  position: sticky;
  top: 50%; /* Stays in the middle of the screen */
  transform: translateY(-50%) translateX(50%); /* Center it on the wire */
  width: 20px;
  height: 20px;
  background: #0f172a;
  border: 3px solid #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.5s ease, box-shadow 0.5s ease;
}

.nj-packet-inner {
  width: 8px; height: 8px;
  border-radius: 50%;
  transition: background 0.5s ease;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(0.5); opacity: 0.5; }
}

/* ─── Content Area ─── */
.nj-content {
  position: relative;
  z-index: 5;
  padding-right: 80px; /* Leave space for the wire */
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .nj-content { padding-right: 40px; }
}

/* ─── Hero ─── */
.nj-hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}
.nj-hero h1 {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  margin: 0 0 1.5rem;
  color: #10b981;
  text-shadow: 0 4px 20px rgba(16,185,129,0.4);
}
.nj-hero p { font-size: 1.25rem; color: #94a3b8; max-width: 600px; line-height: 1.6; }
.nj-scroll-hint {
  margin-top: 4rem;
  font-size: 2.5rem;
  animation: bounce 1.5s ease-in-out infinite;
  color: #10b981;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(15px); }
}

/* ─── End Screen ─── */
.nj-end {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}
.nj-end-icon { font-size: 6rem; margin-bottom: 1.5rem; animation: spin 20s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.nj-end h2 { font-size: 1.6rem; color: #10b981; max-width: 500px; line-height: 1.6; }
</style>
