<script setup>
import { ref, computed, onMounted } from 'vue'
import PhoneCinematic from './PhoneCinematic.vue'

import { phoneGroups, phoneConcepts as concepts } from './phoneData.js'

const groups = phoneGroups.map(g => ({
  ...g,
  concepts: concepts.filter(c => c.group === g.id)
}))
const selectedId = ref('soc')
const active = computed(() => concepts.find(c => c.id === selectedId.value))

const initialGroup = groups.find(g => g.concepts.some(c => c.id === selectedId.value))?.id
const expandedGroups = ref(new Set([initialGroup]))

function toggleGroup(groupId) {
  const s = new Set(expandedGroups.value)
  s.has(groupId) ? s.delete(groupId) : s.add(groupId)
  expandedGroups.value = s
}

function selectConcept(conceptId, groupId) {
  selectedId.value = conceptId
  const s = new Set(expandedGroups.value)
  s.add(groupId)
  expandedGroups.value = s
}

// Mobile navigation
const activeIdx = computed(() => concepts.findIndex(c => c.id === selectedId.value))
function goNext() {
  const i = activeIdx.value
  if (i < concepts.length - 1) selectedId.value = concepts[i + 1].id
}
function goPrev() {
  const i = activeIdx.value
  if (i > 0) selectedId.value = concepts[i - 1].id
}

const showCinematic = ref(false)

onMounted(() => {
  if (window.innerWidth <= 768) {
    showCinematic.value = true
  }
})
</script>

<template>
  <div class="rc-root">

    <!-- Ambient BG -->
    <div class="rc-bg">
      <div class="rc-orb orb-1"></div>
      <div class="rc-orb orb-2"></div>
      <div class="rc-grid"></div>
    </div>

    <!-- Floating Cinematic Button -->
    <button class="cinematic-floating-btn" @click="showCinematic = true">
      <span>🎬</span>
      <span class="btn-text">العرض التقديمي</span>
    </button>

    <!-- ── Main Layout ── -->
    <div class="rc-layout">

      <!-- Sidebar -->
      <aside class="rc-sidebar">
        <div v-for="group in groups" :key="group.id" class="rc-nav-group">
          <!-- Accordion Header -->
          <button class="rc-nav-group-btn" @click="toggleGroup(group.id)">
            <span class="gl-dot" :style="`background: ${group.color}`"></span>
            <span class="gl-label">{{ group.label }}</span>
            <span class="gl-chevron" :class="{ open: expandedGroups.has(group.id) }">›</span>
          </button>
          <!-- Accordion Body -->
          <transition name="accordion">
            <div v-if="expandedGroups.has(group.id)" class="rc-nav-items">
              <button
                v-for="c in group.concepts"
                :key="c.id"
                class="rc-nav-item"
                :class="{ active: selectedId === c.id }"
                :style="selectedId === c.id ? `--accent: ${c.color}` : ''"
                @click="selectConcept(c.id, group.id)"
              >
                <span class="nav-icon">{{ c.icon }}</span>
                <span class="nav-label">{{ c.shortTitle }}</span>
              </button>
            </div>
          </transition>
        </div>
      </aside>

      <!-- Content Area -->
      <main class="rc-main">
        <transition name="slide-fade" mode="out-in">
          <div class="rc-card" :key="active.id">
            <div class="card-glow" :style="`background: radial-gradient(ellipse at 30% 20%, ${active.color}28 0%, transparent 65%)`"></div>

            <!-- Card Header -->
            <div class="card-header">
              <span class="card-icon">{{ active.icon }}</span>
              <div class="card-titles">
                <span class="card-sub" :style="{ color: active.color }">{{ active.subtitle }}</span>
                <h2 class="card-title">{{ active.title }}</h2>
              </div>
            </div>

            <!-- Separator -->
            <div class="card-sep" :style="{ background: active.color }"></div>

            <div class="card-body">
              <!-- Description Paragraphs -->
              <p v-for="(p, i) in active.description" :key="i" class="card-desc" v-html="p"></p>

              <!-- Vulnerabilities -->
              <div v-if="active.vulnerabilities && active.vulnerabilities.length > 0" class="card-vulns">
                <h4 class="vuln-title">
                  <span class="vuln-icon">⚠️</span> الثغرات الأمنية والهندسية:
                </h4>
                <ul class="vuln-list">
                  <li v-for="(v, i) in active.vulnerabilities" :key="i" class="vuln-item" v-html="v"></li>
                </ul>
              </div>
            </div>

          </div>
        </transition>
      </main>

    </div>

    <!-- Mobile Bottom Nav -->
    <nav class="rc-mobile-nav">
      <button class="mob-nav-btn" :disabled="activeIdx === 0" @click="goPrev">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div class="mob-nav-info">
        <span class="mob-concept-icon">{{ active.icon }}</span>
        <div class="mob-nav-text">
          <span class="mob-group-name">{{ groups.find(g => g.concepts.some(c => c.id === selectedId))?.label }}</span>
          <span class="mob-concept-name">{{ active.shortTitle }}</span>
        </div>
        <span class="mob-counter">{{ activeIdx + 1 }}/{{ concepts.length }}</span>
      </div>
      <button class="mob-nav-btn" :disabled="activeIdx === concepts.length - 1" @click="goNext">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </nav>

    <!-- ── Cinematic Overlay ── -->
    <transition name="bg-fade">
      <PhoneCinematic v-if="showCinematic" @close="showCinematic = false" />
    </transition>
  </div>
</template>

<style scoped>
/* ── Root ── */
.rc-root {
  min-height: 100vh;
  background: #020206;
  color: #e2e8f0;
  font-family: 'Cairo', 'Inter', sans-serif;
  direction: rtl;
  position: relative;
  overflow: hidden;
}

/* ── Ambient Background ── */
.rc-bg { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
.rc-orb {
  position: absolute; border-radius: 50%; filter: blur(100px);
  opacity: 0.25; animation: float 20s infinite alternate;
}
.orb-1 { width: 500px; height: 500px; background: #00c3ff; top: -100px; right: -100px; }
.orb-2 { width: 400px; height: 400px; background: #bd10e0; bottom: -100px; left: -100px; animation-delay: -5s; }
.rc-grid {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(circle at center, black 20%, transparent 80%);
  -webkit-mask-image: radial-gradient(circle at center, black 20%, transparent 80%);
}
@keyframes float {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(30px, 50px) scale(1.1); }
}

/* ── Floating Button ── */
.cinematic-floating-btn {
  position: fixed;
  top: 90px;
  left: 30px;
  z-index: 100;
  display: flex; align-items: center; gap: 0.6rem;
  background: rgba(0,195,255,0.15); border: 1px solid rgba(0,195,255,0.4);
  color: #00c3ff; padding: 0.5rem 1.4rem; border-radius: 100px;
  font-family: inherit; font-weight: 700; font-size: 0.95rem;
  cursor: pointer; transition: all 0.25s ease;
  backdrop-filter: blur(8px);
}
.cinematic-floating-btn:hover {
  background: rgba(0,195,255,0.3);
  box-shadow: 0 0 15px rgba(0,195,255,0.4);
  transform: translateY(-2px);
}

/* ── Layout ── */
.rc-layout {
  position: relative; z-index: 1;
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 280px 1fr;
  align-items: start;
  min-height: calc(100vh - 80px);
  padding-top: 40px;
}

/* ── Sidebar ── */
.rc-sidebar {
  border-left: 1px solid rgba(255,255,255,0.06);
  padding: 2rem 0 2rem 1.5rem;
  height: 100%; position: sticky; top: 0;
}
.rc-nav-group { margin-bottom: 1.2rem; }
.rc-nav-group-btn {
  width: 100%; display: flex; align-items: center; gap: 0.8rem;
  background: none; border: none; color: white;
  padding: 0.5rem 0.8rem; border-radius: 8px; cursor: pointer;
  text-align: right; font-family: inherit; transition: background 0.2s;
}
.rc-nav-group-btn:hover { background: rgba(255,255,255,0.04); }
.gl-dot { width: 8px; height: 8px; border-radius: 50%; box-shadow: 0 0 8px currentColor; }
.gl-label { flex: 1; font-weight: 700; font-size: 0.85rem; color: rgba(255,255,255,0.9); }
.gl-chevron { font-size: 1.2rem; color: rgba(255,255,255,0.3); transition: transform 0.3s; transform: rotate(180deg); }
.gl-chevron.open { transform: rotate(90deg); }

.rc-nav-items { display: flex; flex-direction: column; gap: 0.3rem; margin-top: 0.4rem; padding-right: 1.2rem; overflow: hidden; }
.rc-nav-item {
  display: flex; align-items: center; gap: 0.6rem;
  background: none; border: none;
  padding: 0.5rem 0.8rem; border-radius: 8px;
  color: rgba(255,255,255,0.5); font-family: inherit; font-size: 0.82rem; font-weight: 600;
  cursor: pointer; text-align: right; transition: all 0.2s;
}
.rc-nav-item:hover { color: rgba(255,255,255,0.9); background: rgba(255,255,255,0.03); }
.rc-nav-item.active {
  color: #fff; background: rgba(255,255,255,0.06);
  box-shadow: inset -3px 0 0 var(--accent);
}

.accordion-enter-active, .accordion-leave-active { transition: max-height 0.3s ease, opacity 0.3s ease; max-height: 500px; }
.accordion-enter-from, .accordion-leave-to { max-height: 0; opacity: 0; }

/* ── Main Content ── */
.rc-main { padding: 2rem 1.5rem 4rem 0; position: relative; }
.rc-card {
  position: relative;
  background: rgba(15, 17, 26, 0.4);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px; overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}
.card-glow { position: absolute; inset: 0; pointer-events: none; opacity: 0.6; }
.card-header { padding: 2rem 2rem 1.5rem; display: flex; align-items: flex-start; gap: 1.2rem; position: relative; z-index: 1; }
.card-icon { font-size: 3rem; filter: drop-shadow(0 0 15px rgba(255,255,255,0.2)); }
.card-titles { display: flex; flex-direction: column; gap: 0.2rem; }
.card-sub { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; }
.card-title { font-size: 2rem; font-weight: 900; margin: 0; color: #fff; line-height: 1.2; }
.card-sep { height: 1px; width: 100%; opacity: 0.3; }
.card-body { padding: 1.5rem 2rem 2.5rem; position: relative; z-index: 1; }
.card-desc { font-size: 1.15rem; line-height: 1.8; color: rgba(255,255,255,0.85); margin-bottom: 1rem; }
.card-desc :deep(strong) { color: #fff; font-weight: 700; border-bottom: 1px dashed rgba(255,255,255,0.4); }

.card-vulns { margin-top: 2rem; background: rgba(255, 60, 60, 0.05); border: 1px solid rgba(255, 60, 60, 0.15); border-radius: 12px; padding: 1.5rem; }
.vuln-title { margin: 0 0 1rem 0; color: #ff4d4d; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem; }
.vuln-icon { font-size: 1.2rem; }
.vuln-list { margin: 0; padding-right: 1.5rem; list-style-type: square; color: rgba(255, 60, 60, 0.9); display: flex; flex-direction: column; gap: 0.8rem; }
.vuln-item { font-size: 0.95rem; line-height: 1.6; }
.vuln-item :deep(strong) { color: #ff6b6b; font-weight: 800; border-bottom: 1px dashed rgba(255, 107, 107, 0.4); margin-left: 0.3rem; }

.slide-fade-enter-active { transition: all 0.25s ease; }
.slide-fade-leave-active { transition: all 0.25s cubic-bezier(1, 0.5, 0.8, 1); position: absolute; width: 100%; }
.slide-fade-enter-from { opacity: 0; transform: translateY(8px); }
.slide-fade-leave-to { opacity: 0; transform: translateY(-8px); }

/* ── Cinematic Transition ── */
.bg-fade-enter-active, .bg-fade-leave-active { transition: opacity 0.5s ease; }
.bg-fade-enter-from, .bg-fade-leave-to { opacity: 0; }

/* ── Responsive ── */
.rc-mobile-nav { display: none; }

@media (max-width: 768px) {
  .rc-sidebar { display: none !important; }
  .rc-layout { visibility: hidden; }
  .cinematic-floating-btn { display: none; }
  .rc-layout { grid-template-columns: 1fr; height: calc(100vh - 48px - 64px); }
  .rc-main { padding: 1rem; height: 100%; padding-bottom: 0; }
  .card-header { padding: 1.2rem 1.2rem 0.8rem; gap: 0.9rem; }
  .card-icon { font-size: 2rem; }
  .card-body { padding: 1rem 1.2rem 1.5rem; }

  .rc-mobile-nav {
    display: flex; position: fixed; bottom: 0; left: 0; right: 0; z-index: 500;
    align-items: center; gap: 0.75rem; padding: 0.6rem 1rem;
    background: rgba(2, 2, 6, 0.92); backdrop-filter: blur(16px);
    border-top: 1px solid rgba(255,255,255,0.07); height: 64px; box-sizing: border-box;
  }
  .mob-nav-btn {
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
    color: white; width: 40px; height: 40px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; flex-shrink: 0; transition: all 0.2s ease;
  }
  .mob-nav-btn:hover:not(:disabled) { background: rgba(255,255,255,0.15); }
  .mob-nav-btn:disabled { opacity: 0.25; cursor: not-allowed; }

  .mob-nav-info { flex: 1; display: flex; align-items: center; gap: 0.6rem; min-width: 0; }
  .mob-concept-icon { font-size: 1.4rem; flex-shrink: 0; }
  .mob-nav-text { display: flex; flex-direction: column; min-width: 0; flex: 1; }
  .mob-group-name { font-size: 0.65rem; color: rgba(255,255,255,0.35); font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mob-concept-name { font-size: 0.88rem; font-weight: 700; color: rgba(255,255,255,0.9); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mob-counter { font-size: 0.75rem; color: rgba(255,255,255,0.3); font-weight: 700; flex-shrink: 0; font-family: 'Inter', monospace; }
}
</style>
